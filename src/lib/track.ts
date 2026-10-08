'use client';

/* ============================================================================
   Visitor tracking — deliberately minimal
   ----------------------------------------------------------------------------
   No IP address is stored. No cookies. No fingerprinting. Two random ids:
   one per browser so returning visitors can be counted, one per visit.
   Neither identifies a person, and neither is shared with anyone.
   ========================================================================== */

const VISITOR = 'ap.vid';
const SESSION = 'ap.sid';

function rid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function ids() {
  try {
    let v = localStorage.getItem(VISITOR);
    if (!v) { v = rid(); localStorage.setItem(VISITOR, v); }
    let s = sessionStorage.getItem(SESSION);
    if (!s) { s = rid(); sessionStorage.setItem(SESSION, s); }
    return { visitor_id: v, session_id: s };
  } catch {
    /* private browsing — still count the view, just without continuity */
    return { visitor_id: null, session_id: rid() };
  }
}

function deviceType(): string {
  const w = window.innerWidth;
  if (w < 768) return 'mobile';
  if (w < 1024) return 'tablet';
  return 'desktop';
}

function browserName(): string {
  const u = navigator.userAgent;
  if (/Edg\//.test(u)) return 'Edge';
  if (/OPR\//.test(u)) return 'Opera';
  if (/Chrome\//.test(u)) return 'Chrome';
  if (/Safari\//.test(u) && !/Chrome/.test(u)) return 'Safari';
  if (/Firefox\//.test(u)) return 'Firefox';
  return 'Other';
}

/* Where did they come from? Referrer first, then utm, then direct. */
function sourceOf(p: URLSearchParams): string {
  const utm = p.get('utm_source');
  if (utm) return utm.toLowerCase();
  if (p.has('fbclid')) return 'facebook';
  if (p.has('gclid')) return 'google ads';

  const r = document.referrer || '';
  if (!r) return 'direct';
  try {
    const h = new URL(r).hostname.replace(/^www\./, '');
    if (h === window.location.hostname) return 'internal';
    if (/google\./.test(h)) return 'google';
    if (/facebook|fb\.com/.test(h)) return 'facebook';
    if (/instagram/.test(h)) return 'instagram';
    if (/linkedin/.test(h)) return 'linkedin';
    if (/bing\./.test(h)) return 'bing';
    if (/wa\.me|whatsapp/.test(h)) return 'whatsapp';
    if (/youtube/.test(h)) return 'youtube';
    return h;
  } catch { return 'direct'; }
}

export function trackPageView(path: string) {
  if (typeof window === 'undefined') return;
  try {
    const p = new URLSearchParams(window.location.search);
    const body = {
      ...ids(),
      path,
      referrer: document.referrer || null,
      source: sourceOf(p),
      utm_source: p.get('utm_source'),
      utm_medium: p.get('utm_medium'),
      utm_campaign: p.get('utm_campaign'),
      device: deviceType(),
      browser: browserName(),
      screen_w: window.innerWidth,
    };
    /* sendBeacon survives the page being closed mid-request, which a normal
       fetch does not — otherwise the last page of every visit goes uncounted. */
    const payload = JSON.stringify(body);
    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/track', new Blob([payload], { type: 'application/json' }));
    } else {
      fetch('/api/track', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: payload, keepalive: true }).catch(() => {});
    }
  } catch { /* analytics must never break a page */ }
}
