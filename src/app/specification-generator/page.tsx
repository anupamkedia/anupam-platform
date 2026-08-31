"use client";

import { useState, useMemo, useEffect, useRef, type ReactNode } from "react";
import {
  PRODUCTS, PREP, SECTORS, SYSTEMS, FLAGS, ACCESS_LABEL, CROSSREF, BASE_LABEL,
  type System,
} from "@/data/coating-systems";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const DUR_LABEL: Record<string, string> = {
  M:  "Medium — 7 to 15 years",
  H:  "High — 15 to 25 years",
  VH: "Very high — 25 years and beyond",
};

const TDS_URL = "https://tds-msds-manager.vercel.app/catalog";
const WHATSAPP = "919831728605";

const ENV_LABEL: Record<string, string> = {
  C2: "C2 — Low", C3: "C3 — Medium", C4: "C4 — High",
  C5I: "C5-I — Very high, industrial", C5M: "C5-M — Very high, marine",
  CX: "CX — Extreme", Im1: "Im1 — Fresh water", Im2: "Im2 — Sea water", Im3: "Im3 — Buried",
};

const rate = (vs: number, dft: number) => ((vs * 10) / dft).toFixed(1);
const totalDFT = (s: System) => s.coats.reduce((n, c) => n + c.coats * ((c.dftMin + c.dftMax) / 2), 0);

/* years to first major maintenance, parsed from the life string */
function lifeYears(s: System) {
  const m = s.life.match(/(\d+)\s*[–-]\s*(\d+)/);
  if (m) return (parseInt(m[1]) + parseInt(m[2])) / 2;
  const one = s.life.match(/(\d+)/);
  return one ? parseInt(one[1]) : 10;
}

/* material cost per m², or null when prices are not set */
function materialCost(s: System, price: Record<string, number>, vs: (k: string) => number) {
  let sum = 0;
  for (const c of s.coats) {
    const rate = price[c.product];
    if (!rate) return null;                    // no price = no figure, ever
    const dft = ((c.dftMin + c.dftMax) / 2) * c.coats;
    sum += (dft / (vs(c.product) * 10)) * rate;
  }
  return sum;
}

/* ---------- why this system — derived from the system's own fields ---------- */
function rationale(s: System): string[] {
  const out: string[] = [];
  const ids = s.coats.map((c) => c.product as string);
  const dft = Math.round(totalDFT(s));

  if (ids.includes("IZS"))
    out.push("Inorganic zinc silicate is specified because at this corrosivity the primer must give cathodic protection, not just barrier. Zinc corrodes preferentially and protects the steel even where the film is damaged.");
  else if (ids.includes("ZNEP"))
    out.push("A zinc rich epoxy primer gives sacrificial protection at damage points. Below C4 an inhibitive primer is usually adequate; at C4 and above the sacrificial mechanism earns its cost.");
  else if (ids.includes("EPZP"))
    out.push("Epoxy zinc phosphate gives inhibitive protection, which suits this exposure without the cost of a zinc rich primer.");

  if (ids.includes("EPMIO"))
    out.push("The micaceous iron oxide intermediate is the barrier layer. Its lamellar pigment lengthens the path moisture and oxygen must travel to reach the steel, which is why film build here matters more than gloss.");
  if (ids.includes("GFEP"))
    out.push("Glass flake reinforcement is specified for immersion and splash service, where a conventional epoxy barrier would absorb water over time.");
  if (ids.includes("EPMAS"))
    out.push("A surface tolerant mastic is used where preparation may fall short of the ideal, which is realistic for maintenance and site work.");

  if (ids.includes("PASP"))
    out.push("A polyaspartic finish cures fast and holds colour, so the asset returns to service in hours rather than days.");
  else if (ids.includes("PSX"))
    out.push("Polysiloxane delivers long gloss and colour retention in fewer coats than a conventional polyurethane build, and contains no isocyanate.");
  else if (ids.includes("FEVE"))
    out.push("FEVE fluoropolymer is specified where gloss retention beyond ten years is required. Aliphatic polyurethane is the lower cost alternative at five to seven years.");
  else if (ids.includes("PUTOP"))
    out.push("An aliphatic polyurethane finish gives UV stability and colour retention. Epoxy alone would chalk within a year in daylight.");

  if (s.prep === "SA3")
    out.push("Sa 3 white metal blast is specified because immersion and extreme service leave no tolerance for residual contamination under the film.");
  else if (s.prep === "SA25")
    out.push("Sa 2½ is the standard for high performance systems. Preparation, not product, causes most coating failures.");
  else if (s.prep === "CSP3")
    out.push("Concrete must be mechanically prepared and moisture tested. Trapped moisture vapour is the most common cause of floor coating delamination.");
  else if (s.prep === "MASONRY")
    out.push("Masonry must be dry and cured before coating. Painting a damp wall traps moisture and guarantees blistering, whatever the product.");

  out.push(`Total dry film thickness of about ${dft} µm reflects the exposure and the ${lifeYears(s)} year design life. Reducing it shortens the life disproportionately, because the barrier is the film.`);
  return out;
}

export default function SpecificationGenerator() {
  const [sector, setSector] = useState("buildings");
  const [asset, setAsset] = useState(SECTORS.buildings.assets[0]);
  const [flags, setFlags] = useState<string[]>([]);
  const [systemId, setSystemId] = useState<string | null>(null);
  const [compareId, setCompareId] = useState<string | null>(null);
  const [access, setAccess] = useState("ground");
  const [durWanted, setDurWanted] = useState<string>("");     // "" = let the tool choose
  const [lowVoc, setLowVoc] = useState(false);                // prefer water-borne
  const [price, setPrice] = useState<Record<string, number>>({});
  const [vsOverride, setVsOverride] = useState<Record<string, number>>({});
  const [accessCost, setAccessCost] = useState<Record<string, number>>({});
  const [horizon, setHorizon] = useState(25);

  const [project, setProject] = useState("");
  const [client, setClient] = useState("");
  const [ref, setRef] = useState("");
  const [area, setArea] = useState("");
  const [loss, setLoss] = useState(30);

  const [tab, setTab] = useState<"spec" | "why" | "life" | "check" | "match">("spec");
  const [gate, setGate] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [gateAfter, setGateAfter] = useState<'spec' | 'check' | 'save'>('spec');
  const [gName, setGName] = useState(""); const [gFirm, setGFirm] = useState(""); const [gPhone, setGPhone] = useState("");
  const [saved, setSaved] = useState<{ id: string; label: string; url: string; when: string }[]>([]);
  const [qr, setQr] = useState<string>("");
  const [query, setQuery] = useState("");
  const printMode = useRef<"spec" | "check">("spec");

  const matches = useMemo(() => SYSTEMS.filter((s) => s.sector === sector && s.asset === asset), [sector, asset]);
  const isWaterBorne = (sys: System) =>
    sys.coats.every((c) => {
      const b = PRODUCTS[c.product].base;
      return b === 'wb' || b === 'sf';        // solvent-free counts as low-VOC
    });

  const filtered = useMemo(() => {
    let out = flags.length ? matches.filter((s) => flags.every((f) => (s.flags || []).includes(f))) : matches;
    if (lowVoc) {
      const wb = out.filter(isWaterBorne);
      if (wb.length) out = wb;                // only narrow if something remains
    }
    return out;
  }, [matches, flags, lowVoc]);

  /* is a low-VOC route available for this asset at all? */
  const lowVocAvailable = useMemo(() => matches.some(isWaterBorne), [matches]);
  /* Recommended system: honour an explicit pick, then the requested design
     life, then the tool's own default — which is the longest-life system that
     is not the extreme one, i.e. exactly what it showed before this control
     existed. */
  const recommended = useMemo(() => {
    if (systemId) { const p = filtered.find((s) => s.id === systemId); if (p) return p; }
    if (durWanted) { const d = filtered.find((s) => s.dur === durWanted); if (d) return d; }
    return filtered[0] ?? matches[0];
  }, [filtered, matches, systemId, durWanted]);

  const system: System | undefined = recommended;

  /* other systems for the same asset, with the reason each might be chosen */
  const alternatives = useMemo(() => {
    if (!system) return [];
    return matches
      .filter((s) => s.id !== system.id)
      .map((s) => {
        const mine = lifeYears(system), theirs = lifeYears(s);
        let why = s.bestWhen ?? "";
        if (!why) {
          why = theirs < mine
            ? "Lower initial cost, shorter life. Worth it only where access for repainting is easy."
            : "Longer life for a higher initial cost. Pays back wherever access is difficult or disruptive.";
        }
        return { s, why, longer: theirs > mine };
      })
      .sort((a, b) => lifeYears(a.s) - lifeYears(b.s));
  }, [matches, system]);

  const durOptions = useMemo(
    () => Array.from(new Set(matches.map((s) => s.dur).filter(Boolean))) as string[],
    [matches]);
  const rival = compareId ? SYSTEMS.find((s) => s.id === compareId) : undefined;

  const unmet = flags.filter((f) => !matches.some((s) => (s.flags || []).includes(f)));
  const elsewhere = useMemo(
    () => (unmet.length ? SYSTEMS.filter((s) => unmet.every((f) => (s.flags || []).includes(f))).slice(0, 4) : []),
    [unmet]);

  /* ---------- URL state: makes the spec shareable and the QR meaningful ---------- */
  const shareUrl = useMemo(() => {
    if (typeof window === "undefined" || !system) return "";
    const p = new URLSearchParams({ s: system.id });
    if (area) p.set("a", area);
    if (compareId) p.set("c", compareId);
    return `${window.location.origin}${window.location.pathname}?${p}`;
  }, [system, area, compareId]);

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const s = p.get("s"); const found = s && SYSTEMS.find((x) => x.id === s);
    if (found) { setSector(found.sector); setAsset(found.asset); setSystemId(found.id); }
    const a = p.get("a"); if (a) setArea(a);
    const c = p.get("c"); if (c && SYSTEMS.some((x) => x.id === c)) setCompareId(c);
    try { setSaved(JSON.parse(localStorage.getItem("anupam.specs") || "[]")); } catch { /* first visit */ }
    try {
      const who = JSON.parse(localStorage.getItem("anupam.who") || "null");
      if (who && who.name && who.phone) { setUnlocked(true); setGName(who.name); setGFirm(who.firm || ""); setGPhone(who.phone); }
    } catch { /* private browsing */ }
  }, []);

  /* ---------- live pricing, maintained in the admin panel ---------- */
  useEffect(() => {
    (async () => {
      try {
        const { data } = await supabase.from("coating_pricing").select("*");
        if (data) {
          const p: Record<string, number> = {}, v: Record<string, number> = {};
          data.forEach((d: any) => {
            if (d.price_per_litre > 0) p[d.product_key] = Number(d.price_per_litre);
            if (d.volume_solids) v[d.product_key] = Number(d.volume_solids);
          });
          setPrice(p); setVsOverride(v);
        }
        const { data: ac } = await supabase.from("coating_access_cost").select("*");
        if (ac) {
          const a: Record<string, number> = {};
          ac.forEach((d: any) => { if (d.cost_per_m2 > 0) a[d.access_key] = Number(d.cost_per_m2); });
          setAccessCost(a);
        }
      } catch { /* tables not created yet — costs stay hidden, which is correct */ }
    })();
  }, []);

  const vsOf = (key: string) => vsOverride[key] ?? PRODUCTS[key].vs;

  /* ---------- QR ---------- */
  useEffect(() => {
    document.body.classList.toggle('locked', !unlocked);
    return () => document.body.classList.remove('locked');
  }, [unlocked]);

  useEffect(() => {
    if (!shareUrl) return;
    let live = true;
    import("qrcode")
      .then((m) => m.toDataURL(shareUrl, { errorCorrectionLevel: "M", margin: 1, width: 240 }))
      .then((d) => { if (live) setQr(d); })
      .catch(() => setQr(""));
    return () => { live = false; };
  }, [shareUrl]);

  const saveSpec = () => {
    if (!system) return;
    if (!unlocked) { setGateAfter('save'); setGate(true); return; }
    const entry = { id: system.id, label: `${system.label}${project ? " — " + project : ""}`, url: shareUrl, when: new Date().toLocaleDateString("en-IN") };
    const next = [entry, ...saved.filter((x) => x.url !== entry.url)].slice(0, 20);
    setSaved(next);
    try { localStorage.setItem("anupam.specs", JSON.stringify(next)); } catch { /* private browsing */ }
  };

  const doPrint = (mode: "spec" | "check") => {
    if (!unlocked) { setGateAfter(mode); setGate(true); return; }
    printMode.current = mode; setTab(mode === "check" ? "check" : "spec");
    setTimeout(() => window.print(), 60);
  };

  /* completing the form is what unlocks download, print and save */
  const unlock = () => {
    if (!gName.trim() || !gPhone.trim()) return;
    try { localStorage.setItem("anupam.who", JSON.stringify({ name: gName, firm: gFirm, phone: gPhone })); } catch { /* ignore */ }
    setUnlocked(true); setGate(false);
    const next = gateAfter;
    setTimeout(() => {
      if (next === 'save') { const el = document.getElementById('save-btn'); el?.click(); }
      else { printMode.current = next; setTab(next === 'check' ? 'check' : 'spec'); setTimeout(() => window.print(), 60); }
    }, 250);
  };

  const totalMin = system ? system.coats.reduce((n, c) => n + c.coats * c.dftMin, 0) : 0;
  const totalMax = system ? system.coats.reduce((n, c) => n + c.coats * c.dftMax, 0) : 0;
  const areaNum = parseFloat(area);
  const showQty = !isNaN(areaNum) && areaNum > 0 && !!system;

  const today = new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  const specNo = ref || (system ? `AP/SPEC/${system.id.toUpperCase()}/${new Date().getFullYear()}` : "");

  const crossHits = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    return CROSSREF.filter((c) =>
      c.product.toLowerCase().includes(q) || c.brand.toLowerCase().includes(q) || c.generic.toLowerCase().includes(q)
    ).slice(0, 8);
  }, [query]);

  const gateText = encodeURIComponent(
    `Specification request\n\nName: ${gName}\nFirm: ${gFirm}\nPhone: ${gPhone}\n` +
    `Project: ${project || "—"}\nSystem: ${system?.label}\nSpec no: ${specNo}\n${shareUrl}`);

  return (
    <div className="min-h-screen bg-[#FAF8F4]">
      <section className="print:hidden relative overflow-hidden bg-white">
        <img src="/img/heroes/hero-spec-generator.jpg" alt="Building a coating specification with Anupam Paints" className="w-full h-auto block" />
        <div className="not-sr-only md:sr-only max-w-7xl mx-auto px-5 py-6">
          <h1 className="text-2xl font-semibold text-[var(--color-navy)]">Coating Specification Generator</h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 md:px-5 py-8 grid lg:grid-cols-[340px_1fr] gap-7 items-start">
        {/* ------------------------------- inputs ------------------------------ */}
        <div className="print:hidden lg:sticky lg:top-6 space-y-5 max-h-[calc(100vh-3rem)] overflow-y-auto pr-1">
          <Panel n="1" title="Sector">
            <div className="grid gap-1 mt-3">
              {Object.entries(SECTORS).map(([k, v]) => (
                <button key={k} onClick={() => { setSector(k); setAsset(SECTORS[k].assets[0]); setSystemId(null); setCompareId(null); }}
                  className={`text-left px-3 py-2 rounded-lg text-[13px] ${sector === k ? "bg-[#0B2A5B] text-white" : "text-slate-700 hover:bg-slate-100"}`}>
                  {v.label}
                </button>
              ))}
            </div>
          </Panel>

          <Panel n="2" title="Asset or surface">
            <div className="grid gap-1 mt-3">
              {SECTORS[sector].assets.map((a) => (
                <button key={a} onClick={() => { setAsset(a); setSystemId(null); setCompareId(null); }}
                  className={`text-left px-3 py-2 rounded-lg text-[13px] ${asset === a ? "bg-blue-50 text-[#0B2A5B] font-medium ring-1 ring-[#1E5AA8]/30" : "text-slate-700 hover:bg-slate-100"}`}>
                  {a}
                </button>
              ))}
            </div>
          </Panel>

          <Panel n="3" title="Special requirements">
            <div className="flex flex-wrap gap-1.5 mt-3">
              {Object.entries(FLAGS).map(([k, label]) => (
                <button key={k} onClick={() => setFlags((x) => x.includes(k) ? x.filter((y) => y !== k) : [...x, k])}
                  className={`text-[11.5px] px-2.5 py-1 rounded-full border ${flags.includes(k) ? "bg-[#0B2A5B] text-white border-[#0B2A5B]" : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"}`}>
                  {label}
                </button>
              ))}
            </div>
            <label className="flex items-start gap-2.5 cursor-pointer mt-4 pt-4 border-t border-slate-100">
              <input type="checkbox" checked={lowVoc} onChange={(e) => { setLowVoc(e.target.checked); setSystemId(null); }}
                className="w-4 h-4 accent-[#1E5AA8] mt-0.5" />
              <span>
                <span className="text-[12.5px] text-slate-700 block">Prefer low-VOC / water-borne</span>
                <span className="text-[11px] text-slate-500 block leading-snug">
                  {lowVocAvailable
                    ? "For occupied buildings, green building credits, or a tender with a VOC ceiling."
                    : "No water-borne route exists for this asset — the selection is unchanged."}
                </span>
              </span>
            </label>

            {unmet.length > 0 && (
              <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-3">
                <p className="text-[12px] text-amber-900">No system for <b>{asset}</b> covers {unmet.map((f) => FLAGS[f]).join(" and ")}.</p>
                {elsewhere.map((s) => (
                  <button key={s.id} onClick={() => { setSector(s.sector); setAsset(s.asset); setSystemId(s.id); }}
                    className="block text-left text-[11.5px] text-amber-900 underline mt-1">
                    {SECTORS[s.sector].label} → {s.asset}
                  </button>
                ))}
              </div>
            )}
          </Panel>

          {durOptions.length > 1 && (
            <Panel n="4" title="Design life">
              <p className="text-[11.5px] text-slate-500 mt-1 mb-3">
                How long before first major maintenance. Leave as recommended unless
                the project sets a figure.
              </p>
              <div className="grid gap-1">
                <button onClick={() => { setDurWanted(""); setSystemId(null); }}
                  className={`text-left px-3 py-2 rounded-lg text-[13px] ${
                    durWanted === "" ? "bg-[#0B2A5B] text-white" : "text-slate-700 hover:bg-slate-100"}`}>
                  Recommended
                </button>
                {(["M", "H", "VH"] as const).filter((d) => durOptions.includes(d)).map((d) => (
                  <button key={d} onClick={() => { setDurWanted(d); setSystemId(null); }}
                    className={`text-left px-3 py-2 rounded-lg text-[13px] ${
                      durWanted === d ? "bg-[#0B2A5B] text-white" : "text-slate-700 hover:bg-slate-100"}`}>
                    {DUR_LABEL[d]}
                  </button>
                ))}
              </div>
            </Panel>
          )}

          {filtered.length > 1 && (
            <Panel n="5" title="System">
              <div className="grid gap-2 mt-3">
                {filtered.map((s) => (
                  <button key={s.id} onClick={() => setSystemId(s.id)}
                    className={`text-left px-3 py-2.5 rounded-lg border text-[12.5px] ${system?.id === s.id ? "border-[#1E5AA8] ring-2 ring-[#1E5AA8]/20" : "border-slate-200 hover:border-slate-300"}`}>
                    <span className="font-medium text-slate-900 block">{s.label}</span>
                    <span className="text-slate-500">{s.life}</span>
                  </button>
                ))}
              </div>
            </Panel>
          )}

          <Panel n="6" title="Project details">
            <div className="space-y-3 mt-3">
              <Inp v={project} set={setProject} p="Project name" />
              <Inp v={client} set={setClient} p="Client / consultant" />
              <Inp v={ref} set={setRef} p="Your specification reference" />
              <Inp v={area} set={setArea} p="Surface area (m²)" />
              <div>
                <label className="block text-[11.5px] text-slate-600 mb-1">Loss factor {loss}%</label>
                <input type="range" min={10} max={70} step={5} value={loss} onChange={(e) => setLoss(+e.target.value)} className="w-full accent-[#1E5AA8]" />
              </div>
              <div>
                <label className="block text-[11.5px] text-slate-600 mb-1">Access for future maintenance</label>
                <select value={access} onChange={(e) => setAccess(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-[13px]">
                  {Object.entries(ACCESS_LABEL).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                </select>
              </div>
            </div>
          </Panel>

          <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-2">
            <button onClick={() => doPrint('spec')}
              className="w-full bg-[#1E5AA8] hover:bg-[#164683] text-white text-sm font-medium py-3 rounded-lg">
              {unlocked ? "Download specification" : "Download specification →"}
            </button>
            <button onClick={() => doPrint("check")}
              className="w-full border border-slate-300 hover:border-[#1E5AA8] text-slate-800 text-[13px] py-2.5 rounded-lg">
              Print inspection checklist
            </button>
            <button id="save-btn" onClick={() => {
                if (!unlocked) { setGateAfter('save'); setGate(true); return; }
                if (!system) return;
                const entry = { id: system.id, label: `${system.label}${project ? " — " + project : ""}`, url: shareUrl, when: new Date().toLocaleDateString("en-IN") };
                const next = [entry, ...saved.filter((x) => x.url !== entry.url)].slice(0, 20);
                setSaved(next);
                try { localStorage.setItem("anupam.specs", JSON.stringify(next)); } catch { /* ignore */ }
              }}
              className="w-full border border-slate-300 hover:border-[#1E5AA8] text-slate-800 text-[13px] py-2.5 rounded-lg">
              Save this spec to my device
            </button>
            {!unlocked && (
              <p className="text-[11px] text-slate-500 leading-snug pt-1">
                Download, print and save are released once you tell us who the
                specification is for. One form, once — we remember you after that.
              </p>
            )}
          </div>

          {saved.length > 0 && (
            <Panel n="" title="Saved specifications">
              <p className="text-[11px] text-slate-500 mt-1 mb-2">Stored in this browser only, not on our servers.</p>
              {saved.map((s, i) => (
                <div key={i} className="flex items-center gap-2 py-1.5 border-b border-slate-100 last:border-0">
                  <a href={s.url} className="text-[12px] text-[#1E5AA8] hover:underline truncate flex-1">{s.label}</a>
                  <span className="text-[10.5px] text-slate-400 shrink-0">{s.when}</span>
                  <button onClick={() => { const n = saved.filter((_, j) => j !== i); setSaved(n); localStorage.setItem("anupam.specs", JSON.stringify(n)); }}
                    className="text-slate-400 hover:text-red-600 text-[12px]">✕</button>
                </div>
              ))}
            </Panel>
          )}
        </div>

        {/* ------------------------------ document ----------------------------- */}
        <div>
          <div className="print:hidden flex gap-1 mb-4 bg-slate-100 p-1 rounded-lg overflow-x-auto">
            {([["spec", "Specification"], ["why", "Why this system"], ["life", "Whole-life cost"],
               ["check", "Inspection checklist"], ["match", "Match a competitor product"]] as const).map(([k, l]) => (
              <button key={k} onClick={() => setTab(k)}
                className={`px-3 py-2 rounded-md text-[12.5px] whitespace-nowrap ${tab === k ? "bg-white text-[#0B2A5B] font-medium shadow-sm" : "text-slate-600"}`}>
                {l}
              </button>
            ))}
          </div>

          <div id="spec-doc" className="bg-white rounded-xl border border-slate-200 print:border-0">
            {!system ? (
              <div className="p-10 text-center text-slate-600">No system matches. Clear a requirement.</div>
            ) : (
              <>
                <div className="px-6 md:px-8 pt-8 pb-6 border-b-2 border-[#0B2A5B] flex justify-between items-start gap-6 flex-wrap">
                  <div>
                    <p className="text-[19px] font-semibold text-[#0B2A5B]">ANUPAM PAINTS</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">Anupam Enterprises · Established 1972 · ISO 9001 / 14001 / 45001</p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="text-right text-[11px] text-slate-600">
                      <p className="font-medium text-slate-800">{tab === "check" ? "Inspection & Test Plan" : "Protective Coating Specification"}</p>
                      <p>Spec. No. {specNo}</p><p>Date {today}</p>
                      {project && <p className="mt-1">{project}</p>}
                      {client && <p>{client}</p>}
                    </div>
                    {qr && (
                      <div className="text-center">
                        <img src={qr} alt="Scan to reopen this specification" className="w-[74px] h-[74px]" />
                        <p className="text-[8.5px] text-slate-400 mt-0.5 leading-tight">Scan to reopen<br />this specification</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* ---------------- SPEC ---------------- */}
                {tab === "spec" && (
                  <>
                    <Sec n="1" title="System selected">
                      <p className="text-[15px] font-semibold text-[#0B2A5B] mb-1">{system.label}</p>
                      <p className="text-[13px] text-slate-700 mb-3">{system.blurb}</p>
                      {alternatives.length > 0 && (
                        <p className="print:hidden text-[12.5px] text-slate-600 mb-4">
                          {alternatives.length === 1 ? "One alternative exists" : `${alternatives.length} alternatives exist`} for this asset —{" "}
                          <button onClick={() => setTab("why")} className="text-[#1E5AA8] hover:underline">
                            see when each is the better choice
                          </button>
                        </p>
                      )}
                      <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
                        <Row k="Sector" v={SECTORS[system.sector].label} />
                        <Row k="Asset" v={system.asset} />
                        <Row k="Expected service life" v={`${system.life}${system.dur ? "  (" + DUR_LABEL[system.dur].split(" —")[0] + " durability, ISO 12944-1)" : ""}`} />
                        {system.envs && <Row k="Suits corrosivity" v={system.envs.map((e) => ENV_LABEL[e] ?? e).join(", ")} />}
                        {system.tempMax && <Row k="Max service temperature" v={`${system.tempMax} °C`} />}
                        {system.flags?.length ? <Row k="Satisfies" v={system.flags.map((f) => FLAGS[f]).join(", ")} /> : null}
                        <Row k="Binder base" v={
                          Array.from(new Set(system.coats.map((c) => PRODUCTS[c.product].base)))
                            .map((b) => (b ? BASE_LABEL[b] : "—")).join(" + ")
                        } />
                      </div>
                    </Sec>

                    <Sec n="2" title="Surface preparation">
                      <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
                        <Row k="Standard" v={PREP[system.prep].std} />
                        <Row k="Profile" v={PREP[system.prep].profile} />
                      </div>
                      <p className="mt-4 text-[13px] text-slate-700">{PREP[system.prep].note}</p>
                    </Sec>

                    <Sec n="3" title="Coating schedule">
                      <ScheduleTable s={system} totalMin={totalMin} totalMax={totalMax} vsOf={vsOf} />
                      {showQty && <Quantities s={system} area={areaNum} loss={loss} vsOf={vsOf} />}
                      <p className="text-[11px] text-slate-500 mt-4">
                        Technical data sheets for every product above: {TDS_URL}
                      </p>
                    </Sec>

                    <Sec n="4" title="Application requirements">
                      <ol className="space-y-2.5">
                        {[...system.notes,
                          "All DFT values are dry film thickness. Verify to SSPC-PA2 after cure.",
                          "Stripe coat all edges, welds, bolt heads and cut-outs by brush on steel substrates.",
                          "Do not apply below 3 °C above dew point, above 85% relative humidity, or below the minimum temperature on the data sheet.",
                          "Observe minimum and maximum overcoating intervals; abrade and solvent wipe if the maximum is exceeded.",
                        ].map((n, i) => (
                          <li key={i} className="flex gap-3 text-[13px] text-slate-700">
                            <span className="text-slate-400 tabular-nums shrink-0">{String(i + 1).padStart(2, "0")}</span><span>{n}</span>
                          </li>
                        ))}
                      </ol>
                    </Sec>

                    <Sec n="5" title="Standards and testing">
                      <div className="grid sm:grid-cols-2 gap-6">
                        <List title="Applicable standards" items={system.standards} />
                        <List title="Testing and acceptance" items={system.tests} />
                      </div>
                    </Sec>
                  </>
                )}

                {/* ---------------- WHY ---------------- */}
                {tab === "why" && (
                  <Sec n="" title="Why this system">
                    <p className="text-[13px] text-slate-600 mb-5">
                      The reasoning behind each element, so the specification can be defended rather than just issued.
                    </p>
                    <ul className="space-y-4">
                      {rationale(system).map((r, i) => (
                        <li key={i} className="flex gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#1E5AA8] mt-2 shrink-0" />
                          <p className="text-[13.5px] leading-relaxed text-slate-700">{r}</p>
                        </li>
                      ))}
                    </ul>

                    {alternatives.length > 0 && (
                      <div className="mt-8 pt-6 border-t border-slate-200">
                        <h3 className="text-[14px] font-semibold text-[#0B2A5B] mb-1">
                          When a different system would be the better choice
                        </h3>
                        <p className="text-[12.5px] text-slate-600 mb-4">
                          The recommendation above suits most cases for this asset. These are the
                          alternatives and the conditions that justify them.
                        </p>
                        <div className="space-y-3">
                          {alternatives.map(({ s: alt, why, longer }) => (
                            <div key={alt.id} className="border border-slate-200 rounded-lg p-4">
                              <div className="flex items-start justify-between gap-4 flex-wrap">
                                <div className="min-w-0">
                                  <p className="text-[13.5px] font-medium text-slate-900">{alt.label}</p>
                                  <p className="text-[12px] text-slate-500 mt-0.5">
                                    {alt.life} · {Math.round(totalDFT(alt))} µm ·{" "}
                                    <span className={longer ? "text-emerald-700" : "text-amber-700"}>
                                      {longer ? "longer life" : "shorter life"}
                                    </span>
                                  </p>
                                </div>
                                <button onClick={() => { setSystemId(alt.id); setDurWanted(""); setTab("spec"); }}
                                  className="print:hidden text-[12.5px] text-[#1E5AA8] hover:underline shrink-0">
                                  Use this instead
                                </button>
                              </div>
                              <p className="text-[12.5px] text-slate-700 leading-relaxed mt-2">{why}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </Sec>
                )}

                {/* ---------------- WHOLE LIFE ---------------- */}
                {tab === "life" && (
                  <Sec n="" title="Whole-life comparison">
                    <div className="print:hidden mb-5 grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11.5px] text-slate-600 mb-1">Compare against</label>
                        <select value={compareId ?? ""} onChange={(e) => setCompareId(e.target.value || null)}
                          className="w-full border border-slate-300 rounded-lg px-3 py-2 text-[13px]">
                          <option value="">Select a second system…</option>
                          {SYSTEMS.filter((s) => s.id !== system.id).map((s) => (
                            <option key={s.id} value={s.id}>{SECTORS[s.sector].label} — {s.label}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-[11.5px] text-slate-600 mb-1">Time horizon {horizon} years</label>
                        <input type="range" min={10} max={40} step={5} value={horizon} onChange={(e) => setHorizon(+e.target.value)} className="w-full accent-[#1E5AA8]" />
                      </div>
                    </div>
                    <LifeCompare a={system} b={rival} horizon={horizon} area={areaNum} access={access} price={price} accessCost={accessCost} vsOf={vsOf} />
                  </Sec>
                )}

                {/* ---------------- CHECKLIST ---------------- */}
                {tab === "check" && <Checklist s={system} specNo={specNo} />}

                {/* ---------------- CROSS REFERENCE ---------------- */}
                {tab === "match" && (
                  <Sec n="" title="Match a competitor product">
                    <p className="text-[13px] text-slate-600 mb-4">
                      Type the product named in your specification and see the Anupam product of the same generic type.
                    </p>
                    <input value={query} onChange={(e) => setQuery(e.target.value)}
                      placeholder="e.g. Jotamastic 90, Epilux 610, Interthane 990"
                      className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-[13.5px] mb-4 print:hidden" />
                    {crossHits.length > 0 ? (
                      <table className="w-full text-[12.5px] border-collapse">
                        <thead>
                          <tr className="bg-[#0B2A5B] text-white text-left">
                            <Th>Specified product</Th><Th>Generic type</Th><Th>Anupam product</Th><Th className="text-center">Vol. solids</Th>
                          </tr>
                        </thead>
                        <tbody>
                          {crossHits.map((c, i) => (
                            <tr key={i} className={i % 2 ? "bg-slate-50/70" : ""}>
                              <Td><span className="text-slate-500">{c.brand}</span><span className="block font-medium">{c.product}</span></Td>
                              <Td className="text-slate-600">{c.generic}</Td>
                              <Td className="font-medium text-[#0B2A5B]">{PRODUCTS[c.anupam].name}</Td>
                              <Td className="text-center">{PRODUCTS[c.anupam].vs}%</Td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : query.length > 1 ? (
                      <p className="text-[13px] text-slate-600">
                        No match in the cross-reference. We manufacture over 500 products — send the specification
                        and our technical team will identify the equivalent.
                      </p>
                    ) : null}
                    <div className="mt-5 bg-amber-50 border border-amber-200 rounded-lg p-4">
                      <p className="text-[12.5px] text-amber-900 leading-relaxed">
                        <b>This is a generic type match, not a performance claim.</b> Two products of the same
                        generic type can differ in volume solids, cure schedule and approvals. Confirm against
                        both technical data sheets, and against any project approval requirement, before substituting.
                      </p>
                    </div>
                  </Sec>
                )}

                <div className="px-6 md:px-8 py-6 border-t border-slate-200 text-[11px] text-slate-500">
                  <p className="mb-2">
                    <b className="text-slate-700">Basis of issue.</b> Generated from the selections recorded above and
                    issued for guidance. Confirm against the current product technical data sheet, the project
                    specification and site conditions. Anupam Enterprises will issue a countersigned specification
                    on request following technical review.
                  </p>
                  <p>Anupam Enterprises · Poddar Point, 113 Park Street, Kolkata 700016 · Works: Ranihati, Howrah 711414 · 033-22651204 · care@anupampaints.com</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ---------------------------- download gate ---------------------------- */}
      {gate && (
        <div className="print:hidden fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setGate(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-[17px] font-semibold text-[#0B2A5B] mb-1">
              {gateAfter === 'save' ? 'Save this specification' : gateAfter === 'check' ? 'Print the inspection checklist' : 'Download the specification'}
            </h3>
            <p className="text-[12.5px] text-slate-600 mb-5">
              Specifications are issued to a named person so our technical team can
              support the project. Complete this once and downloading, printing and
              saving stay open on this device.
            </p>
            <div className="space-y-3">
              <Inp v={gName} set={setGName} p="Your name" />
              <Inp v={gFirm} set={setGFirm} p="Firm / company" />
              <Inp v={gPhone} set={setGPhone} p="Mobile number" />
            </div>
            <div className="flex flex-col gap-2 mt-5">
              <a href={gName.trim() && gPhone.trim() ? `https://wa.me/${WHATSAPP}?text=${gateText}` : undefined}
                target="_blank" rel="noopener noreferrer"
                onClick={() => { if (gName.trim() && gPhone.trim()) unlock(); }}
                className={`text-center text-[13px] font-medium py-3 rounded-lg ${
                  gName.trim() && gPhone.trim() ? "bg-[#1E5AA8] text-white hover:bg-[#164683]" : "bg-slate-200 text-slate-400 pointer-events-none"}`}>
                Send to Anupam and continue
              </a>
              <button onClick={unlock} disabled={!gName.trim() || !gPhone.trim()}
                className="text-center text-[13px] py-2.5 rounded-lg border border-slate-300 text-slate-700 hover:border-slate-400 disabled:opacity-40 disabled:hover:border-slate-300">
                Continue without sending
              </button>
              <button onClick={() => setGate(false)}
                className="text-[12px] text-slate-500 hover:text-slate-800 py-1">Cancel</button>
            </div>
            <p className="text-[11px] text-slate-400 mt-3">
              {(!gName.trim() || !gPhone.trim())
                ? "Name and mobile number are required."
                : "Your details stay on this device unless you choose to send them."}
            </p>
          </div>
        </div>
      )}

      <style jsx global>{`
        @media print {
          body { background:#fff !important; }
          header, footer, nav, .print\\:hidden { display:none !important; }
          #spec-doc { box-shadow:none !important; border:0 !important; }
          /* Ctrl+P cannot be intercepted, so the document itself is withheld
             until the visitor has identified themselves. */
          body.locked #spec-doc { display:none !important; }
          body.locked::after {
            content:"This specification has not been released. Open it at anupampaints.com/specification-generator and complete the short form to download.";
            display:block; padding:40mm 20mm; font-family:system-ui,sans-serif;
            font-size:12pt; line-height:1.6; color:#0B2A5B;
          }
          @page { margin:12mm; size:A4; }
          section { break-inside:avoid; } tr { break-inside:avoid; }
        }
      `}</style>
    </div>
  );
}

/* ============================ sub-components ============================= */

function ScheduleTable({ s, totalMin, totalMax, vsOf }: { s: System; totalMin: number; totalMax: number; vsOf: (k: string) => number }) {
  return (
    <div className="overflow-x-auto -mx-1">
      <table className="w-full text-[12.5px] border-collapse">
        <thead>
          <tr className="bg-[#0B2A5B] text-white text-left">
            <Th>Coat</Th><Th>Product</Th><Th>Generic type</Th>
            <Th className="text-center">VS</Th><Th className="text-center">Coats</Th>
            <Th className="text-center">DFT / coat</Th><Th className="text-center">Method</Th>
          </tr>
        </thead>
        <tbody>
          {s.coats.map((c, i) => {
            const p = PRODUCTS[c.product];
            return (
              <tr key={i} className={i % 2 ? "bg-slate-50/70" : ""}>
                <Td className="text-slate-500 whitespace-nowrap">{c.role}</Td>
                <Td className="font-medium text-slate-900">{p.name}</Td>
                <Td className="text-slate-600">{p.generic}</Td>
                <Td className="text-center whitespace-nowrap text-slate-600">
                  {p.base ? BASE_LABEL[p.base] : "—"}
                </Td>
                <Td className="text-center">{vsOf(c.product)}%</Td>
                <Td className="text-center">{c.coats}</Td>
                <Td className="text-center whitespace-nowrap">{c.dftMin}–{c.dftMax} µm</Td>
                <Td className="text-center text-slate-600">{c.method}</Td>
              </tr>
            );
          })}
          <tr className="border-t-2 border-[#0B2A5B] font-semibold">
            <Td colSpan={6} className="text-right pr-4">Total dry film thickness</Td>
            <Td className="text-center text-[#0B2A5B] whitespace-nowrap">{totalMin}–{totalMax} µm</Td><Td />
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function Quantities({ s, area, loss, vsOf }: { s: System; area: number; loss: number; vsOf: (k: string) => number }) {
  return (
    <div className="mt-6">
      <p className="text-[11px] tracking-[0.16em] uppercase text-slate-500 mb-2">
        Indicative quantity for {area.toLocaleString("en-IN")} m²
      </p>
      <table className="w-full text-[12.5px] border-collapse">
        <thead>
          <tr className="bg-slate-100 text-left text-slate-700">
            <Th>Product</Th><Th className="text-center">Coverage</Th>
            <Th className="text-center">Theoretical</Th><Th className="text-center">Practical (+{loss}%)</Th>
          </tr>
        </thead>
        <tbody>
          {s.coats.map((c, i) => {
            const p = PRODUCTS[c.product];
            const dft = ((c.dftMin + c.dftMax) / 2) * c.coats;
            const theo = (area * dft) / (vsOf(c.product) * 10);
            return (
              <tr key={i} className={i % 2 ? "bg-slate-50/70" : ""}>
                <Td>{p.name}</Td>
                <Td className="text-center text-slate-600">{rate(vsOf(c.product), (c.dftMin + c.dftMax) / 2)} m²/L</Td>
                <Td className="text-center">{theo.toFixed(0)} L</Td>
                <Td className="text-center font-medium">{(theo * (1 + loss / 100)).toFixed(0)} L</Td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function LifeCompare({ a, b, horizon, area, access, price, accessCost, vsOf }:
  { a: System; b?: System; horizon: number; area: number; access: string;
    price: Record<string, number>; accessCost: Record<string, number>; vsOf: (k: string) => number }) {
  const rows = [a, b].filter(Boolean) as System[];
  const accessRate = accessCost[access] ?? 0;
  const hasArea = !isNaN(area) && area > 0;

  const calc = (s: System) => {
    const years = lifeYears(s);
    const repaints = Math.max(0, Math.ceil(horizon / years) - 1);
    const mat = materialCost(s, price, vsOf);
    const perM2 = mat === null ? null : mat + accessRate;
    return { years, repaints, mat, perM2 };
  };

  const anyPrice = rows.some((s) => materialCost(s, price, vsOf) !== null);

  return (
    <>
      <table className="w-full text-[13px] border-collapse mb-5">
        <thead>
          <tr className="bg-[#0B2A5B] text-white text-left">
            <Th>System</Th>
            <Th className="text-center">Total DFT</Th>
            <Th className="text-center">Design life</Th>
            <Th className="text-center">Repaints in {horizon} yrs</Th>
            {anyPrice && <Th className="text-center">Cost over {horizon} yrs</Th>}
          </tr>
        </thead>
        <tbody>
          {rows.map((s, i) => {
            const c = calc(s);
            const total = c.perM2 === null ? null : c.perM2 * (c.repaints + 1) * (hasArea ? area : 1);
            return (
              <tr key={s.id} className={i % 2 ? "bg-slate-50/70" : ""}>
                <Td>
                  <span className="font-medium text-slate-900 block">{s.label}</span>
                  <span className="text-slate-500 text-[11.5px]">{SECTORS[s.sector].label}</span>
                </Td>
                <Td className="text-center">{Math.round(totalDFT(s))} µm</Td>
                <Td className="text-center">{c.years} yrs</Td>
                <Td className="text-center font-medium">{c.repaints}</Td>
                {anyPrice && (
                  <Td className="text-center">
                    {total === null ? <span className="text-slate-400">—</span>
                      : `₹ ${Math.round(total).toLocaleString("en-IN")}${hasArea ? "" : " / m²"}`}
                  </Td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* maintenance timeline — works with no prices at all */}
      <p className="text-[11px] tracking-[0.16em] uppercase text-slate-500 mb-2">Maintenance timeline</p>
      {rows.map((s) => {
        const c = calc(s);
        return (
          <div key={s.id} className="mb-4">
            <p className="text-[12.5px] text-slate-700 mb-1">{s.label}</p>
            <div className="relative h-8 bg-slate-100 rounded-md overflow-hidden">
              {Array.from({ length: c.repaints + 1 }).map((_, i) => {
                const at = (i * c.years / horizon) * 100;
                if (at >= 100) return null;
                return (
                  <div key={i} className="absolute top-0 bottom-0 border-l-2 border-[#1E5AA8] pl-1"
                    style={{ left: `${at}%` }}>
                    <span className="text-[9.5px] text-[#1E5AA8] font-medium">
                      {i === 0 ? "apply" : `yr ${Math.round(i * c.years)}`}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
      <p className="text-[10.5px] text-slate-400">0 to {horizon} years</p>

      {!anyPrice && (
        <div className="mt-5 bg-slate-50 border border-slate-200 rounded-lg p-4">
          <p className="text-[12.5px] text-slate-700 leading-relaxed">
            Cost figures are hidden because product prices have not been set. The timeline above
            is still the important part: a system lasting twice as long needs half the interventions,
            and on a structure where access means scaffolding, containment or a shutdown, the access
            cost usually exceeds the coating cost several times over.
          </p>
        </div>
      )}
      {anyPrice && accessRate === 0 && (
        <p className="mt-4 text-[11.5px] text-slate-500">
          Access cost is set to zero, so this compares material only. Access is normally the larger
          number on anything above ground level.
        </p>
      )}
    </>
  );
}

function Checklist({ s, specNo }: { s: System; specNo: string }) {
  const rowsPerCoat = 4;
  return (
    <>
      <Sec n="" title="Inspection and test plan">
        <p className="text-[13px] text-slate-600 mb-5">
          Hold points and records for {specNo}. Each stage is signed before the next begins.
        </p>

        <p className="text-[11px] tracking-[0.16em] uppercase text-slate-500 mb-2">Before work starts</p>
        <CheckRows items={[
          "Specification and product data sheets issued to the applicator",
          "Batch test certificates received and filed",
          "Ambient temperature, relative humidity and dew point recorded",
          "Substrate temperature at least 3 °C above dew point",
          `Surface preparation to ${PREP[s.prep].std}`,
          `Surface profile verified: ${PREP[s.prep].profile}`,
          "Soluble salt test where specified",
          "Blast media and compressed air checked clean and dry",
        ]} />

        <p className="text-[11px] tracking-[0.16em] uppercase text-slate-500 mt-6 mb-2">During application</p>
        <table className="w-full text-[11.5px] border-collapse">
          <thead>
            <tr className="bg-slate-100 text-left text-slate-700">
              <Th>Coat</Th><Th>Product / batch</Th><Th className="text-center">Specified DFT</Th>
              <Th className="text-center">Readings</Th><Th className="text-center">Date</Th><Th className="text-center">Signed</Th>
            </tr>
          </thead>
          <tbody>
            {s.coats.flatMap((c, i) =>
              Array.from({ length: c.coats }).map((_, k) => (
                <tr key={`${i}-${k}`}>
                  <Td className="whitespace-nowrap">{c.role}{c.coats > 1 ? ` ${k + 1}` : ""}</Td>
                  <Td className="text-slate-500">{PRODUCTS[c.product].name}</Td>
                  <Td className="text-center whitespace-nowrap">{c.dftMin}–{c.dftMax} µm</Td>
                  <Td><span className="block border-b border-dotted border-slate-400 h-4" /></Td>
                  <Td><span className="block border-b border-dotted border-slate-400 h-4" /></Td>
                  <Td><span className="block border-b border-dotted border-slate-400 h-4" /></Td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <p className="text-[11px] text-slate-500 mt-2">
          DFT to SSPC-PA2. Record {rowsPerCoat} readings minimum per 10 m², no single reading below 80% of specified.
        </p>

        <p className="text-[11px] tracking-[0.16em] uppercase text-slate-500 mt-6 mb-2">Stripe coats and details</p>
        <CheckRows items={[
          "Stripe coat applied to all edges before each full coat",
          "Welds, bolt heads and fasteners stripe coated",
          "Back-to-back angles and crevices treated",
          "Damage from handling and erection made good to specification",
        ]} />

        <p className="text-[11px] tracking-[0.16em] uppercase text-slate-500 mt-6 mb-2">On completion</p>
        <CheckRows items={[
          "Final DFT survey complete and within specification",
          "Adhesion test carried out where specified",
          "Holiday detection carried out where specified",
          "Visual inspection: no runs, sags, dry spray, pinholes or misses",
          "All records compiled and handed over",
        ]} />

        <div className="grid sm:grid-cols-3 gap-6 mt-8 pt-6 border-t border-slate-200">
          {["Applicator", "Client / consultant", "Anupam technical"].map((r) => (
            <div key={r}>
              <div className="border-b border-slate-400 h-10" />
              <p className="text-[11px] text-slate-600 mt-1">{r}</p>
              <p className="text-[10px] text-slate-400">Name, signature, date</p>
            </div>
          ))}
        </div>
      </Sec>
    </>
  );
}

function CheckRows({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1.5">
      {items.map((t) => (
        <li key={t} className="flex gap-2.5 items-start text-[12.5px] text-slate-700">
          <span className="w-3.5 h-3.5 border border-slate-400 rounded-sm shrink-0 mt-0.5" />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

/* ---------- primitives ---------- */
function Panel({ n, title, children }: { n: string; title: string; children: ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5">
      <div className="flex items-baseline gap-2.5">
        {n && <span className="text-[11px] tabular-nums text-[#1E5AA8] font-semibold">{n}</span>}
        <h2 className="text-[13px] font-semibold text-[#0B2A5B]">{title}</h2>
      </div>
      {children}
    </div>
  );
}
function Inp({ v, set, p }: { v: string; set: (s: string) => void; p: string }) {
  return <input value={v} onChange={(e) => set(e.target.value)} placeholder={p}
    className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-[13px] focus:outline-none focus:ring-2 focus:ring-[#1E5AA8]/40" />;
}
function Sec({ n, title, children }: { n: string; title: string; children: ReactNode }) {
  return (
    <section className="px-6 md:px-8 py-6 border-b border-slate-200">
      <div className="flex items-baseline gap-3 mb-4">
        {n && <span className="text-[11px] tabular-nums text-[#1E5AA8] font-semibold">{n}</span>}
        <h2 className="text-[15px] font-semibold text-[#0B2A5B]">{title}</h2>
      </div>
      {children}
    </section>
  );
}
function Row({ k, v }: { k: string; v: string }) {
  return <div className="text-[13px]"><span className="text-slate-500">{k}</span><p className="text-slate-900 mt-0.5">{v}</p></div>;
}
function List({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="text-[11px] tracking-[0.16em] uppercase text-slate-500 mb-2">{title}</p>
      <ul className="space-y-1.5">
        {items.map((t) => (
          <li key={t} className="text-[13px] text-slate-700 flex gap-2"><span className="text-[#1E5AA8]">▪</span><span>{t}</span></li>
        ))}
      </ul>
    </div>
  );
}
function Th({ children, className = "" }: { children?: ReactNode; className?: string }) {
  return <th className={`px-3 py-2.5 font-medium text-[11px] tracking-wide ${className}`}>{children}</th>;
}
function Td({ children, className = "", colSpan }: { children?: ReactNode; className?: string; colSpan?: number }) {
  return <td colSpan={colSpan} className={`px-3 py-2.5 align-top border-b border-slate-200 ${className}`}>{children}</td>;
}
