import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

/* Writing happens here, server-side, with the service role key. The browser
   never holds a key that can read or write this table — otherwise anyone
   could read your traffic data or flood it with invented rows. */

const BOT = /bot|crawler|spider|crawling|facebookexternalhit|slurp|bingpreview|headless|lighthouse|pingdom|uptime|curl|wget|python-requests|axios|postman|vercel-screenshot|gptbot|claudebot|ccbot|perplexity/i;

export async function POST(req: NextRequest) {
  try {
    const b = await req.json();
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) return NextResponse.json({ ok: false }, { status: 200 });

    const ua = req.headers.get('user-agent') || '';

    const supabase = createClient(url, key);
    await supabase.from('page_views').insert({
      visitor_id: b.visitor_id ?? null,
      session_id: b.session_id ?? null,
      path: typeof b.path === 'string' ? b.path.slice(0, 300) : null,
      referrer: typeof b.referrer === 'string' ? b.referrer.slice(0, 500) : null,
      source: typeof b.source === 'string' ? b.source.slice(0, 80) : null,
      utm_source: b.utm_source ?? null,
      utm_medium: b.utm_medium ?? null,
      utm_campaign: b.utm_campaign ?? null,
      device: b.device ?? null,
      browser: b.browser ?? null,
      /* Vercel supplies the country at the edge. Country only — no IP is
         read, stored or derived from anywhere. */
      country: req.headers.get('x-vercel-ip-country') || null,
      screen_w: typeof b.screen_w === 'number' ? b.screen_w : null,
      is_bot: BOT.test(ua),
    });

    /* Always 200. A failed analytics write must never surface to a visitor. */
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
