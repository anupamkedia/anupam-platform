'use client';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const pages = [
  { title:'Coatings for Steel Plants', slug:'steel-plants', desc:'Complete coating systems across the steel-making process — from raw material handling to finished product storage.', link:'/industries' },
  { title:'Coatings for Railway Bogies', slug:'railway-bogies', desc:'Heavy-duty anti-corrosion systems for bogies, underframes and components exposed to ballast impact and water spray.', link:'/solutions/railway-bogies' },
  { title:'Marine Antifouling Coatings', slug:'marine-antifouling', desc:'Biocide-free silicone-epoxy hybrid foul-release systems for naval and commercial vessels.', link:'/solutions/marine-hull' },
  { title:'Epoxy Coating for Potable Water Tanks', slug:'potable-water', desc:'WRAS approved solventless epoxy lining for drinking water tanks — zero VOC, FDA compliant.', link:'/solutions/tank-lining' },
  { title:'Coatings for Coastal Structural Steel', slug:'coastal-steel', desc:'C4-C5 environment protection systems with zinc-rich primers, high-build epoxy, and polysiloxane topcoats.', link:'/solutions/structural-steel' },
  { title:'Fire Protection Coating for Steel', slug:'fire-protection', desc:'FireSeal intumescent coatings providing up to 120-minute fire rating for structural steel members.', link:'/solutions/fire-protection' },
  { title:'Epoxy Flooring for Factories', slug:'factory-flooring', desc:'Self-levelling epoxy and polyaspartic floor systems for warehouses, manufacturing, and logistics.', link:'/solutions/industrial-flooring' },
  { title:'Quick Dry Paint for Scaffolding', slug:'scaffolding', desc:'Rapid-drying DTM coatings for high-throughput scaffolding and formwork production.', link:'/products/industrial' },
  { title:'Protective Coatings for PEB', slug:'peb-coatings', desc:'Cost-effective protection systems for pre-engineered buildings — economy to severe-duty specifications.', link:'/solutions/structural-steel' },
  { title:'Industrial Coatings for Auto Components', slug:'auto-components', desc:'Epoxy primers, stoving enamels, zinc-flake systems for automotive axles, chassis, and engineering components.', link:'/products/specialty' },
];

export default function CoatingsForPage() {
  return (
    <>
      <section className="bg-[var(--color-navy)] text-white py-16 md:py-24">
        <div className="container-wide"><div className="w-12 h-[2px] bg-[var(--color-red)] mb-6" />
          <h1 className="text-page-title text-white mb-4">Coating Solutions by Application</h1>
          <p className="text-white/50 max-w-xl">Technical coating information for specific industrial and infrastructure applications.</p>
        </div>
      </section>
      <section className="section-padding bg-white">
        <div className="container-wide max-w-3xl space-y-4">
          {pages.map(p => (
            <Link key={p.slug} href={p.link} className="card p-6 block group hover:shadow-md transition" style={{borderLeft:'3px solid var(--color-red)'}}>
              <h2 className="font-bold text-[var(--color-navy)] group-hover:text-[var(--color-red)] transition mb-1">{p.title}</h2>
              <p className="text-sm text-[var(--color-steel)] mb-2">{p.desc}</p>
              <span className="text-sm font-semibold text-[var(--color-red)] inline-flex items-center gap-1 group-hover:gap-2 transition-all">Read More <ArrowRight size={14} /></span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
