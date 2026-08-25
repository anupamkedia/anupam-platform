/* Server-side Turnstile verification. Returns true when the token is good,
   false when it is definitely bad, and null when verification could not be
   performed at all (no secret, Cloudflare unreachable) — the caller decides
   how to treat that, and should not reject a lead because our check broke. */
export async function verifyTurnstile(token: string | undefined, ip?: string): Promise<boolean | null> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return null;                 // not configured
  if (!token) return false;                 // configured, but nothing supplied

  try {
    const body = new URLSearchParams({ secret, response: token });
    if (ip) body.append('remoteip', ip);

    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    });
    const data = await res.json();
    if (!data.success) {
      console.warn('[turnstile] rejected:', data['error-codes']);
    }
    return !!data.success;
  } catch (e) {
    console.error('[turnstile] verification unreachable:', e);
    return null;                            // do not punish the visitor for our outage
  }
}
