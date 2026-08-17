'use client';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const categories = [
  { name:'Steel & Metal', slug:'steel', count:18, img:'/img/app/industrial/ind-structural-spray.png', color:'var(--accent-industrial)',
    items:['Structural Steel','Fabricated Steel','PEB Structures','Bridges','Towers','Railings','Pipelines','Storage Tanks','Process Tanks','Chimneys','Ducting','Machinery','Equipment','Scaffolding','Formwork','Fasteners','Automotive Components','Railway Components'] },
  { name:'Railway', slug:'railway', count:11, img:'/img/app/railway/rly-coach-painting.png', color:'var(--accent-railway)',
    items:['Coach Exterior','Coach Interior','Coach Roof','Bogie','Underframe','Wagons','Locomotives','Railway Bridges','Railway Structures','Fasteners & Components','Thermal Barrier'] },
  { name:'Marine', slug:'marine', count:11, img:'/img/app/marine/mar-drydock.png', color:'var(--accent-marine)',
    items:['Underwater Hull','Boot Top','Topsides','Superstructure','Deck','Ballast Tank','Cargo Hold','Potable Water Tank','Engine Room','Machinery','Ship Repair'] },
  { name:'Buildings', slug:'buildings', count:12, img:'/img/app/decorative/dec-living-premium.png', color:'var(--accent-decorative)',
    items:['Interior Walls','Exterior Walls','RCC Roof','Terrace','Bathroom','Basement','Podium','Concrete Floor','Walkway','Parking Area','Metal Roof','Water Tank'] },
];

export default function ApplicationsPage() {
  return (
    <>
      <section className="relative text-white overflow-hidden">
        <img src="/img/app/industrial/ind-structural-spray.png" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[var(--color-navy)]/75" />
        <div className="py-16 md:py-24 relative z-10">
        <div className="container-wide"><div className="w-12 h-[2px] bg-[var(--color-red)] mb-6" />
          <h1 className="text-page-title text-white mb-4">Applications</h1>
          <p className="text-white/50 max-w-xl">Find the right coating system by application. Every application connects to substrate, exposure, recommended system, products, and technical data.</p>
        </div>
      </div>
      </section>
      <section className="section-padding bg-white">
        <div className="container-wide">
          {categories.map(cat => (
            <div key={cat.slug} className="mb-12 last:mb-0">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                  <img src={cat.img} alt={cat.name} className="w-full h-48 object-cover mb-4" style={{borderRadius:'var(--radius-md)'}} />
                  <div className="w-8 h-[2px] mb-3" style={{background:cat.color}} />
                  <h2 className="text-section-heading mb-2">{cat.name}</h2>
                  <p className="text-sm text-[var(--color-steel)]">{cat.count} application areas</p>
                </div>
                <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-2">
                  {cat.items.map(item => (
                    <Link key={item} href={`/solutions/${cat.slug === 'steel' ? 'structural-steel' : cat.slug === 'railway' ? 'railway-coaches' : cat.slug === 'marine' ? 'marine-hull' : 'real-estate'}`}
                      className="card p-3 text-sm font-medium text-[var(--color-graphite)] hover:border-[var(--color-navy)] hover:text-[var(--color-navy)] transition flex items-center justify-between group">
                      {item} <ArrowRight size={12} className="text-[var(--color-steel)] group-hover:text-[var(--color-navy)] opacity-0 group-hover:opacity-100 transition" />
                    </Link>
                  ))}
                </div>
              </div>
              {cat.slug !== 'buildings' && <div className="border-b border-[var(--color-border)] mt-8" />}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
