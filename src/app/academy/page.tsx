'use client';
import Link from 'next/link';

const courses = [
  { title: 'Surface Preparation Fundamentals', audience: 'Applicators, Contractors', modules: 4, desc: 'Blast cleaning standards, power tool cleaning, surface profile, cleanliness assessment.' },
  { title: 'Decorative Application Techniques', audience: 'Painters, Dealers', modules: 6, desc: 'Brush, roller, spray application. Interior and exterior emulsions. Primers, putty, and texture finishes.' },
  { title: 'Epoxy & PU Application', audience: 'Industrial Applicators', modules: 5, desc: 'Two-component mixing, pot life, DFT control, stripe coating, recoat intervals, defect avoidance.' },
  { title: 'Industrial Coating Systems', audience: 'Engineers, Inspectors', modules: 8, desc: 'Coating selection, system design, DFT specification, inspection procedures, failure analysis.' },
  { title: 'Waterproofing Application', audience: 'Contractors, Painters', modules: 4, desc: 'Arest system application, crack treatment, base coat, topcoat, roof waterproofing, damp proofing.' },
  { title: 'Fire Protection Coatings', audience: 'Applicators, Engineers', modules: 3, desc: 'Intumescent application, DFT measurement, inspection, fire rating documentation.' },
  { title: 'Coating Defect Recognition', audience: 'All', modules: 5, desc: 'Identifying blistering, peeling, rusting, chalking, cracking. Root cause analysis and corrective action.' },
  { title: 'DFT Measurement & QC', audience: 'Inspectors, Applicators', modules: 3, desc: 'Wet film, dry film measurement. Adhesion testing. Holiday detection. Inspection documentation.' },
  { title: 'Health & Safety in Coating', audience: 'All', modules: 3, desc: 'PPE, ventilation, confined space, solvent handling, fire safety, first aid.' },
];

export default function AcademyPage() {
  return (
    <>
      <section className="bg-[var(--color-navy)] text-white py-16 md:py-24">
        <div className="container-wide max-w-3xl">
          <div className="w-12 h-[2px] bg-[var(--color-red)] mb-6" />
          <h1 className="text-page-title text-white mb-4">Anupam Academy</h1>
          <p className="text-white/50">Training and knowledge resources for painters, applicators, contractors, dealers, engineers, and inspectors.</p>
        </div>
      </section>
      <section className="section-padding" style={{background:'var(--color-warm-white)'}}>
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {courses.map(c => (
              <div key={c.title} className="card p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold px-2 py-0.5 bg-blue-50 text-[var(--color-navy)]" style={{borderRadius:'var(--radius-sm)'}}>{c.audience}</span>
                  <span className="text-xs text-[var(--color-steel)]">{c.modules} modules</span>
                </div>
                <h3 className="font-semibold text-[var(--color-navy)] mb-2">{c.title}</h3>
                <p className="text-sm text-[var(--color-steel)] leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <p className="text-sm text-[var(--color-steel)] mb-4">Training programmes are available for dealer teams, painter groups, and project applicators. Contact us to schedule.</p>
            <Link href="/contact" className="bg-[var(--color-red)] text-white font-semibold px-6 py-3 inline-block hover:opacity-90 transition" style={{borderRadius:'var(--radius-md)'}}>Request Training Programme</Link>
          </div>
        </div>
      </section>
    </>
  );
}
