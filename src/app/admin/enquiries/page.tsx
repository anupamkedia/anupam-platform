'use client';

import { useState, useEffect, useMemo } from 'react';

interface Enq {
  id: string; name: string; company: string | null; phone: string;
  email: string | null; enquiry_type: string | null; source: string | null;
  status: string | null; message: string | null; created_at: string;
}

const STATUSES = ['new', 'contacted', 'quoted', 'won', 'closed'];
const TONE: Record<string, string> = {
  new: 'bg-blue-50 text-blue-800 border-blue-200',
  contacted: 'bg-amber-50 text-amber-800 border-amber-200',
  quoted: 'bg-purple-50 text-purple-800 border-purple-200',
  won: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  closed: 'bg-slate-100 text-slate-600 border-slate-200',
};

export default function AdminEnquiriesPage() {
  const [rows, setRows] = useState<Enq[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');
  const [q, setQ] = useState('');
  const [status, setStatus] = useState('all');
  const [open, setOpen] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    fetch('/api/enquiries')
      .then(async (r) => { const d = await r.json(); if (!r.ok) throw new Error(d.error); return d; })
      .then((d) => { setRows(d.enquiries); setErr(''); })
      .catch((e) => setErr(e.message))
      .finally(() => setLoading(false));
  };
  useEffect(load, []);

  const setStatusFor = async (id: string, s: string) => {
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, status: s } : r)));   // optimistic
    try {
      const res = await fetch('/api/enquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: s }),
      });
      if (!res.ok) throw new Error();
    } catch { load(); }   // put it back if the save failed
  };

  const shown = useMemo(() => {
    const term = q.trim().toLowerCase();
    return rows.filter((r) => {
      if (status !== 'all' && (r.status || 'new') !== status) return false;
      if (!term) return true;
      return [r.name, r.phone, r.email, r.company, r.message, r.enquiry_type, r.source]
        .filter(Boolean).join(' ').toLowerCase().includes(term);
    });
  }, [rows, q, status]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: rows.length };
    STATUSES.forEach((s) => { c[s] = 0; });
    rows.forEach((r) => { const s = r.status || 'new'; c[s] = (c[s] || 0) + 1; });
    return c;
  }, [rows]);

  const days = (iso: string) => Math.floor((Date.now() - new Date(iso).getTime()) / 864e5);

  return (
    <div className="min-h-screen bg-[#F7F6F3]">
      <div className="max-w-6xl mx-auto px-5 py-8">
        <div className="flex items-baseline justify-between flex-wrap gap-3 mb-1">
          <h1 className="text-2xl font-semibold text-[#0B2A5B]">Enquiries</h1>
          <a href="/api/enquiries?format=csv"
            className="text-[13px] border border-slate-300 hover:border-[#1E5AA8] px-4 py-2 rounded-lg text-slate-700">
            Export CSV
          </a>
        </div>
        <p className="text-[13px] text-slate-600 mb-6">Newest first. Click a row to read the full message.</p>

        {err && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
            <p className="text-[13px] text-amber-900 leading-relaxed">{err}</p>
          </div>
        )}

        {!err && (
          <>
            <div className="flex flex-wrap gap-2 mb-4">
              {['all', ...STATUSES].map((s) => (
                <button key={s} onClick={() => setStatus(s)}
                  className={`text-[12.5px] px-3 py-1.5 rounded-full border capitalize transition-colors ${
                    status === s ? 'bg-[#0B2A5B] text-white border-[#0B2A5B]'
                                 : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'}`}>
                  {s} {counts[s] ? `(${counts[s]})` : ''}
                </button>
              ))}
            </div>

            <input value={q} onChange={(e) => setQ(e.target.value)}
              placeholder="Search name, number, company or message"
              className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-[13px] mb-4" />

            {loading ? <p className="text-[13px] text-slate-500">Loading…</p>
              : shown.length === 0 ? (
                <div className="bg-white rounded-xl border border-slate-200 p-10 text-center">
                  <p className="text-[14px] text-slate-700">
                    {rows.length === 0 ? 'No enquiries yet.' : 'Nothing matches that filter.'}
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {shown.map((r) => {
                    const age = days(r.created_at);
                    const stale = (r.status || 'new') === 'new' && age >= 2;
                    return (
                      <div key={r.id}
                        className={`bg-white rounded-xl border p-4 ${stale ? 'border-amber-300' : 'border-slate-200'}`}>
                        <div className="flex flex-wrap items-start gap-3">
                          <div className="min-w-0 flex-1 cursor-pointer" onClick={() => setOpen(open === r.id ? null : r.id)}>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-semibold text-[14px] text-slate-900">{r.name}</span>
                              {r.company && <span className="text-[12.5px] text-slate-500">{r.company}</span>}
                              <span className={`text-[10.5px] px-2 py-0.5 rounded border capitalize ${TONE[r.status || 'new']}`}>
                                {r.status || 'new'}
                              </span>
                              {stale && (
                                <span className="text-[10.5px] px-2 py-0.5 rounded border bg-amber-50 text-amber-900 border-amber-200">
                                  {age} days unanswered
                                </span>
                              )}
                            </div>
                            <p className="text-[12.5px] text-slate-600 mt-1">
                              {r.enquiry_type || 'General'} · {r.source || 'website'} ·{' '}
                              {new Date(r.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                            </p>
                            {open !== r.id && r.message && (
                              <p className="text-[12.5px] text-slate-700 mt-1.5 truncate">{r.message}</p>
                            )}
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <a href={`tel:${r.phone}`} className="text-[12.5px] font-medium text-[#1E5AA8] hover:underline">{r.phone}</a>
                            <a href={`https://wa.me/91${String(r.phone).replace(/\D/g, '').slice(-10)}`}
                              target="_blank" rel="noopener noreferrer"
                              className="text-[12px] border border-emerald-300 text-emerald-800 px-2.5 py-1 rounded-lg hover:bg-emerald-50">
                              WhatsApp
                            </a>
                            <select value={r.status || 'new'} onChange={(e) => setStatusFor(r.id, e.target.value)}
                              className="text-[12px] border border-slate-300 rounded-lg px-2 py-1 capitalize">
                              {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                            </select>
                          </div>
                        </div>

                        {open === r.id && (
                          <div className="mt-3 pt-3 border-t border-slate-100 grid sm:grid-cols-2 gap-4">
                            <div>
                              <p className="text-[10.5px] uppercase tracking-wide text-slate-400 mb-1">Message</p>
                              <p className="text-[13px] text-slate-800 whitespace-pre-wrap">{r.message || '—'}</p>
                            </div>
                            <div>
                              <p className="text-[10.5px] uppercase tracking-wide text-slate-400 mb-1">Contact</p>
                              <p className="text-[13px] text-slate-800">{r.phone}</p>
                              {r.email && <p className="text-[13px] text-slate-800">{r.email}</p>}
                              <p className="text-[12px] text-slate-500 mt-2">
                                Received {new Date(r.created_at).toLocaleString('en-IN')}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
          </>
        )}
      </div>
    </div>
  );
}
