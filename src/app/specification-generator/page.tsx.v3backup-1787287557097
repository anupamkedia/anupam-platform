"use client";

import { useState, useMemo, type ReactNode } from "react";
import {
  PRODUCTS, PREP, SECTORS, SYSTEMS, FLAGS,
  type System,
} from "@/data/coating-systems";

/* ============================================================================
   Coating Specification Generator
   ----------------------------------------------------------------------------
   Sector -> asset -> exposure -> requirements. ISO 12944 corrosivity applies
   only where it belongs (steel in atmosphere); a coach interior, a potable
   water tank and a terrace are not described by it.
   ========================================================================== */

const ENV_LABEL: Record<string, string> = {
  C2: "C2 — Low (dry rural, unheated buildings)",
  C3: "C3 — Medium (urban, inland industrial)",
  C4: "C4 — High (chemical plant, coastal)",
  C5I: "C5-I — Very high, industrial",
  C5M: "C5-M — Very high, marine",
  CX: "CX — Extreme (offshore, splash zone)",
  Im1: "Im1 — Immersion, fresh water",
  Im2: "Im2 — Immersion, sea water",
  Im3: "Im3 — Buried in soil",
};

function spreadRate(vs: number, dft: number) {
  return ((vs * 10) / dft).toFixed(1);
}

export default function SpecificationGenerator() {
  const [sector, setSector] = useState<string>("buildings");
  const [asset, setAsset] = useState<string>(SECTORS.buildings.assets[0]);
  const [flags, setFlags] = useState<string[]>([]);
  const [systemId, setSystemId] = useState<string | null>(null);

  const [project, setProject] = useState("");
  const [client, setClient] = useState("");
  const [ref, setRef] = useState("");
  const [area, setArea] = useState("");
  const [loss, setLoss] = useState(30);

  /* systems matching the asset */
  const matches = useMemo(
    () => SYSTEMS.filter((s) => s.sector === sector && s.asset === asset),
    [sector, asset]
  );

  /* systems that also satisfy every requested requirement */
  const filtered = useMemo(() => {
    if (!flags.length) return matches;
    return matches.filter((s) => flags.every((f) => (s.flags || []).includes(f)));
  }, [matches, flags]);

  const system: System | undefined =
    filtered.find((s) => s.id === systemId) ?? filtered[0] ?? matches[0];

  /* requirements that no system for this asset can satisfy */
  const unmet = flags.filter((f) => !matches.some((s) => (s.flags || []).includes(f)));

  /* other sectors that DO cover an unmet requirement */
  const elsewhere = useMemo(() => {
    if (!unmet.length) return [];
    return SYSTEMS.filter((s) => unmet.every((f) => (s.flags || []).includes(f)))
      .slice(0, 4);
  }, [unmet]);

  const pickSector = (k: string) => {
    setSector(k); setAsset(SECTORS[k].assets[0]); setSystemId(null);
  };
  const pickAsset = (a: string) => { setAsset(a); setSystemId(null); };
  const toggleFlag = (f: string) =>
    setFlags((x) => (x.includes(f) ? x.filter((y) => y !== f) : [...x, f]));

  const totalMin = system ? system.coats.reduce((n, c) => n + c.coats * c.dftMin, 0) : 0;
  const totalMax = system ? system.coats.reduce((n, c) => n + c.coats * c.dftMax, 0) : 0;

  const areaNum = parseFloat(area);
  const showQty = !isNaN(areaNum) && areaNum > 0 && !!system;

  const today = new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  const specNo = ref || (system ? `AP/SPEC/${system.id.toUpperCase()}/${new Date().getFullYear()}` : "");

  return (
    <div className="min-h-screen bg-[#FAF8F4]">
      {/* hero — composed banner, no overlay */}
      <section className="print:hidden relative overflow-hidden bg-white">
        <img src="/img/heroes/hero-spec-generator.jpg"
          alt="Building a coating specification with Anupam Paints"
          className="w-full h-auto block" />
        <div className="not-sr-only md:sr-only max-w-7xl mx-auto px-5 py-6">
          <p className="text-[11px] tracking-[0.28em] uppercase text-slate-500 mb-2">Specifier Centre</p>
          <h1 className="text-2xl font-semibold text-[var(--color-navy)]">Coating Specification Generator</h1>
          <p className="mt-2 text-[13px] text-slate-600">
            Every division, every substrate — from an interior wall to an offshore jacket.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 md:px-5 py-8 grid lg:grid-cols-[360px_1fr] gap-7 items-start">
        {/* ---------------------------------------------- inputs ---------- */}
        <div className="print:hidden lg:sticky lg:top-6 space-y-5">
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <Step n="1" title="Sector" />
            <div className="grid gap-1 mt-3">
              {Object.entries(SECTORS).map(([k, v]) => (
                <button key={k} onClick={() => pickSector(k)}
                  className={`text-left px-3 py-2 rounded-lg text-[13px] transition-colors ${
                    sector === k ? "bg-[#0B2A5B] text-white" : "text-slate-700 hover:bg-slate-100"}`}>
                  {v.label}
                </button>
              ))}
            </div>
            <p className="text-[11.5px] text-slate-500 mt-3 leading-snug">{SECTORS[sector].blurb}</p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <Step n="2" title="Asset or surface" />
            <div className="grid gap-1 mt-3">
              {SECTORS[sector].assets.map((a) => (
                <button key={a} onClick={() => pickAsset(a)}
                  className={`text-left px-3 py-2 rounded-lg text-[13px] transition-colors ${
                    asset === a ? "bg-blue-50 text-[#0B2A5B] font-medium ring-1 ring-[#1E5AA8]/30" : "text-slate-700 hover:bg-slate-100"}`}>
                  {a}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <Step n="3" title="Special requirements" />
            <p className="text-[11.5px] text-slate-500 mt-1 mb-3">Optional. Narrows to systems that satisfy all of them.</p>
            <div className="flex flex-wrap gap-1.5">
              {Object.entries(FLAGS).map(([k, label]) => (
                <button key={k} onClick={() => toggleFlag(k)}
                  className={`text-[11.5px] px-2.5 py-1 rounded-full border transition-colors ${
                    flags.includes(k) ? "bg-[#0B2A5B] text-white border-[#0B2A5B]"
                      : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"}`}>
                  {label}
                </button>
              ))}
            </div>
            {unmet.length > 0 && (
              <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-3">
                <p className="text-[12px] text-amber-900 leading-snug">
                  No system for <span className="font-medium">{asset}</span> covers{" "}
                  {unmet.map((f) => FLAGS[f]).join(" and ")}.
                </p>
                {elsewhere.length > 0 && (
                  <>
                    <p className="text-[11.5px] text-amber-800 mt-2 mb-1">Covered elsewhere by:</p>
                    {elsewhere.map((s) => (
                      <button key={s.id}
                        onClick={() => { setSector(s.sector); setAsset(s.asset); setSystemId(s.id); }}
                        className="block text-left text-[11.5px] text-amber-900 underline hover:no-underline">
                        {SECTORS[s.sector].label} → {s.asset}
                      </button>
                    ))}
                  </>
                )}
              </div>
            )}
          </div>

          {filtered.length > 1 && (
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <Step n="4" title="System" />
              <div className="grid gap-2 mt-3">
                {filtered.map((s) => (
                  <button key={s.id} onClick={() => setSystemId(s.id)}
                    className={`text-left px-3 py-2.5 rounded-lg border text-[12.5px] transition-colors ${
                      system?.id === s.id ? "border-[#1E5AA8] ring-2 ring-[#1E5AA8]/20" : "border-slate-200 hover:border-slate-300"}`}>
                    <span className="font-medium text-slate-900 block">{s.label}</span>
                    <span className="text-slate-500">{s.life}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
            <Step n={filtered.length > 1 ? "5" : "4"} title="Project details" />
            <Inp v={project} set={setProject} p="Project name" />
            <Inp v={client} set={setClient} p="Client / consultant" />
            <Inp v={ref} set={setRef} p="Your specification reference" />
            <Inp v={area} set={setArea} p="Surface area (m²) — for quantities" />
            <div>
              <label className="block text-[11.5px] text-slate-600 mb-1">Loss factor {loss}%</label>
              <input type="range" min={10} max={70} step={5} value={loss}
                onChange={(e) => setLoss(parseInt(e.target.value))} className="w-full accent-[#1E5AA8]" />
              <p className="text-[10.5px] text-slate-400 leading-snug">
                15% plate and tank · 30% structural steel · 50%+ lattice, handrail, complex sections
              </p>
            </div>
            <button onClick={() => window.print()}
              className="w-full bg-[#1E5AA8] hover:bg-[#164683] text-white text-sm font-medium py-3 rounded-lg transition-colors">
              Download specification as PDF
            </button>
          </div>
        </div>

        {/* ---------------------------------------------- document -------- */}
        <div id="spec-doc" className="bg-white rounded-xl border border-slate-200 print:border-0 print:rounded-none">
          {!system ? (
            <div className="p-10 text-center text-slate-600 text-[14px]">
              No system matches that combination. Clear a requirement to see the options.
            </div>
          ) : (
            <>
              <div className="px-6 md:px-8 pt-8 pb-6 border-b-2 border-[#0B2A5B]">
                <div className="flex justify-between items-start gap-6 flex-wrap">
                  <div>
                    <p className="text-[19px] font-semibold text-[#0B2A5B] tracking-tight">ANUPAM PAINTS</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Anupam Enterprises · Established 1972 · ISO 9001 / 14001 / 45001
                    </p>
                  </div>
                  <div className="text-right text-[11px] text-slate-600 leading-relaxed">
                    <p className="font-medium text-slate-800">Protective Coating Specification</p>
                    <p>Spec. No. {specNo}</p>
                    <p>Date of issue {today}</p>
                  </div>
                </div>
              </div>

              {(project || client) && (
                <div className="px-6 md:px-8 py-5 border-b border-slate-200 grid sm:grid-cols-3 gap-4">
                  {project && <Meta k="Project" v={project} />}
                  {client && <Meta k="Client / consultant" v={client} />}
                  <Meta k="Application" v={`${SECTORS[system.sector].label} — ${system.asset}`} />
                </div>
              )}

              <Section n="1" title="System selected">
                <p className="text-[15px] font-semibold text-[#0B2A5B] mb-1">{system.label}</p>
                <p className="text-[13px] text-slate-700 leading-relaxed mb-4">{system.blurb}</p>
                <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
                  <Row k="Sector" v={SECTORS[system.sector].label} />
                  <Row k="Asset" v={system.asset} />
                  <Row k="Expected service life" v={system.life} />
                  {system.envs && <Row k="Suits corrosivity" v={system.envs.map((e) => ENV_LABEL[e]?.split(" —")[0] ?? e).join(", ")} />}
                  {system.tempMax && <Row k="Max service temperature" v={`${system.tempMax} °C`} />}
                  {system.flags && system.flags.length > 0 &&
                    <Row k="Satisfies" v={system.flags.map((f) => FLAGS[f]).join(", ")} />}
                </div>
              </Section>

              <Section n="2" title="Surface preparation">
                <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
                  <Row k="Preparation standard" v={PREP[system.prep].std} />
                  <Row k="Surface profile" v={PREP[system.prep].profile} />
                </div>
                <p className="mt-4 text-[13px] leading-relaxed text-slate-700">{PREP[system.prep].note}</p>
              </Section>

              <Section n="3" title="Coating schedule">
                <div className="overflow-x-auto -mx-1">
                  <table className="w-full text-[12.5px] border-collapse">
                    <thead>
                      <tr className="bg-[#0B2A5B] text-white text-left">
                        <Th>Coat</Th><Th>Product</Th><Th>Generic type</Th>
                        <Th className="text-center">Vol. solids</Th>
                        <Th className="text-center">Coats</Th>
                        <Th className="text-center">DFT / coat</Th>
                        <Th className="text-center">Method</Th>
                      </tr>
                    </thead>
                    <tbody>
                      {system.coats.map((c, i) => {
                        const p = PRODUCTS[c.product];
                        return (
                          <tr key={i} className={i % 2 ? "bg-slate-50/70" : ""}>
                            <Td className="whitespace-nowrap text-slate-500">{c.role}</Td>
                            <Td className="font-medium text-slate-900">{p.name}</Td>
                            <Td className="text-slate-600">{p.generic}</Td>
                            <Td className="text-center">{p.vs}%</Td>
                            <Td className="text-center">{c.coats}</Td>
                            <Td className="text-center whitespace-nowrap">{c.dftMin}–{c.dftMax} µm</Td>
                            <Td className="text-center text-slate-600">{c.method}</Td>
                          </tr>
                        );
                      })}
                      <tr className="border-t-2 border-[#0B2A5B] font-semibold">
                        <Td colSpan={5} className="text-right pr-4">Total system dry film thickness</Td>
                        <Td className="text-center whitespace-nowrap text-[#0B2A5B]">{totalMin}–{totalMax} µm</Td>
                        <Td />
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-6">
                  <p className="text-[11px] tracking-[0.16em] uppercase text-slate-500 mb-2">
                    Film cross-section, proportional to thickness
                  </p>
                  <div className="flex rounded-md overflow-hidden border border-slate-300 h-11">
                    {system.coats.map((c, i) => {
                      const share = ((c.coats * ((c.dftMin + c.dftMax) / 2)) / ((totalMin + totalMax) / 2)) * 100;
                      const shades = ["#0B2A5B", "#1E5AA8", "#4A82C4", "#8FB3DC", "#C3D6EC"];
                      return (
                        <div key={i} style={{ width: `${share}%`, background: shades[i % shades.length] }}
                          className="flex items-center justify-center text-[10px] text-white font-medium overflow-hidden px-1">
                          {share > 14 ? `${c.coats * c.dftMin}–${c.coats * c.dftMax} µm` : ""}
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                    <span>Substrate</span><span>Exposed face</span>
                  </div>
                </div>

                {showQty && (
                  <div className="mt-6">
                    <p className="text-[11px] tracking-[0.16em] uppercase text-slate-500 mb-2">
                      Indicative material quantity for {areaNum.toLocaleString("en-IN")} m²
                    </p>
                    <table className="w-full text-[12.5px] border-collapse">
                      <thead>
                        <tr className="bg-slate-100 text-left text-slate-700">
                          <Th>Product</Th>
                          <Th className="text-center">Coverage</Th>
                          <Th className="text-center">Theoretical</Th>
                          <Th className="text-center">Practical (+{loss}%)</Th>
                        </tr>
                      </thead>
                      <tbody>
                        {system.coats.map((c, i) => {
                          const p = PRODUCTS[c.product];
                          const dft = ((c.dftMin + c.dftMax) / 2) * c.coats;
                          const theo = (areaNum * dft) / (p.vs * 10);
                          return (
                            <tr key={i} className={i % 2 ? "bg-slate-50/70" : ""}>
                              <Td>{p.name}</Td>
                              <Td className="text-center text-slate-600">
                                {spreadRate(p.vs, (c.dftMin + c.dftMax) / 2)} m²/L
                              </Td>
                              <Td className="text-center">{theo.toFixed(0)} L</Td>
                              <Td className="text-center font-medium">{(theo * (1 + loss / 100)).toFixed(0)} L</Td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </Section>

              <Section n="4" title="Application requirements">
                <ol className="space-y-2.5">
                  {[...system.notes,
                    "All DFT values are dry film thickness. Monitor wet film during application and verify DFT to SSPC-PA2 after cure.",
                    "Stripe coat all edges, welds, bolt heads and cut-outs by brush where the substrate is steel.",
                    "Do not apply when the substrate is less than 3 °C above dew point, when relative humidity exceeds 85%, or below the minimum temperature on the product data sheet.",
                    "Observe minimum and maximum overcoating intervals. Where the maximum is exceeded, abrade and solvent wipe before the next coat.",
                  ].map((n, i) => (
                    <li key={i} className="flex gap-3 text-[13px] leading-relaxed text-slate-700">
                      <span className="text-slate-400 tabular-nums shrink-0">{String(i + 1).padStart(2, "0")}</span>
                      <span>{n}</span>
                    </li>
                  ))}
                </ol>
              </Section>

              <Section n="5" title="Standards and testing">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <p className="text-[11px] tracking-[0.16em] uppercase text-slate-500 mb-2">Applicable standards</p>
                    <ul className="space-y-1.5">
                      {system.standards.map((s) => (
                        <li key={s} className="text-[13px] text-slate-700 flex gap-2">
                          <span className="text-[#1E5AA8]">▪</span><span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-[11px] tracking-[0.16em] uppercase text-slate-500 mb-2">Testing and acceptance</p>
                    <ul className="space-y-1.5">
                      {system.tests.map((t) => (
                        <li key={t} className="text-[13px] text-slate-700 flex gap-2">
                          <span className="text-[#1E5AA8]">▪</span><span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Section>

              <div className="px-6 md:px-8 py-6 border-t border-slate-200 text-[11px] leading-relaxed text-slate-500">
                <p className="mb-2">
                  <span className="font-medium text-slate-700">Basis of issue.</span> Generated from the
                  selections recorded in Section 1 and issued for guidance. Final selection must be
                  confirmed against the current product technical data sheet, the project specification
                  and site conditions. Anupam Enterprises will issue a countersigned specification on
                  request following technical review.
                </p>
                <p>
                  Anupam Enterprises (Anupam Paints) · Poddar Point, 113 Park Street, 5th Floor, Block-B,
                  Kolkata 700016 · Works: Foundry Park, Laskarpur, Ranihati Amta Road, Howrah 711414 ·
                  033-22651204 · care@anupampaints.com · anupampaints.com
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      <style jsx global>{`
        @media print {
          body { background: #fff !important; }
          header, footer, nav, .print\\:hidden { display: none !important; }
          #spec-doc { box-shadow: none !important; border: 0 !important; }
          @page { margin: 12mm; size: A4; }
          section { break-inside: avoid; }
          tr { break-inside: avoid; }
        }
      `}</style>
    </div>
  );
}

/* ---------- pieces ---------- */
function Step({ n, title }: { n: string; title: string }) {
  return (
    <div className="flex items-baseline gap-2.5">
      <span className="text-[11px] tabular-nums text-[#1E5AA8] font-semibold">{n}</span>
      <h2 className="text-[13px] font-semibold text-[#0B2A5B]">{title}</h2>
    </div>
  );
}

function Inp({ v, set, p }: { v: string; set: (s: string) => void; p: string }) {
  return (
    <input value={v} onChange={(e) => set(e.target.value)} placeholder={p}
      className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-[13px] focus:outline-none focus:ring-2 focus:ring-[#1E5AA8]/40 focus:border-[#1E5AA8]" />
  );
}

function Section({ n, title, children }: { n: string; title: string; children: ReactNode }) {
  return (
    <section className="px-6 md:px-8 py-6 border-b border-slate-200">
      <div className="flex items-baseline gap-3 mb-4">
        <span className="text-[11px] tabular-nums text-[#1E5AA8] font-semibold">{n}</span>
        <h2 className="text-[15px] font-semibold text-[#0B2A5B] tracking-tight">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="text-[13px]">
      <span className="text-slate-500">{k}</span>
      <p className="text-slate-900 mt-0.5">{v}</p>
    </div>
  );
}

function Meta({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <p className="text-[10px] tracking-[0.16em] uppercase text-slate-400">{k}</p>
      <p className="text-[13px] text-slate-900 mt-1">{v}</p>
    </div>
  );
}

function Th({ children, className = "" }: { children?: ReactNode; className?: string }) {
  return <th className={`px-3 py-2.5 font-medium text-[11px] tracking-wide ${className}`}>{children}</th>;
}

function Td({ children, className = "", colSpan }: { children?: ReactNode; className?: string; colSpan?: number }) {
  return <td colSpan={colSpan} className={`px-3 py-2.5 align-top border-b border-slate-200 ${className}`}>{children}</td>;
}
