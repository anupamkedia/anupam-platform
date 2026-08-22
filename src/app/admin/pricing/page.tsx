'use client';

import { useState, useEffect, useMemo } from 'react';
import { createClient } from '@supabase/supabase-js';
import { PRODUCTS, ACCESS_LABEL } from '@/data/coating-systems';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Row { key: string; name: string; generic: string; codeVs: number; price: string; vs: string }

export default function AdminPricingPage() {
  const [rows, setRows] = useState<Row[]>([]);
  const [access, setAccess] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');
  const [filter, setFilter] = useState('');
  const [missingTable, setMissingTable] = useState(false);

  useEffect(() => {
    (async () => {
      const base: Row[] = Object.entries(PRODUCTS).map(([key, p]) => ({
        key, name: p.name, generic: p.generic, codeVs: p.vs, price: '', vs: '',
      }));
      const { data, error } = await supabase.from('coating_pricing').select('*');
      if (error) { setMissingTable(true); setRows(base); setLoading(false); return; }
      const byKey = Object.fromEntries((data || []).map((d: any) => [d.product_key, d]));
      setRows(base.map((r) => ({
        ...r,
        price: byKey[r.key]?.price_per_litre ? String(byKey[r.key].price_per_litre) : '',
        vs: byKey[r.key]?.volume_solids ? String(byKey[r.key].volume_solids) : '',
      })));
      const { data: ac } = await supabase.from('coating_access_cost').select('*');
      const acMap: Record<string, string> = {};
      Object.keys(ACCESS_LABEL).forEach((k) => {
        const hit = (ac || []).find((x: any) => x.access_key === k);
        acMap[k] = hit?.cost_per_m2 ? String(hit.cost_per_m2) : '';
      });
      setAccess(acMap);
      setLoading(false);
    })();
  }, []);

  const shown = useMemo(() => {
    const q = filter.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((r) =>
      r.name.toLowerCase().includes(q) || r.key.toLowerCase().includes(q) || r.generic.toLowerCase().includes(q));
  }, [rows, filter]);

  const filled = rows.filter((r) => parseFloat(r.price) > 0).length;

  const save = async () => {
    setSaving(true); setMsg('');
    try {
      const payload = rows
        .filter((r) => r.price !== '' || r.vs !== '')
        .map((r) => ({
          product_key: r.key,
          product_name: r.name,
          price_per_litre: parseFloat(r.price) || 0,
          volume_solids: r.vs === '' ? null : parseFloat(r.vs),
          updated_at: new Date().toISOString(),
        }));
      if (payload.length) {
        const { error } = await supabase.from('coating_pricing').upsert(payload, { onConflict: 'product_key' });
        if (error) throw error;
      }
      const acPayload = Object.entries(access).map(([k, v]) => ({
        access_key: k, label: ACCESS_LABEL[k],
        cost_per_m2: parseFloat(v) || 0, updated_at: new Date().toISOString(),
      }));
      const { error: e2 } = await supabase.from('coating_access_cost').upsert(acPayload, { onConflict: 'access_key' });
      if (e2) throw e2;
      setMsg(`Saved. ${payload.filter((p) => p.price_per_litre > 0).length} products now have a price.`);
    } catch (e: any) {
      setMsg(`Could not save: ${e.message || e}. If the tables do not exist yet, run pricing-tables.sql in Supabase first.`);
    } finally { setSaving(false); }
  };

  const set = (key: string, field: 'price' | 'vs', value: string) =>
    setRows((rs) => rs.map((r) => (r.key === key ? { ...r, [field]: value } : r)));

  if (loading) return <div className="p-8 text-slate-600">Loading…</div>;

  return (
    <div className="min-h-screen bg-[#F7F6F3]">
      <div className="max-w-5xl mx-auto px-5 py-8">
        <h1 className="text-2xl font-semibold text-[#0B2A5B] mb-1">Coating Pricing</h1>
        <p className="text-[13px] text-slate-600 mb-6 max-w-2xl">
          These figures drive the whole-life cost comparison in the Specification Generator.
          Until a product has a price, the tool shows the maintenance timeline but prints no
          rupee figure for it — deliberately, so it never publishes a number it cannot support.
        </p>

        {missingTable && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
            <p className="text-[13px] text-amber-900">
              The pricing tables do not exist yet. Run <b>pricing-tables.sql</b> in
              Supabase → SQL Editor, then reload this page. You can type figures in
              meanwhile but saving will fail.
            </p>
          </div>
        )}

        <div className="bg-white rounded-xl border border-slate-200 p-5 mb-6">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <input value={filter} onChange={(e) => setFilter(e.target.value)}
              placeholder="Search product"
              className="flex-1 min-w-[200px] border border-slate-300 rounded-lg px-3 py-2 text-[13px]" />
            <span className="text-[12.5px] text-slate-500">
              {filled} of {rows.length} priced
            </span>
            <button onClick={save} disabled={saving}
              className="bg-[#1E5AA8] hover:bg-[#164683] disabled:bg-slate-300 text-white text-[13px] font-medium px-5 py-2 rounded-lg">
              {saving ? 'Saving…' : 'Save all'}
            </button>
          </div>
          {msg && <p className="text-[12.5px] text-slate-700 mb-3">{msg}</p>}

          <div className="overflow-x-auto">
            <table className="w-full text-[12.5px] border-collapse">
              <thead>
                <tr className="bg-slate-100 text-left text-slate-700">
                  <th className="px-3 py-2 font-medium">Product</th>
                  <th className="px-3 py-2 font-medium w-28 text-center">Price / litre</th>
                  <th className="px-3 py-2 font-medium w-28 text-center">Vol. solids</th>
                </tr>
              </thead>
              <tbody>
                {shown.map((r, i) => (
                  <tr key={r.key} className={i % 2 ? 'bg-slate-50/60' : ''}>
                    <td className="px-3 py-2 border-b border-slate-200">
                      <span className="font-medium text-slate-900">{r.name}</span>
                      <span className="block text-[11px] text-slate-500">{r.generic}</span>
                    </td>
                    <td className="px-3 py-2 border-b border-slate-200">
                      <input type="number" inputMode="decimal" value={r.price}
                        onChange={(e) => set(r.key, 'price', e.target.value)}
                        placeholder="—"
                        className="w-full border border-slate-300 rounded px-2 py-1.5 text-center text-[12.5px]" />
                    </td>
                    <td className="px-3 py-2 border-b border-slate-200">
                      <input type="number" inputMode="decimal" value={r.vs}
                        onChange={(e) => set(r.key, 'vs', e.target.value)}
                        placeholder={String(r.codeVs)}
                        className="w-full border border-slate-300 rounded px-2 py-1.5 text-center text-[12.5px]" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[11.5px] text-slate-500 mt-3">
            Volume solids is greyed with the figure currently in the code. Typing a value
            here overrides it everywhere — coverage, litreage and cost. This is the number
            that most affects the quantities an engineer orders from, so it is worth
            checking against your TDS.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h2 className="text-[15px] font-semibold text-[#0B2A5B] mb-1">Access cost, per m²</h2>
          <p className="text-[12.5px] text-slate-600 mb-4 max-w-2xl">
            What it costs to reach the surface, excluding the coating — scaffolding, containment,
            traffic management, lost production. This is usually several times the coating cost
            and it is the figure that shows why a durable system is the cheaper one.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {Object.entries(ACCESS_LABEL).map(([k, label]) => (
              <div key={k} className="flex items-center gap-3">
                <span className="text-[12.5px] text-slate-700 flex-1">{label}</span>
                <input type="number" inputMode="decimal" value={access[k] ?? ''}
                  onChange={(e) => setAccess((a) => ({ ...a, [k]: e.target.value }))}
                  placeholder="—"
                  className="w-28 border border-slate-300 rounded px-2 py-1.5 text-center text-[12.5px]" />
              </div>
            ))}
          </div>
        </div>

        <p className="text-[11.5px] text-slate-500 mt-6">
          Figures are read by the Specification Generator on each visit. Nothing is cached,
          so a change here shows on the site immediately.
        </p>
      </div>
    </div>
  );
}
