'use client';
import Link from 'next/link';

const methods = [
  { name: 'Abrasive Blast Cleaning', standard: 'ISO 8501-1', grades: 'Sa 1, Sa 2, Sa 2.5, Sa 3', desc: 'Most effective method for steel. Removes all rust, mill scale, and contaminants. Creates surface profile for mechanical adhesion. Required for most industrial coating systems.', when: 'New steel structures, bridges, tanks, marine, railway, severe corrosion environments.' },
  { name: 'Power Tool Cleaning', standard: 'ISO 8501-1', grades: 'St 3', desc: 'Grinding, wire brushing, and needle-gun cleaning. Removes loose rust and paint but cannot remove firmly adherent mill scale. Suitable for maintenance painting.', when: 'Maintenance repainting where blast cleaning is not feasible. Spot repairs.' },
  { name: 'Hand Tool Cleaning', standard: 'ISO 8501-1', grades: 'St 2', desc: 'Manual wire brushing, scraping, and chipping. Minimum acceptable preparation. Only for non-critical applications or temporary protection.', when: 'Minor touch-ups, low-corrosion environments, temporary coatings.' },
  { name: 'High-Pressure Water Jetting', standard: 'NACE/SSPC', grades: 'WJ-1 to WJ-4', desc: 'Water at 10,000-40,000 PSI removes coatings and contaminants without creating sparks. Does not create surface profile on bare steel — must combine with sweep blasting.', when: 'Offshore, explosive environments, food-grade, removing soluble salts.' },
  { name: 'Degreasing / Solvent Cleaning', standard: 'SSPC-SP1', grades: 'N/A', desc: 'Removal of oil, grease, and contaminants using solvents or alkaline cleaners. Must be done BEFORE any mechanical cleaning — contamination embeds during blasting.', when: 'Always — before any other preparation method. Mandatory first step.' },
  { name: 'Concrete Preparation', standard: 'ICRI CSP', grades: 'CSP 1-9', desc: 'Diamond grinding, shot-blasting, or scarifying to remove laitance and create profile. Concrete must be cured 28 days minimum. Moisture content below 4%.', when: 'Epoxy flooring, concrete coatings, waterproofing, tank lining on concrete.' },
  { name: 'Galvanised Surface Preparation', standard: 'ASTM D6386', grades: 'N/A', desc: 'Sweep blasting or T-wash (mordant solution) to create profile and etch the zinc surface for adhesion. Do not blast aggressively — preserve zinc layer.', when: 'Coating galvanised steel, GI pipes, roofing, ducting.' },
];

export default function SurfacePreparationPage() {
  return (
    <>
      <section className="relative text-white overflow-hidden">
        <img src="/img/heroes/hero-surfprep.png" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[var(--color-navy)]/75" />
        <div className="py-16 md:py-24 relative z-10">
        <div className="container-wide max-w-3xl">
          <div className="w-12 h-[2px] bg-[var(--color-red)] mb-6" />
          <h1 className="text-page-title text-white mb-4">Surface Preparation Centre</h1>
          <p className="text-white/50">The best coating cannot compensate for poor surface preparation. Understanding and specifying the correct preparation is essential to coating performance.</p>
        </div>
      </div></section>
      <section className="section-padding bg-white">
        <div className="container-wide max-w-4xl">
          <div className="space-y-6">
            {methods.map(m => (
              <div key={m.name} className="card p-6" style={{borderLeft:'3px solid var(--color-navy)'}}>
                <div className="flex items-start justify-between mb-3">
                  <h2 className="text-lg font-bold text-[var(--color-navy)]">{m.name}</h2>
                  <div className="text-right shrink-0 ml-4">
                    <div className="text-xs text-[var(--color-steel)]">{m.standard}</div>
                    <div className="text-xs font-semibold text-[var(--color-navy)]">{m.grades}</div>
                  </div>
                </div>
                <p className="text-sm text-[var(--color-steel)] leading-relaxed mb-3">{m.desc}</p>
                <div className="text-xs"><span className="font-semibold text-[var(--color-navy)]">When to use: </span><span className="text-[var(--color-steel)]">{m.when}</span></div>
              </div>
            ))}
          </div>
          <div className="mt-12 card p-8 bg-[var(--color-navy)] text-white text-center">
            <h3 className="text-lg font-bold mb-2">Need Help Specifying Surface Preparation?</h3>
            <p className="text-white/50 text-sm mb-4">Our coating inspectors can assess your substrate and recommend the correct preparation standard.</p>
            <Link href="/contact" className="bg-[var(--color-red)] text-white font-semibold px-6 py-3 inline-block hover:opacity-90 transition" style={{borderRadius:'var(--radius-md)'}}>Request Technical Support</Link>
          </div>
        </div>
      </section>
    </>
  );
}
