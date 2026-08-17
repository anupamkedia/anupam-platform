'use client';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const industries = [
  { name: 'Indian Railways', icon: '🚂', desc: 'RDSO, ICF, CLW, DMW, RCF, MCF approved. FEVE fluoropolymer coach coatings, EN 45545 HL3 fire-safe systems, bogie and underframe protection. Serving all major railway workshops for 35+ years.', solutions: ['Coach Exterior', 'Bogie & Underframe', 'Interior Panels', 'Heat Reflective Roof'], link: '/solutions/railway-coaches', img: '/img/heroes/railway-coach.png', color: '#991B1B' },
  { name: 'Indian Navy & Marine', icon: '🚢', desc: 'DQAN approved for naval vessels. Anti-fouling, hull coating, deck coatings, ballast tank, and safety systems. Supplying GRSE, Mazagon Dock, Cochin Shipyard for 35+ years.', solutions: ['Hull System', 'Superstructure', 'Anti-Fouling', 'Glow-in-Dark Safety'], link: '/solutions/marine-hull', img: '/img/heroes/naval-vessel.png', color: '#1E3A5F' },
  { name: 'Oil, Gas & Petrochemical', icon: '⛽', desc: 'High-performance systems for refineries, pipelines, storage tanks, and offshore platforms. Glass flake epoxy, novolac, heat resistant up to 600°C. EIL approved.', solutions: ['Pipeline Coating', 'Tank Lining', 'Structural Steel', 'Heat Resistant'], link: '/solutions/oil-gas', img: '/img/solutions/sol-oilgas.png', color: '#B45309' },
  { name: 'Power & Energy', icon: '⚡', desc: 'Coatings for thermal power plants, substations, cooling towers, and transmission infrastructure. High-temperature aluminium paints, structural protection systems.', solutions: ['High Temp Coatings', 'Structural Steel', 'Chimney & Stacks', 'Cooling Towers'], link: '/solutions/power-cement', img: '/img/heroes/structural-steel.png', color: '#7C3AED' },
  { name: 'Infrastructure & Construction', icon: '🏗️', desc: 'Anti-corrosion systems for bridges, flyovers, PEB structures, metros, and commercial buildings. ISO 12944 compliant for 15-25 year service life.', solutions: ['Structural Steel', 'PEB Coating', 'Bridge Protection', 'Metro Infrastructure'], link: '/solutions/structural-steel', img: '/img/solutions/sol-structural.png', color: '#475569' },
  { name: 'Real Estate & Housing', icon: '🏢', desc: 'Complete decorative range under 6 brands — AZURA (luxury), ASURE (premium), ANEX (mainstream), ATOP (economy), AMAJE (primers), AREST (waterproofing). Up to 15 years warranty.', solutions: ['Interior Painting', 'Exterior Protection', 'Waterproofing', 'Texture Finishes'], link: '/solutions/real-estate', img: '/img/divisions/div-decorative.png', color: '#D97706' },
  { name: 'Shipbuilding', icon: '⚓', desc: 'Complete marine coating systems for new-build vessels. Supplying GRSE Kolkata, Mazagon Dock Mumbai, Cochin Shipyard, and private shipyards across India.', solutions: ['Hull Protection', 'Tank Coatings', 'Deck Systems', 'Naval Grey'], link: '/solutions/marine-hull', img: '/img/heroes/naval-vessel.png', color: '#0E7490' },
  { name: 'Automobile & OEM', icon: '🚗', desc: 'Quick-drying automotive coatings, stoving enamels, and DTM systems for OEM manufacturing and aftermarket applications. Compatible with automated spray systems.', solutions: ['Quick-Dry Paint', 'Stoving Enamel', 'DTM Coatings', 'Primer Systems'], link: '/products/specialty', img: '/img/divisions/div-industrial.png', color: '#DC2626' },
  { name: 'Water Infrastructure', icon: '💧', desc: 'WRAS and FDA approved coatings for potable water tanks, water treatment plants, swimming pools, and sewage treatment facilities. Zero VOC solventless systems.', solutions: ['Potable Water Lining', 'ETP Coating', 'Swimming Pool', 'Pipeline Lining'], link: '/solutions/tank-lining', img: '/img/solutions/sol-tanklining.png', color: '#0891B2' },
  { name: 'Warehousing & Logistics', icon: '🏭', desc: 'Industrial flooring systems — epoxy self-levelling, polyaspartic fast-cure, anti-static floors for warehouses, logistics parks, cold storage, and manufacturing plants.', solutions: ['Epoxy Flooring', 'Polyaspartic', 'Anti-Static', 'Line Marking'], link: '/solutions/industrial-flooring', img: '/img/solutions/sol-flooring.png', color: '#4338CA' },
  { name: 'Steel & Cement Plants', icon: '🔩', desc: 'Coatings for blast furnaces, cement kilns, coal handling, ESP structures. Heat resistant, abrasion resistant, and chemical resistant systems for harsh plant environments.', solutions: ['Heat Resistant', 'Abrasion Resistant', 'Structural Steel', 'Chemical Resistant'], link: '/solutions/power-cement', img: '/img/heroes/hero-factory-inside.png', color: '#78716C' },
  { name: 'Food & Pharma', icon: '🏥', desc: 'Food-grade epoxy coatings, hygienic wall and floor systems, anti-bacterial coatings for food processing plants, pharmaceutical facilities, and cleanrooms.', solutions: ['Food Grade Lining', 'Hygienic Flooring', 'Anti-Bacterial', 'Clean Room Coating'], link: '/products/specialty', img: '/img/heroes/hero-lab.png', color: '#059669' },
  { name: 'Defence & Ordnance', icon: '🛡️', desc: 'MES approved coatings for defence establishments. Camouflage coatings, NBC protection, and specialized defence specification paints. Ordnance Factory Board certified.', solutions: ['Defence Spec Paint', 'Camouflage', 'MES Projects', 'NBC Coatings'], link: '/products/marine', img: '/img/heroes/naval-vessel.png', color: '#1F2937' },
  { name: 'Mining & Heavy Engineering', icon: '⛏️', desc: 'Abrasion and impact resistant coatings for mining equipment, conveyor systems, and heavy fabrication. Chemical resistant systems for harsh mining environments.', solutions: ['Abrasion Resistant', 'Impact Resistant', 'Chemical Resistant', 'Equipment Coating'], link: '/products/industrial', img: '/img/divisions/div-industrial.png', color: '#92400E' },
  { name: 'Containers & Freight', icon: '📦', desc: 'High-performance coating systems for ISO containers, freight wagons, tank containers, and transport equipment. Impact and weather resistant.', solutions: ['Container Coating', 'Wagon Protection', 'Tank Container', 'Trailer Coating'], link: '/solutions/containers', img: '/img/heroes/structural-steel.png', color: '#6D28D9' },
];

export default function IndustriesPage() {
  return (
    <>
      <section className="relative text-white overflow-hidden">
        <img src="/img/heroes/factory-aerial.png" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[var(--color-navy)]/85" />
        <div className="container-wide py-20 md:py-28 relative z-10">
          <div className="w-12 h-1 bg-[var(--color-red)] mb-6" />
          <h1 className="text-page-title text-white mb-3">Industries We Serve</h1>
          <p className="text-white/50 max-w-xl">From railways to refineries, from homes to warships — Anupam Paints provides coating solutions for every industry across India.</p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((ind) => (
              <Link key={ind.name} href={ind.link} className="group card card-hover overflow-hidden">
                <div className="h-44 overflow-hidden relative">
                  <img src={ind.img} alt={ind.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <span className="text-2xl">{ind.icon}</span>
                    <h3 className="text-lg font-bold text-white">{ind.name}</h3>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-sm text-gray-600 leading-relaxed mb-3">{ind.desc}</p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {ind.solutions.map(s => <span key={s} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600" style={{borderRadius:'var(--radius-sm)'}}>{s}</span>)}
                  </div>
                  <span className="text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all" style={{color: ind.color}}>View Solutions <ArrowRight size={14} /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
