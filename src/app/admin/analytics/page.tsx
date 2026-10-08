'use client';

import { useState, useEffect, useMemo, type ReactNode } from 'react';

interface Row { name: string; count: number }
interface Day { date: string; views: number; visitors: number }
interface Data {
  totals: { views: number; visitors: number; sessions: number; avgPages: number;
            bounceRate: number; enquiries: number; conversion: number; botViews: number };
  previous: { views: number; visitors: number };
  series: Day[];
  pages: Row[]; sources: Row[]; devices: Row[]; browsers: Row[]; countries: Row[]; campaigns: Row[];
}

const RANGES = [
  { d: 7, label: '7 days' },
  { d: 30, label: '30 days' },
  { d: 90, label: '90 days' },
  { d: 365, label: '12 months' },
];

const COUNTRY: Record<string, string> = {
  IN: 'India', US: 'United States', GB: 'United Kingdom', AE: 'UAE', SG: 'Singapore',
  BD: 'Bangladesh', NP: 'Nepal', LK: 'Sri Lanka', AU: 'Australia', CA: 'Canada',
  DE: 'Germany', SA: 'Saudi Arabia', MY: 'Malaysia', QA: 'Qatar', OM: 'Oman',
};

export default function AdminAnalyticsPage() {
  const [days, setDays] = useState(30);
  const [bots, setBots] = useState(false);
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

  useEffect(() => {
    setLoading(true);
    fetch(`/api/analytics?days=${days}${bots ? '&bots=1' : ''}`)
      .then(async (r) => { const d = await r.json(); if (!r.ok) throw new Error(d.error); return d; })
      .then((d) => { setData(d); setErr(''); })
      .catch((e) => setErr(e.message))
      .finally(() => setLoading(false));
  }, [days, bots]);

  const delta = (now: number, before: number) => {
    if (!before) return null;
    const pct = ((now - before) / before) * 100;
    return { pct: Math.round(pct), up: pct >= 0 };
  };

  return (
    <div className="viz-root min-h-screen bg-[#F7F6F3]">
      <style>{`
        .viz-root {
          --surface-1: #ffffff;
          --text-primary: #0f172a;
          --text-secondary: #64748b;
          --series-1: #2a78d6;
          --series-2: #eb6834;
          --grid: #e7e5e4;
        }
      `}</style>

      <div className="max-w-6xl mx-auto px-5 py-8">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-[#0B2A5B]">Website Analytics</h1>
            <p className="text-[13px] text-slate-600 mt-0.5">
              Your own data, on your own server. No cookies, no IP addresses, nothing shared.
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {RANGES.map((r) => (
              <button key={r.d} onClick={() => setDays(r.d)}
                className={`text-[12.5px] px-3 py-1.5 rounded-lg border transition-colors ${
                  days === r.d ? 'bg-[#0B2A5B] text-white border-[#0B2A5B]'
                               : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'}`}>
                {r.label}
              </button>
            ))}
            <label className="flex items-center gap-1.5 text-[12px] text-slate-600 ml-1 cursor-pointer">
              <input type="checkbox" checked={bots} onChange={(e) => setBots(e.target.checked)}
                className="w-3.5 h-3.5 accent-[#1E5AA8]" />
              include bots
            </label>
          </div>
        </div>

        {err && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
            <p className="text-[13px] text-amber-900 leading-relaxed">{err}</p>
          </div>
        )}

        {loading && !data && <p className="text-[13px] text-slate-500">Loading…</p>}

        {data && !err && (
          <>
            {/* ---------- headline numbers ---------- */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
              <Stat label="Visitors" value={data.totals.visitors.toLocaleString('en-IN')}
                change={delta(data.totals.visitors, data.previous.visitors)}
                note="Unique browsers" />
              <Stat label="Page views" value={data.totals.views.toLocaleString('en-IN')}
                change={delta(data.totals.views, data.previous.views)}
                note={`${data.totals.avgPages} pages per visit`} />
              <Stat label="Enquiries" value={String(data.totals.enquiries)}
                note={`${data.totals.conversion}% of visitors`} />
              <Stat label="Single-page visits" value={`${data.totals.bounceRate}%`}
                note="Left after one page" />
            </div>

            {/* ---------- daily trend ---------- */}
            <Panel title="Daily traffic"
              subtitle={`Last ${days} days. Hover any day for its figures.`}>
              <TrendChart series={data.series} />
            </Panel>

            <div className="grid lg:grid-cols-2 gap-5 mt-5">
              <Panel title="Where visitors come from"
                subtitle="Referrer, or the utm_source on the link">
                <Bars rows={data.sources} total={data.totals.views} />
              </Panel>

              <Panel title="Most visited pages">
                <Bars rows={data.pages} total={data.totals.views} mono />
              </Panel>

              <Panel title="Device">
                <Bars rows={data.devices} total={data.totals.views} />
              </Panel>

              <Panel title="Country" subtitle="From the edge network — country only, never an IP">
                <Bars rows={data.countries.map((c) => ({ ...c, name: COUNTRY[c.name] || c.name }))}
                  total={data.totals.views} />
              </Panel>

              <Panel title="Browser">
                <Bars rows={data.browsers} total={data.totals.views} />
              </Panel>

              {data.campaigns.length > 0 && (
                <Panel title="Campaigns" subtitle="Tagged with utm_campaign">
                  <Bars rows={data.campaigns} total={data.totals.views} />
                </Panel>
              )}
            </div>

            <p className="text-[11.5px] text-slate-500 mt-6 leading-relaxed max-w-3xl">
              {data.totals.botViews > 0 && (
                <>{data.totals.botViews.toLocaleString('en-IN')} views from bots and crawlers were
                filtered out of these figures. </>
              )}
              Admin pages are never recorded, so your own work does not appear as traffic.
              Visitors are counted by a random id held in their browser — if someone clears
              their data or uses another device they count again, so treat visitor numbers
              as a close estimate rather than a headcount.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

function Stat({ label, value, note, change }:
  { label: string; value: string; note?: string; change?: { pct: number; up: boolean } | null }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4">
      <p className="text-[11px] tracking-wide uppercase text-slate-500">{label}</p>
      <div className="flex items-baseline gap-2 mt-1">
        <p className="text-2xl font-semibold text-[#0B2A5B] tabular-nums">{value}</p>
        {change && (
          <span className={`text-[11.5px] font-medium ${change.up ? 'text-emerald-700' : 'text-amber-700'}`}>
            {change.up ? '+' : ''}{change.pct}%
          </span>
        )}
      </div>
      {note && <p className="text-[11.5px] text-slate-500 mt-0.5">{note}</p>}
    </div>
  );
}

function Panel({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5">
      <h2 className="text-[14px] font-semibold text-[#0B2A5B]">{title}</h2>
      {subtitle && <p className="text-[11.5px] text-slate-500 mt-0.5 mb-3">{subtitle}</p>}
      <div className={subtitle ? '' : 'mt-3'}>{children}</div>
    </div>
  );
}

/* Two series, same unit, one axis. Legend present; the last point of each is
   labelled directly so identity never rests on colour alone. */
function TrendChart({ series }: { series: Day[] }) {
  const [hover, setHover] = useState<number | null>(null);
  const W = 760, H = 220, PL = 40, PR = 16, PT = 14, PB = 28;
  const max = Math.max(4, ...series.map((d) => Math.max(d.views, d.visitors)));
  const x = (i: number) => PL + (i * (W - PL - PR)) / Math.max(1, series.length - 1);
  const y = (v: number) => PT + (1 - v / max) * (H - PT - PB);
  const line = (k: 'views' | 'visitors') =>
    series.map((d, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(d[k]).toFixed(1)}`).join(' ');

  const ticks = [0, Math.round(max / 2), max];
  const fmt = (s: string) => new Date(s + 'T00:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });

  return (
    <div>
      <div className="flex items-center gap-4 mb-2">
        <Key color="var(--series-1)" label="Page views" />
        <Key color="var(--series-2)" label="Visitors" />
      </div>

      <div className="relative">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto"
          onMouseLeave={() => setHover(null)} role="img"
          aria-label={`Daily page views and visitors over ${series.length} days`}>
          {ticks.map((t) => (
            <g key={t}>
              <line x1={PL} x2={W - PR} y1={y(t)} y2={y(t)} stroke="var(--grid)" strokeWidth="1" />
              <text x={PL - 8} y={y(t) + 4} textAnchor="end"
                fontSize="10" fill="var(--text-secondary)">{t}</text>
            </g>
          ))}

          <path d={line('views')} fill="none" stroke="var(--series-1)" strokeWidth="2"
            strokeLinejoin="round" strokeLinecap="round" />
          <path d={line('visitors')} fill="none" stroke="var(--series-2)" strokeWidth="2"
            strokeLinejoin="round" strokeLinecap="round" />

          {hover !== null && (
            <line x1={x(hover)} x2={x(hover)} y1={PT} y2={H - PB}
              stroke="var(--text-secondary)" strokeWidth="1" strokeDasharray="3 3" />
          )}
          {hover !== null && (['views', 'visitors'] as const).map((k, n) => (
            <circle key={k} cx={x(hover)} cy={y(series[hover][k])} r="4"
              fill={n ? 'var(--series-2)' : 'var(--series-1)'} stroke="var(--surface-1)" strokeWidth="2" />
          ))}

          {series.map((_, i) => (
            <rect key={i} x={x(i) - (W / series.length) / 2} y={PT}
              width={W / series.length} height={H - PT - PB}
              fill="transparent" onMouseEnter={() => setHover(i)} />
          ))}

          {series.length > 0 && [0, series.length - 1].map((i, n) => (
            <text key={n} x={x(i)} y={H - 8} fontSize="10" fill="var(--text-secondary)"
              textAnchor={n ? 'end' : 'start'}>{fmt(series[i].date)}</text>
          ))}
        </svg>

        {hover !== null && (
          <div className="absolute top-0 bg-white border border-slate-200 rounded-lg px-3 py-2 shadow-sm pointer-events-none"
            style={{ left: `${(x(hover) / W) * 100}%`, transform: 'translateX(-50%)' }}>
            <p className="text-[11px] text-slate-500">{fmt(series[hover].date)}</p>
            <p className="text-[12.5px] text-slate-900 tabular-nums">
              {series[hover].views} views · {series[hover].visitors} visitors
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function Key({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className="w-3 h-[2px] rounded-full" style={{ background: color }} />
      <span className="text-[11.5px] text-slate-600">{label}</span>
    </span>
  );
}

function Bars({ rows, total, mono }: { rows: Row[]; total: number; mono?: boolean }) {
  if (!rows.length) return <p className="text-[12.5px] text-slate-500 py-4">No data yet.</p>;
  const max = Math.max(...rows.map((r) => r.count));
  return (
    <div className="space-y-1.5">
      {rows.map((r) => (
        <div key={r.name} className="flex items-center gap-3">
          <span className={`text-[12.5px] text-slate-700 w-[45%] truncate ${mono ? 'font-mono text-[11.5px]' : ''}`}
            title={r.name}>{r.name}</span>
          <span className="flex-1 h-[18px] bg-slate-100 rounded-[4px] overflow-hidden">
            <span className="block h-full rounded-[4px]"
              style={{ width: `${(r.count / max) * 100}%`, background: 'var(--series-1)' }} />
          </span>
          <span className="text-[12px] text-slate-600 tabular-nums w-16 text-right">
            {r.count.toLocaleString('en-IN')}
            <span className="text-slate-400 ml-1">{total ? Math.round((r.count / total) * 100) : 0}%</span>
          </span>
        </div>
      ))}
    </div>
  );
}
