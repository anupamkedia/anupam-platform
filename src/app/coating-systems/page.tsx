'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Layers, ArrowRight, Search } from 'lucide-react';

const systems = [
  { code:'AP-STL-001', name:'Structural Steel — General Industrial', env:'C3', life:'15-20 yrs', primer:'Inorganic Zinc Silicate (60-75μm)', intermediate:'Epoxy MIO (100-150μm)', topcoat:'Aliphatic PU (40-60μm)', dft:'200-285μm', category:'Steel', link:'/solutions/structural-steel' },
  { code:'AP-STL-002', name:'Structural Steel — Coastal', env:'C4-C5', life:'15-20 yrs', primer:'Inorganic Zinc Silicate (75μm)', intermediate:'Epoxy High-Build (150-200μm)', topcoat:'Polysiloxane (50-60μm)', dft:'275-335μm', category:'Steel', link:'/solutions/structural-steel' },
  { code:'AP-STL-003', name:'PEB — Quick Dry', env:'C3', life:'10-15 yrs', primer:'Epoxy Zinc Phosphate (50μm)', intermediate:'Epoxy MIO (100μm)', topcoat:'Aliphatic PU (40μm)', dft:'190μm', category:'Steel', link:'/solutions/structural-steel' },
  { code:'AP-RLY-001', name:'Railway Coach Exterior', env:'C3-C4', life:'10-12 yrs', primer:'Epoxy Zinc Phosphate (35-50μm)', intermediate:'Epoxy MIO (100-125μm)', topcoat:'FEVE Fluoropolymer (30-40μm)', dft:'165-215μm', category:'Railway', link:'/solutions/railway-coaches' },
  { code:'AP-RLY-002', name:'Railway Bogie & Underframe', env:'C4-C5', life:'8-10 yrs', primer:'Epoxy Zinc-Rich (60-80μm)', intermediate:'Epoxy High-Build (125-200μm)', topcoat:'N/A', dft:'185-280μm', category:'Railway', link:'/solutions/railway-bogies' },
  { code:'AP-MAR-001', name:'Marine Underwater Hull', env:'Im2', life:'5 yr docking', primer:'Marine Epoxy (125-200μm)', intermediate:'Epoxy High-Build (100-150μm)', topcoat:'Anti-Fouling (100-150μm)', dft:'325-500μm', category:'Marine', link:'/solutions/marine-hull' },
  { code:'AP-MAR-002', name:'Marine Superstructure', env:'C5-M', life:'5-7 yrs', primer:'Marine Epoxy (75-100μm)', intermediate:'Epoxy MIO (75-100μm)', topcoat:'Aliphatic PU (40-60μm)', dft:'190-260μm', category:'Marine', link:'/solutions/marine-superstructure' },
  { code:'AP-TNK-001', name:'Potable Water Tank', env:'Im1', life:'15-20 yrs', primer:'Solventless Epoxy (150-250μm)', intermediate:'N/A', topcoat:'Solventless Epoxy (150-250μm)', dft:'300-500μm', category:'Tank', link:'/solutions/tank-lining' },
  { code:'AP-FIRE-001', name:'Structural Fire Protection 60min', env:'Interior', life:'Structure life', primer:'Epoxy Zinc Phosphate (35-50μm)', intermediate:'Intumescent (750-1500μm)', topcoat:'Aliphatic PU for exterior (50μm)', dft:'835-1600μm', category:'Fire', link:'/solutions/fire-protection' },
  { code:'AP-FLR-001', name:'Industrial Concrete Floor', env:'Interior', life:'10-15 yrs', primer:'Epoxy Floor Primer (100-200μm)', intermediate:'Duraflo Self-Levelling (1-3mm)', topcoat:'Polyaspartic (100-200μm)', dft:'1.2-3.4mm', category:'Floor', link:'/solutions/industrial-flooring' },
  { code:'AP-OG-001', name:'Oil & Gas — Structural', env:'CX', life:'15-25 yrs', primer:'Inorganic Zinc Silicate (75μm)', intermediate:'Glass Flake Epoxy (200-500μm)', topcoat:'Aliphatic PU (50-60μm)', dft:'325-635μm', category:'Oil & Gas', link:'/solutions/oil-gas' },
  { code:'AP-DEC-001', name:'Exterior Wall — Premium', env:'Atmospheric', life:'15 yrs', primer:'Azura Damp Arrestor Primer', intermediate:'Cement Putty', topcoat:'Azura Weather Shield 15 (2 coats)', dft:'Per spec', category:'Decorative', link:'/products/decorative' },
  { code:'AP-DEC-002', name:'Interior Wall — Luxury', env:'Interior', life:'7-8 yrs', primer:'Azura Damp Arrestor / Amaje Primer', intermediate:'Acrylic Wall Putty', topcoat:'Azura Pearl Glow (2-3 coats)', dft:'Per spec', category:'Decorative', link:'/products/decorative' },
  { code:'AP-WP-001', name:'Roof Waterproofing', env:'Exterior', life:'10-12 yrs', primer:'Arest Base Coat', intermediate:'Arest Crack Filler', topcoat:'Arest Cool Roof Coat (3 coats)', dft:'Per spec', category:'Waterproofing', link:'/products/decorative' },
];

const categories = ['All', 'Steel', 'Railway', 'Marine', 'Tank', 'Fire', 'Floor', 'Oil & Gas', 'Decorative', 'Waterproofing'];

export default function CoatingSystemsPage() {
  const [cat, setCat] = useState('All');
  const [search, setSearch] = useState('');
  const filtered = systems.filter(s => (cat === 'All' || s.category === cat) && (search === '' || s.name.toLowerCase().includes(search.toLowerCase()) || s.code.toLowerCase().includes(search.toLowerCase())));

  return (
    <>
      <section className="relative text-white overflow-hidden">
        <img src="/img/app/industrial/ind-structural-spray.png" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[var(--color-navy)]/75" />
        <div className="py-16 md:py-24 relative z-10">
        <div className="container-wide">
          <div className="w-12 h-[2px] bg-[var(--color-red)] mb-6" />
          <h1 className="text-page-title text-white mb-4">Coating System Library</h1>
          <p className="text-white/50 max-w-xl mb-8">Complete pre-engineered coating systems with system codes, layer specifications, and DFT data.</p>
          <div className="relative max-w-md"><Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
            <input className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 text-white placeholder-white/40 outline-none" style={{borderRadius:'var(--radius-md)'}} placeholder="Search systems..." value={search} onChange={e=>setSearch(e.target.value)} /></div>
        </div>
      </div></section>
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="flex gap-2 overflow-x-auto pb-4 mb-6">
            {categories.map(c => <button key={c} onClick={()=>setCat(c)} className={`whitespace-nowrap text-sm px-3 py-1.5 transition ${cat===c?'bg-[var(--color-navy)] text-white':'bg-gray-100 text-[var(--color-steel)] hover:bg-gray-200'}`} style={{borderRadius:'var(--radius-sm)'}}>{c}</button>)}
          </div>
          <div className="space-y-3">
            {filtered.map(s => (
              <Link key={s.code} href={s.link} className="card p-5 block hover:shadow-md transition group">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono font-semibold text-[var(--color-red)]">{s.code}</span>
                      <span className="text-xs px-2 py-0.5 bg-gray-100 text-[var(--color-steel)]" style={{borderRadius:'var(--radius-sm)'}}>{s.category}</span>
                      <span className="text-xs text-[var(--color-steel)]">{s.env}</span>
                    </div>
                    <h3 className="font-semibold text-[var(--color-navy)] group-hover:text-[var(--color-red)] transition">{s.name}</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-3 text-xs text-[var(--color-steel)]">
                      <div><span className="font-semibold text-[var(--color-navy)]">Primer:</span> {s.primer}</div>
                      <div><span className="font-semibold text-[var(--color-navy)]">Intermediate:</span> {s.intermediate}</div>
                      <div><span className="font-semibold text-[var(--color-navy)]">Topcoat:</span> {s.topcoat}</div>
                      <div><span className="font-semibold text-[var(--color-navy)]">Total DFT:</span> {s.dft}</div>
                    </div>
                  </div>
                  <div className="text-right shrink-0"><div className="text-xs text-[var(--color-steel)]">Service Life</div><div className="text-sm font-bold text-[var(--color-navy)]">{s.life}</div></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
