'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Row { rate_key: string; label: string; low: string; high: string }

export default function AdminLabourPage() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.from('painting_labour_rates').select('*').order('rate_key');
      if (error) { setMissing(true); setLoading(false); return; }
      setRows((data || []).map((d: any) => ({
        rate_key: d.rate_key, label: d.label,
        low: d.rate_low ? String(d.rate_low) : '',
        high: d.rate_high ? String(d.rate_high) : '',
      })));
      setLoading(false);
    })();
  }, []);

  const save = async () => {
    setSaving(true); setMsg('');
    try {
      const payload = rows.map((r) => ({
        rate_key: r.rate_key, label: r.label,
        rate_low: parseFloat(r.low) || 0,
        rate_high: parseFloat(r.high) || 0,
        updated_at: new Date().toISOString(),
      }));
      const { error } = await supabase.from('painting_labour_rates').upsert(payload, { onConflict: 'rate_key' });
      if (error) throw error;
      const set = payload.filter((p) => p.rate_low > 0).length;
      setMsg(`Saved. ${set} of ${payload.length} rates now set.`);
    } catch (e: any) {
      setMsg(`Could not save: ${e.message}. If the table does not exist, run labour-rates.sql in Supabase first.`);
    } finally { setSaving(false); }
  };

  const set = (k: string, field: 'low' | 'high', v: string) =>
    setRows((rs) => rs.map((r) => (r.rate_key === k ? { ...r, [field]: v } : r)));

  if (loading) return <div className="p-8 text-slate-600">Loading…</div>;

  return (
    <div className="min-h-screen bg-[#F7F6F3]">
      <div className="max-w-3xl mx-auto px-5 py-8">
        <h1 className="text-2xl font-semibold text-[#0B2A5B] mb-1">Painting Labour Rates</h1>
        <p className="text-[13px] text-slate-600 mb-6 max-w-2xl leading-relaxed">
          Rupees per square foot, as a range. These drive the labour figures on the home
          painting cost estimator. While a rate is 0 the estimator shows quantities but no
          labour cost — it will not publish a number it cannot support.
        </p>

        {missing && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
            <p className="text-[13px] text-amber-900">
              The <b>painting_labour_rates</b> table does not exist yet. Run
              <b> labour-rates.sql</b> in Supabase → SQL Editor, then reload.
            </p>
          </div>
        )}

        {!missing && (
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <table className="w-full text-[13px] border-collapse">
              <thead>
                <tr className="bg-slate-100 text-left text-slate-700">
                  <th className="px-3 py-2 font-medium">Work</th>
                  <th className="px-3 py-2 font-medium text-center w-28">From ₹/sq ft</th>
                  <th className="px-3 py-2 font-medium text-center w-28">To ₹/sq ft</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={r.rate_key} className={i % 2 ? 'bg-slate-50/60' : ''}>
                    <td className="px-3 py-2 border-b border-slate-200">{r.label}</td>
                    <td className="px-3 py-2 border-b border-slate-200">
                      <input type="number" inputMode="decimal" value={r.low} placeholder="—"
                        onChange={(e) => set(r.rate_key, 'low', e.target.value)}
                        className="w-full border border-slate-300 rounded px-2 py-1.5 text-center" />
                    </td>
                    <td className="px-3 py-2 border-b border-slate-200">
                      <input type="number" inputMode="decimal" value={r.high} placeholder="—"
                        onChange={(e) => set(r.rate_key, 'high', e.target.value)}
                        className="w-full border border-slate-300 rounded px-2 py-1.5 text-center" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex items-center gap-3 mt-5">
              <button onClick={save} disabled={saving}
                className="bg-[#1E5AA8] hover:bg-[#164683] disabled:bg-slate-300 text-white text-[13px] font-medium px-5 py-2 rounded-lg">
                {saving ? 'Saving…' : 'Save rates'}
              </button>
              {msg && <span className="text-[12.5px] text-slate-700">{msg}</span>}
            </div>

            <p className="text-[11.5px] text-slate-500 mt-5 leading-relaxed">
              Quote a range rather than a single figure. Labour varies by locality, floor level
              and finish standard, and a homeowner shown one precise number will treat it as a
              quotation. A range sets the right expectation and still answers the question.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
