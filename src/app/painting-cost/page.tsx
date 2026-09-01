'use client';

import { useState, useEffect, useMemo, type ReactNode } from 'react';
import { createClient } from '@supabase/supabase-js';
import { PRODUCTS } from '@/data/coating-systems';
import {
  WALL_AREA_FACTOR, CEILING_FACTOR, HOME_SIZES, TIERS, DFT_PER_COAT, COATS,
  PUTTY_KG_PER_100_SQFT, CONDITIONS, WHATSAPP, type Condition,
} from '@/data/home-painting-config';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const rupees = (n: number) => '₹ ' + Math.round(n).toLocaleString('en-IN');

export default function PaintingCostPage() {
  const [size, setSize] = useState('2bhk');
  const [carpet, setCarpet] = useState('700');
  const [condition, setCondition] = useState<Condition>('repaintGood');
  const [doInterior, setDoInterior] = useState(true);
  const [doCeilings, setDoCeilings] = useState(true);
  const [doExterior, setDoExterior] = useState(false);
  const [tierKey, setTierKey] = useState('asure');

  const [price, setPrice] = useState<Record<string, number>>({});
  const [vsOv, setVsOv] = useState<Record<string, number>>({});
  const [labour, setLabour] = useState<Record<string, { low: number; high: number }>>({});

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [sent, setSent] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await supabase.from('coating_pricing').select('*');
        if (data) {
          const p: Record<string, number> = {}, v: Record<string, number> = {};
          data.forEach((d: any) => {
            if (d.price_per_litre > 0) p[d.product_key] = Number(d.price_per_litre);
            if (d.volume_solids) v[d.product_key] = Number(d.volume_solids);
          });
          setPrice(p); setVsOv(v);
        }
        const { data: lr } = await supabase.from('painting_labour_rates').select('*');
        if (lr) {
          const l: Record<string, { low: number; high: number }> = {};
          lr.forEach((d: any) => { l[d.rate_key] = { low: Number(d.rate_low) || 0, high: Number(d.rate_high) || 0 }; });
          setLabour(l);
        }
      } catch { /* tables missing — figures stay hidden, which is correct */ }
    })();
  }, []);

  const vsOf = (k: string) => vsOv[k] ?? PRODUCTS[k]?.vs ?? 40;
  /* sq ft covered per litre per coat, from volume solids and nominal DFT */
  const coverage = (k: string, dft: number) => ((vsOf(k) * 10) / dft) * 10.764;

  const carpetSqft = useMemo(() => {
    if (size === 'custom') return parseFloat(carpet) || 0;
    return HOME_SIZES.find((h) => h.key === size)?.carpetSqft ?? 0;
  }, [size, carpet]);

  const tier = TIERS.find((t) => t.key === tierKey)!;
  const cond = CONDITIONS[condition];

  const areas = useMemo(() => {
    const wall = doInterior ? carpetSqft * WALL_AREA_FACTOR : 0;
    const ceil = doCeilings ? carpetSqft * CEILING_FACTOR : 0;
    const ext = doExterior ? carpetSqft * 1.1 : 0;   // rough external envelope
    return { wall, ceil, ext, interior: wall + ceil, total: wall + ceil + ext };
  }, [carpetSqft, doInterior, doCeilings, doExterior]);

  /* ---------------- materials ---------------- */
  const materials = useMemo(() => {
    const rows: { label: string; detail: string; qty: string; cost: number | null; third?: boolean }[] = [];
    const add = (label: string, detail: string, key: string, sqft: number, dft: number, coats: number) => {
      if (sqft <= 0) return;
      const litres = (sqft * coats) / coverage(key, dft);
      const rate = price[key];
      rows.push({
        label, detail,
        qty: `${Math.ceil(litres)} litres`,
        cost: rate ? litres * rate : null,
      });
    };

    if (cond.puttyNeeded && areas.interior > 0) {
      rows.push({
        label: 'Wall putty', detail: 'Any good market putty — Anupam does not manufacture putty',
        qty: `${Math.ceil((areas.interior / 100) * PUTTY_KG_PER_100_SQFT)} kg`,
        cost: null, third: true,
      });
    }
    if (areas.interior > 0) add('Primer', PRODUCTS.UNIPRIM?.name ?? 'Wall primer', 'UNIPRIM', areas.interior, DFT_PER_COAT.primer, cond.primerCoats);
    if (areas.wall > 0) add('Interior emulsion', PRODUCTS[tier.interior]?.name ?? '', tier.interior, areas.wall, DFT_PER_COAT.interior, COATS.interior);
    if (areas.ceil > 0) add('Ceiling', PRODUCTS[tier.interior]?.name ?? '', tier.interior, areas.ceil, DFT_PER_COAT.interior, COATS.interior);
    if (areas.ext > 0) {
      add('Exterior primer', PRODUCTS.DAMPP?.name ?? '', 'DAMPP', areas.ext, DFT_PER_COAT.primer, 1);
      add('Exterior emulsion', PRODUCTS[tier.exterior]?.name ?? '', tier.exterior, areas.ext, DFT_PER_COAT.exterior, COATS.exterior);
    }
    return rows;
  }, [areas, tier, cond, price, vsOv]);

  const materialTotal = materials.reduce((n, r) => n + (r.cost ?? 0), 0);
  const materialsPriced = materials.length > 0 && materials.every((r) => r.cost !== null || r.third);
  const anyMaterialPrice = materials.some((r) => r.cost !== null);

  /* ---------------- labour ---------------- */
  const labourRows = useMemo(() => {
    const rows: { label: string; sqft: number; low: number; high: number }[] = [];
    const add = (label: string, key: string, sqft: number) => {
      const r = labour[key];
      if (!r || sqft <= 0 || (!r.low && !r.high)) return;
      rows.push({ label, sqft, low: sqft * r.low, high: sqft * r.high });
    };
    if (cond.puttyNeeded) add('Putty application', 'putty', areas.interior);
    if (condition === 'repaintDamaged') add('Scraping and repair', 'surface_repair', areas.interior);
    add('Interior painting', 'interior_paint', areas.interior);
    add('Exterior painting', 'exterior_paint', areas.ext);
    return rows;
  }, [areas, labour, cond, condition]);

  const labourLow = labourRows.reduce((n, r) => n + r.low, 0);
  const labourHigh = labourRows.reduce((n, r) => n + r.high, 0);
  const labourPriced = labourRows.length > 0;

  /* ---------------- repaint cycle over 10 years ---------------- */
  const cycle = useMemo(() => {
    return TIERS.map((t) => {
      const life = doExterior && !doInterior ? t.lifeYearsExterior : t.lifeYearsInterior;
      const rounds = Math.max(1, Math.ceil(10 / life));

      let mat = 0; let known = true;
      const addM = (key: string, sqft: number, dft: number, coats: number) => {
        if (sqft <= 0) return;
        const rate = price[key];
        if (!rate) { known = false; return; }
        mat += ((sqft * coats) / coverage(key, dft)) * rate;
      };
      addM(t.interior, areas.wall + areas.ceil, DFT_PER_COAT.interior, COATS.interior);
      addM(t.exterior, areas.ext, DFT_PER_COAT.exterior, COATS.exterior);
      addM('UNIPRIM', areas.interior, DFT_PER_COAT.primer, 1);

      const lab = labourRows.length
        ? (labourRows.reduce((n, r) => n + (r.low + r.high) / 2, 0))
        : 0;

      const perRound = mat + lab;
      return {
        tier: t, life, rounds,
        total: known && (mat > 0 || lab > 0) ? perRound * rounds : null,
        labourShare: perRound > 0 ? lab / perRound : 0,
      };
    });
  }, [areas, price, labourRows, doExterior, doInterior, vsOv]);

  const cyclePriced = cycle.some((c) => c.total !== null);
  const cheapest = cyclePriced ? [...cycle].filter(c => c.total !== null).sort((a, b) => a.total! - b.total!)[0] : null;

  const summary = encodeURIComponent(
    `Painting estimate request\n\nName: ${name}\nPhone: ${phone}\n` +
    `Home: ${HOME_SIZES.find(h => h.key === size)?.label} (${Math.round(carpetSqft)} sq ft carpet)\n` +
    `Condition: ${cond.label}\nRange: ${tier.brand}\n` +
    `Paintable area: ${Math.round(areas.total)} sq ft`
  );

  return (
    <div className="min-h-screen bg-[#F7F6F3]">
      <section className="bg-[var(--color-navy)] text-white">
        <div className="container-wide px-4 py-10 md:py-14">
          <div className="w-12 h-[2px] bg-[var(--color-red)] mb-5" />
          <h1 className="text-3xl md:text-5xl font-bold mb-3">What will it cost to paint my home?</h1>
          <p className="text-[15px] text-white/70 max-w-2xl leading-relaxed">
            An honest working estimate — paint, putty and labour — before anyone visits.
            You will also see why the cheapest paint is usually not the cheapest job.
          </p>
        </div>
      </section>

      <div className="container-wide px-4 py-8 grid lg:grid-cols-[360px_1fr] gap-7 items-start">
        {/* ------------------------- inputs ------------------------- */}
        <div className="lg:sticky lg:top-6 space-y-5">
          <Card title="Your home">
            <div className="grid grid-cols-2 gap-2 mt-3">
              {HOME_SIZES.map((h) => (
                <button key={h.key} onClick={() => { setSize(h.key); if (h.carpetSqft) setCarpet(String(h.carpetSqft)); }}
                  className={`text-left px-3 py-2 rounded-lg text-[13px] border transition-colors ${
                    size === h.key ? 'bg-[#0B2A5B] text-white border-[#0B2A5B]' : 'border-slate-200 text-slate-700 hover:border-slate-400'}`}>
                  {h.label}
                </button>
              ))}
            </div>
            <div className="mt-3">
              <label className="block text-[11.5px] text-slate-600 mb-1">Carpet area, sq ft</label>
              <input type="number" inputMode="numeric" value={carpet} onChange={(e) => { setCarpet(e.target.value); setSize('custom'); }}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-[13px]" />
              <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                Wall area works out at about {WALL_AREA_FACTOR}× carpet area for a standard ceiling height.
              </p>
            </div>
          </Card>

          <Card title="What needs painting">
            <div className="space-y-2.5 mt-3">
              <Check on={doInterior} set={setDoInterior} label="Interior walls" />
              <Check on={doCeilings} set={setDoCeilings} label="Ceilings" />
              <Check on={doExterior} set={setDoExterior} label="Exterior walls" />
            </div>
          </Card>

          <Card title="Condition of the walls">
            <div className="grid gap-2 mt-3">
              {(Object.keys(CONDITIONS) as Condition[]).map((k) => (
                <button key={k} onClick={() => setCondition(k)}
                  className={`text-left px-3 py-2.5 rounded-lg border text-[12.5px] transition-colors ${
                    condition === k ? 'border-[#1E5AA8] ring-2 ring-[#1E5AA8]/20' : 'border-slate-200 hover:border-slate-300'}`}>
                  <span className="font-medium text-slate-900 block">{CONDITIONS[k].label}</span>
                  <span className="text-slate-500 leading-snug">{CONDITIONS[k].note}</span>
                </button>
              ))}
            </div>
          </Card>

          <Card title="Paint range">
            <div className="grid gap-2 mt-3">
              {TIERS.map((t) => (
                <button key={t.key} onClick={() => setTierKey(t.key)}
                  className={`text-left px-3 py-2.5 rounded-lg border text-[12.5px] transition-colors ${
                    tierKey === t.key ? 'border-[#1E5AA8] ring-2 ring-[#1E5AA8]/20' : 'border-slate-200 hover:border-slate-300'}`}>
                  <span className="flex items-baseline justify-between">
                    <span className="font-semibold text-slate-900">{t.brand}</span>
                    <span className="text-[10.5px] uppercase tracking-wide text-slate-500">{t.position}</span>
                  </span>
                  <span className="text-slate-500 block leading-snug mt-0.5">{t.blurb}</span>
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* ------------------------- results ------------------------- */}
        <div className="space-y-5">
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h2 className="text-[15px] font-semibold text-[#0B2A5B] mb-4">Area to be painted</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Stat k="Carpet area" v={`${Math.round(carpetSqft).toLocaleString('en-IN')} sq ft`} />
              {areas.wall > 0 && <Stat k="Interior walls" v={`${Math.round(areas.wall).toLocaleString('en-IN')} sq ft`} />}
              {areas.ceil > 0 && <Stat k="Ceilings" v={`${Math.round(areas.ceil).toLocaleString('en-IN')} sq ft`} />}
              {areas.ext > 0 && <Stat k="Exterior" v={`${Math.round(areas.ext).toLocaleString('en-IN')} sq ft`} />}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h2 className="text-[15px] font-semibold text-[#0B2A5B] mb-1">Materials</h2>
            <p className="text-[12.5px] text-slate-600 mb-4">{tier.brand} · {cond.label}</p>
            {materials.length === 0 ? (
              <p className="text-[13px] text-slate-600">Choose at least one surface to paint.</p>
            ) : (
              <table className="w-full text-[12.5px] border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-left text-slate-700">
                    <th className="px-3 py-2 font-medium">Item</th>
                    <th className="px-3 py-2 font-medium text-center">Quantity</th>
                    {anyMaterialPrice && <th className="px-3 py-2 font-medium text-right">Cost</th>}
                  </tr>
                </thead>
                <tbody>
                  {materials.map((r, i) => (
                    <tr key={i} className={i % 2 ? 'bg-slate-50/60' : ''}>
                      <td className="px-3 py-2 border-b border-slate-200">
                        <span className="font-medium text-slate-900">{r.label}</span>
                        <span className="block text-[11px] text-slate-500">{r.detail}</span>
                      </td>
                      <td className="px-3 py-2 border-b border-slate-200 text-center whitespace-nowrap">{r.qty}</td>
                      {anyMaterialPrice && (
                        <td className="px-3 py-2 border-b border-slate-200 text-right whitespace-nowrap">
                          {r.cost !== null ? rupees(r.cost) : <span className="text-slate-400">buy locally</span>}
                        </td>
                      )}
                    </tr>
                  ))}
                  {anyMaterialPrice && (
                    <tr className="font-semibold border-t-2 border-[#0B2A5B]">
                      <td className="px-3 py-2.5" colSpan={2}>Materials</td>
                      <td className="px-3 py-2.5 text-right text-[#0B2A5B]">{rupees(materialTotal)}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>

          {labourPriced && (
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <h2 className="text-[15px] font-semibold text-[#0B2A5B] mb-1">Labour</h2>
              <p className="text-[12.5px] text-slate-600 mb-4">Typical range for this scope. Rates vary by locality and finish quality.</p>
              <table className="w-full text-[12.5px] border-collapse">
                <tbody>
                  {labourRows.map((r, i) => (
                    <tr key={i} className={i % 2 ? 'bg-slate-50/60' : ''}>
                      <td className="px-3 py-2 border-b border-slate-200">{r.label}</td>
                      <td className="px-3 py-2 border-b border-slate-200 text-center text-slate-500">
                        {Math.round(r.sqft).toLocaleString('en-IN')} sq ft
                      </td>
                      <td className="px-3 py-2 border-b border-slate-200 text-right whitespace-nowrap">
                        {rupees(r.low)} – {rupees(r.high)}
                      </td>
                    </tr>
                  ))}
                  <tr className="font-semibold border-t-2 border-[#0B2A5B]">
                    <td className="px-3 py-2.5" colSpan={2}>Labour</td>
                    <td className="px-3 py-2.5 text-right text-[#0B2A5B] whitespace-nowrap">
                      {rupees(labourLow)} – {rupees(labourHigh)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {materialsPriced && labourPriced && (
            <div className="bg-[var(--color-navy)] text-white rounded-xl p-6">
              <p className="text-[11px] tracking-[0.18em] uppercase text-white/50 mb-1">Estimated total</p>
              <p className="text-3xl font-bold">
                {rupees(materialTotal + labourLow)} – {rupees(materialTotal + labourHigh)}
              </p>
              <p className="text-[12.5px] text-white/60 mt-2 leading-relaxed">
                Materials at our price, labour at typical market rates. Excludes furniture moving,
                scaffolding above ground floor, and any structural or plumbing repair.
              </p>
            </div>
          )}

          {/* --------- the argument that matters --------- */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h2 className="text-[15px] font-semibold text-[#0B2A5B] mb-1">Over ten years</h2>
            <p className="text-[12.5px] text-slate-600 mb-4">
              A cheaper paint is repainted more often, and labour is charged again every time.
              This is the comparison most people never see.
            </p>
            <table className="w-full text-[12.5px] border-collapse">
              <thead>
                <tr className="bg-slate-100 text-left text-slate-700">
                  <th className="px-3 py-2 font-medium">Range</th>
                  <th className="px-3 py-2 font-medium text-center">Repaint every</th>
                  <th className="px-3 py-2 font-medium text-center">Times in 10 yrs</th>
                  {cyclePriced && <th className="px-3 py-2 font-medium text-right">10-year cost</th>}
                </tr>
              </thead>
              <tbody>
                {cycle.map((c, i) => (
                  <tr key={c.tier.key} className={`${i % 2 ? 'bg-slate-50/60' : ''} ${cheapest && c.tier.key === cheapest.tier.key ? 'ring-1 ring-emerald-300' : ''}`}>
                    <td className="px-3 py-2 border-b border-slate-200">
                      <span className="font-medium text-slate-900">{c.tier.brand}</span>
                      <span className="text-slate-500"> · {c.tier.position}</span>
                    </td>
                    <td className="px-3 py-2 border-b border-slate-200 text-center">{c.life} yrs</td>
                    <td className="px-3 py-2 border-b border-slate-200 text-center font-medium">{c.rounds}</td>
                    {cyclePriced && (
                      <td className="px-3 py-2 border-b border-slate-200 text-right whitespace-nowrap">
                        {c.total !== null ? rupees(c.total) : <span className="text-slate-400">—</span>}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
            {!cyclePriced && (
              <p className="text-[12.5px] text-slate-600 mt-4 leading-relaxed bg-slate-50 border border-slate-200 rounded-lg p-3">
                Cost figures appear once prices are set. The repaint counts above are the important
                part regardless: an economy paint is applied five times in ten years where a luxury
                one is applied twice — and the painter is paid on all five occasions.
              </p>
            )}
            {cheapest && (
              <p className="text-[12.5px] text-emerald-800 mt-3">
                Over ten years, <b>{cheapest.tier.brand}</b> works out cheapest for this scope.
              </p>
            )}
          </div>

          {/* --------- lead --------- */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h2 className="text-[15px] font-semibold text-[#0B2A5B] mb-1">Want this checked on site?</h2>
            <p className="text-[12.5px] text-slate-600 mb-4">
              A free site visit gives you a firm number instead of an estimate. No obligation.
            </p>
            <div className="grid sm:grid-cols-2 gap-3 mb-3">
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name"
                className="border border-slate-300 rounded-lg px-3 py-2.5 text-[13px]" />
              <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Mobile number" inputMode="tel"
                className="border border-slate-300 rounded-lg px-3 py-2.5 text-[13px]" />
            </div>
            <a href={name.trim() && phone.trim() ? `https://wa.me/${WHATSAPP}?text=${summary}` : undefined}
              target="_blank" rel="noopener noreferrer"
              onClick={() => name.trim() && phone.trim() && setSent(true)}
              className={`inline-block text-[13px] font-semibold px-6 py-2.5 rounded-lg ${
                name.trim() && phone.trim() ? 'bg-[var(--color-red)] text-white hover:opacity-90'
                                            : 'bg-slate-200 text-slate-400 pointer-events-none'}`}>
              Send my estimate on WhatsApp
            </a>
            {sent && <p className="text-[12.5px] text-emerald-700 mt-3">Sent. Our team will call you.</p>}
          </div>

          <p className="text-[11.5px] text-slate-500 leading-relaxed">
            This is a working estimate from area rules used across the trade, not a quotation.
            Actual quantities vary with wall texture, absorbency, colour change and the number of
            coats needed to cover. Putty is a third-party item — Anupam does not manufacture putty.
          </p>
        </div>
      </div>
    </div>
  );
}

function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5">
      <h2 className="text-[13px] font-semibold text-[#0B2A5B]">{title}</h2>
      {children}
    </div>
  );
}
function Check({ on, set, label }: { on: boolean; set: (b: boolean) => void; label: string }) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer">
      <input type="checkbox" checked={on} onChange={(e) => set(e.target.checked)} className="w-4 h-4 accent-[#1E5AA8]" />
      <span className="text-[13px] text-slate-700">{label}</span>
    </label>
  );
}
function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <p className="text-[11px] tracking-wide uppercase text-slate-500">{k}</p>
      <p className="text-[16px] font-semibold text-slate-900 mt-0.5">{v}</p>
    </div>
  );
}
