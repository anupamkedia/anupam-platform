import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

/* Reading requires the service role key, so traffic data never leaves the
   server. Aggregation happens here rather than in the browser. */

export async function GET(req: Request) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    return NextResponse.json({
      error: 'SUPABASE_SERVICE_ROLE_KEY is not set. Add it in Vercel > Settings > Environment Variables, then redeploy.',
    }, { status: 503 });
  }

  const { searchParams } = new URL(req.url);
  const days = Math.min(365, Math.max(1, parseInt(searchParams.get('days') || '30')));
  const includeBots = searchParams.get('bots') === '1';
  const since = new Date(Date.now() - days * 86400000).toISOString();
  const prevSince = new Date(Date.now() - days * 2 * 86400000).toISOString();

  const supabase = createClient(url, key);

  const { data: rows, error } = await supabase
    .from('page_views')
    .select('visitor_id,session_id,path,source,referrer,utm_campaign,device,browser,country,is_bot,created_at')
    .gte('created_at', prevSince)
    .order('created_at', { ascending: false })
    .limit(100000);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const all = (rows || []).filter((r: any) => includeBots || !r.is_bot);
  const cur = all.filter((r: any) => r.created_at >= since);
  const prev = all.filter((r: any) => r.created_at < since);

  const uniq = (xs: any[], k: string) => new Set(xs.map((r) => r[k]).filter(Boolean)).size;
  const tally = (xs: any[], k: string, limit = 12) => {
    const m: Record<string, number> = {};
    xs.forEach((r) => { const v = r[k] || 'unknown'; m[v] = (m[v] || 0) + 1; });
    return Object.entries(m).sort((a, b) => b[1] - a[1]).slice(0, limit)
      .map(([name, count]) => ({ name, count }));
  };

  /* daily series for the chart */
  const byDay: Record<string, { views: number; visitors: Set<string> }> = {};
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(Date.now() - i * 86400000).toISOString().slice(0, 10);
    byDay[d] = { views: 0, visitors: new Set() };
  }
  cur.forEach((r: any) => {
    const d = String(r.created_at).slice(0, 10);
    if (byDay[d]) { byDay[d].views++; if (r.visitor_id) byDay[d].visitors.add(r.visitor_id); }
  });
  const series = Object.entries(byDay).map(([date, v]) => ({
    date, views: v.views, visitors: v.visitors.size,
  }));

  /* pages per session — a rough engagement signal */
  const perSession: Record<string, number> = {};
  cur.forEach((r: any) => { if (r.session_id) perSession[r.session_id] = (perSession[r.session_id] || 0) + 1; });
  const sessions = Object.values(perSession);
  const avgPages = sessions.length ? sessions.reduce((a, b) => a + b, 0) / sessions.length : 0;
  const bounced = sessions.filter((n) => n === 1).length;

  /* enquiries in the same window, so the conversion rate is real */
  let enquiries = 0;
  try {
    const { count } = await supabase
      .from('enquiries')
      .select('id', { count: 'exact', head: true })
      .gte('created_at', since);
    enquiries = count ?? 0;
  } catch { /* table may not be reachable; conversion simply shows as — */ }

  const visitors = uniq(cur, 'visitor_id');

  return NextResponse.json({
    range: { days, since },
    totals: {
      views: cur.length,
      visitors,
      sessions: sessions.length,
      avgPages: Number(avgPages.toFixed(2)),
      bounceRate: sessions.length ? Math.round((bounced / sessions.length) * 100) : 0,
      enquiries,
      conversion: visitors ? Number(((enquiries / visitors) * 100).toFixed(2)) : 0,
      botViews: (rows || []).filter((r: any) => r.is_bot && r.created_at >= since).length,
    },
    previous: {
      views: prev.length,
      visitors: uniq(prev, 'visitor_id'),
    },
    series,
    pages: tally(cur, 'path', 15),
    sources: tally(cur, 'source', 12),
    devices: tally(cur, 'device', 5),
    browsers: tally(cur, 'browser', 6),
    countries: tally(cur, 'country', 10),
    campaigns: tally(cur.filter((r: any) => r.utm_campaign), 'utm_campaign', 10),
  });
}
