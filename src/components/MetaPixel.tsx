'use client';

import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';

const PIXEL_ID = '464869025965732';

/* How long after an ad click a resulting enquiry still counts as ad-driven.
   28 days matches Meta's own default attribution window, so what this file
   reports and what Ads Manager attributes stay in step. */
const AD_WINDOW_DAYS = 28;
const AD_FLAG = 'ap.fbclid';

declare global {
  interface Window { fbq?: any }
}

/* Did this visitor arrive from a Meta ad, now or within the window?
   Meta appends ?fbclid=... to every ad click. We record the moment we first
   see it, so an enquiry made on a later visit is still credited correctly. */
function cameFromAd(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const p = new URLSearchParams(window.location.search);
    const isAdClick =
      p.has('fbclid') ||
      /facebook|instagram/i.test(p.get('utm_source') || '') ||
      /facebook\.com|instagram\.com/i.test(document.referrer || '');

    if (isAdClick) {
      localStorage.setItem(AD_FLAG, String(Date.now()));
      return true;
    }
    const seen = Number(localStorage.getItem(AD_FLAG) || 0);
    if (!seen) return false;
    const age = (Date.now() - seen) / 86400000;
    if (age > AD_WINDOW_DAYS) { localStorage.removeItem(AD_FLAG); return false; }
    return true;
  } catch {
    /* private browsing blocks localStorage. Treating that as "not from an ad"
       loses a conversion; treating it as "from an ad" pollutes the data with
       organic leads, which is what we are trying to avoid. */
    return false;
  }
}

/* Facebook's snippet fires PageView once, on first load. This is a
   single-page app, so without this every later route change goes unrecorded. */
function PageViewOnRouteChange() {
  const pathname = usePathname();
  const search = useSearchParams();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'PageView');
    }
    cameFromAd();   // capture fbclid on the landing page, before it is navigated away
  }, [pathname, search]);

  return null;
}

export default function MetaPixel() {
  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${PIXEL_ID}');
fbq('track', 'PageView');
        `}
      </Script>

      <noscript>
        <img height="1" width="1" style={{ display: 'none' }} alt=""
          src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`} />
      </noscript>

      <Suspense fallback={null}>
        <PageViewOnRouteChange />
      </Suspense>
    </>
  );
}

/**
 * Reports an enquiry to Meta as a Lead — but ONLY when the visitor arrived
 * from a Meta ad within the attribution window.
 *
 * Organic and Google enquiries are deliberately not reported, so Events
 * Manager shows ad-driven leads only.
 */
export function trackLead(source?: string) {
  if (typeof window === 'undefined' || !window.fbq) return;
  if (!cameFromAd()) return;                     // organic — stay silent
  window.fbq('track', 'Lead', source ? { content_name: source } : undefined);
}

/** Fires for every enquiry regardless of source. Not used by default —
 *  here if you later want the full picture back. */
export function trackLeadAlways(source?: string) {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Lead', source ? { content_name: source } : undefined);
  }
}
