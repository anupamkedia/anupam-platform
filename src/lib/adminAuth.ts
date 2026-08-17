// Simple HMAC-signed session token, edge-compatible (Web Crypto API)
const SECRET = 'anupam-paints-admin-secret-2026-kolkata-x7f9';
const ADMIN_USERNAME = 'anupamkedia';
const ADMIN_PASSWORD = 'Anu@3217901';
const SESSION_DURATION = 60 * 60 * 24 * 7; // 7 days in seconds

async function hmacSign(data: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw', enc.encode(SECRET), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(data));
  return Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function createSessionToken(): Promise<string> {
  const expiry = Math.floor(Date.now() / 1000) + SESSION_DURATION;
  const payload = `admin:${expiry}`;
  const sig = await hmacSign(payload);
  return `${payload}.${sig}`;
}

export async function verifySessionToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const parts = token.split('.');
  if (parts.length !== 2) return false;
  const [payload, sig] = parts;
  const expectedSig = await hmacSign(payload);
  if (sig !== expectedSig) return false;
  const [role, expiryStr] = payload.split(':');
  if (role !== 'admin') return false;
  const expiry = parseInt(expiryStr, 10);
  if (isNaN(expiry) || Date.now() / 1000 > expiry) return false;
  return true;
}

export function checkCredentials(username: string, password: string): boolean {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}
