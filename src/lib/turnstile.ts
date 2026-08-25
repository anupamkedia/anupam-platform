/* ============================================================================
   Cloudflare Turnstile — token helper
   ----------------------------------------------------------------------------
   Deliberately NOT a React component. Ten forms post to /api/enquiry and I am
   not going to edit ten sets of JSX to place a widget — that is how forms get
   broken. Instead this loads the script on demand, renders an invisible widget
   into a container it creates itself, and resolves with a token.

   Patching a form is therefore one line inside its submit handler.

   Mode is 'interaction-only': nothing is shown to the visitor unless
   Cloudflare decides a challenge is genuinely needed, which for a real person
   is almost never.
   ========================================================================== */

declare global {
  interface Window { turnstile?: any }
}

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
let scriptLoading: Promise<void> | null = null;

function loadScript(): Promise<void> {
  if (typeof window === 'undefined') return Promise.reject(new Error('server'));
  if (window.turnstile) return Promise.resolve();
  if (scriptLoading) return scriptLoading;

  scriptLoading = new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    s.async = true;
    s.defer = true;
    s.onload = () => resolve();
    s.onerror = () => { scriptLoading = null; reject(new Error('turnstile script failed')); };
    document.head.appendChild(s);
  });
  return scriptLoading;
}

/**
 * Returns a Turnstile token, or null when Turnstile is not configured or
 * cannot run. Never throws — a protection layer must not be able to stop a
 * genuine enquiry, so the server decides what to do with a missing token.
 */
export async function getTurnstileToken(timeoutMs = 12000): Promise<string | null> {
  if (!SITE_KEY) return null;                       // not configured yet
  try {
    await loadScript();
    if (!window.turnstile) return null;

    const holder = document.createElement('div');
    holder.style.position = 'fixed';
    holder.style.bottom = '16px';
    holder.style.right = '16px';
    holder.style.zIndex = '2147483647';
    document.body.appendChild(holder);

    const token = await new Promise<string | null>((resolve) => {
      const done = (v: string | null) => { resolve(v); };
      const timer = setTimeout(() => done(null), timeoutMs);

      try {
        window.turnstile.render(holder, {
          sitekey: SITE_KEY,
          appearance: 'interaction-only',   // invisible unless a challenge is needed
          callback: (t: string) => { clearTimeout(timer); done(t); },
          'error-callback': () => { clearTimeout(timer); done(null); },
          'timeout-callback': () => { clearTimeout(timer); done(null); },
        });
      } catch {
        clearTimeout(timer); done(null);
      }
    });

    setTimeout(() => holder.remove(), 500);
    return token;
  } catch {
    return null;
  }
}
