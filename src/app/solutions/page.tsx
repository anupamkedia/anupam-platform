'use client';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const solutions = [
  { category: 'Railways', items: [
    { slug: 'railway-coaches', title: 'Coach Exterior Coating System', icon: '🚂', desc: 'RDSO/ICF approved. FEVE fluoropolymer topcoat. EN 45545 HL3 fire-safe.' },
    { slug: 'railway-bogies', title: 'Bogie & Underframe System', icon: '🔧', desc: 'Heavy-duty zinc-rich + high-build epoxy for impact and abrasion resistance.' },
  ]},
  { category: 'Marine & Defence', items: [
    { slug: 'marine-hull', title: 'Hull Coating System', icon: '🚢', desc: 'Indian Navy approved. Anti-fouling with 5-year dry-docking interval.' },
    { slug: 'marine-superstructure', title: 'Superstructure & Deck System', icon: '⚓', desc: 'Naval grey, non-skid deck, glow-in-dark safety coatings.' },
  ]},
  { category: 'Infrastructure', items: [
    { slug: 'structural-steel', title: 'Structural Steel System', icon: '🏗️', desc: 'PEB, bridges, buildings. IZS + MIO + PU for 15-20 year service life.' },
    { slug: 'containers', title: 'Container & Freight System', icon: '📦', desc: 'Shipping containers, wagons, trailers. Impact and weather resistant.' },
  ]},
  { category: 'Oil & Gas', items: [
    { slug: 'oil-gas', title: 'Refinery & Pipeline System', icon: '⛽', desc: 'Glass flake epoxy, novolac, high-temp. 15-25 year design life.' },
    { slug: 'tank-lining', title: 'Tank Lining System', icon: '💧', desc: 'WRAS approved solventless epoxy. Potable water, fuel, chemical tanks.' },
  ]},
  { category: 'Real Estate & Construction', items: [
    { slug: 'real-estate', title: 'Complete Building Coating', icon: '🏢', desc: 'Exterior weathershield + interior luxury + waterproofing. Up to 15yr warranty.' },
    { slug: 'industrial-flooring', title: 'Industrial Flooring System', icon: '🏭', desc: 'Epoxy self-levelling + polyaspartic. Fast return to service.' },
  ]},
  { category: 'Safety & Specialty', items: [
    { slug: 'fire-protection', title: 'Passive Fire Protection', icon: '🔥', desc: 'FireSeal intumescent. Up to 120-minute fire rating for structural steel.' },
    { slug: 'power-cement', title: 'Power & Cement Plants', icon: '⚡', desc: 'High-temp aluminium 600°C + structural steel + chemical resistant.' },
  ]},
];

export default function SolutionsPage() {
  return (
    <>
      <section className="relative text-white overflow-hidden">
        <img src="/img/solutions/sol-structural.png" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-brand-500/85" />
        <div className="container-wide px-4 py-20 md:py-28 relative z-10">
          <p className="text-white/50 text-sm font-medium mb-2 tracking-wider uppercase">Solutions</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Coating Solutions by Industry</h1>
          <p className="text-lg text-white/50 max-w-2xl">Pre-engineered coating systems with layer-by-layer specifications, DFT, application methods, and product recommendations for your specific industry.</p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-wide">
          {solutions.map((cat) => (
            <div key={cat.category} className="mb-12 last:mb-0">
              <h2 className="text-2xl font-bold text-[var(--color-navy)] mb-6 pb-2 border-b-2 border-brand-100">{cat.category}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {cat.items.map((sol) => (
                  <Link key={sol.slug} href={`/solutions/${sol.slug}`} className="card card-hover group p-6 flex gap-5">
                    <div className="text-4xl shrink-0">{sol.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-[var(--color-navy)] transition">{sol.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed mb-3">{sol.desc}</p>
                      <span className="text-[var(--color-navy)] text-sm font-medium flex items-center gap-1">View Full System <ArrowRight size={14} /></span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
