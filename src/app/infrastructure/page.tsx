'use client';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { EQUIPMENT } from '@/lib/constants';

const processSteps = [
  { num: '01', title: 'Raw Materials', desc: 'Controlled sourcing and incoming quality control on every batch.' },
  { num: '02', title: 'Incoming QC', desc: 'Raw material testing before acceptance into production.' },
  { num: '03', title: 'Resin Preparation', desc: 'In-house alkyd resin manufacturing — approximately 8 tonnes per shift.' },
  { num: '04', title: 'Pigment Dispersion', desc: 'Ball mills, dyno mills, twin shaft dispersers, high speed dispersers, attritors.' },
  { num: '05', title: 'Let-Down & Mixing', desc: 'Controlled mixing and viscosity/shade/performance adjustment.' },
  { num: '06', title: 'Quality Control', desc: 'In-process testing at every stage. NABL-compliant laboratory.' },
  { num: '07', title: 'Filtration & Filling', desc: 'Final filtration, filling, and inspection before warehousing.' },
  { num: '08', title: 'Dispatch', desc: 'Finished goods storage and pan-India dispatch.' },
];

const labEquipment = [
  { name: 'Salt Spray Apparatus', purpose: 'Evaluates corrosion resistance of coated metallic test panels under accelerated salt-fog exposure.' },
  { name: 'QUV Accelerated Weathering Tester', purpose: 'Evaluates coating response to accelerated UV exposure and condensation cycles.' },
  { name: 'Wet Scrub Resistance Testing', purpose: 'Evaluates washability and scrub resistance of decorative coatings.' },
  { name: 'Spectrophotometer', purpose: 'Colour measurement, shade matching and colour consistency verification.' },
  { name: 'Dry Film Thickness Measurement', purpose: 'Verifies coating film build meets specification.' },
  { name: 'Adhesion Testing', purpose: 'Assesses coating bond strength to substrate or underlying coating.' },
  { name: 'Impact & Flexibility Testing', purpose: 'Evaluates mechanical resistance and flexibility of coating films.' },
  { name: 'Gloss Measurement', purpose: 'Evaluates finish consistency across production batches.' },
];

const resinAdvantages = [
  'Better control over raw materials',
  'Greater formulation flexibility',
  'Improved batch consistency',
  'Faster product customisation',
  'Reduced dependence on external resin supply',
  'Better integration between formulation and finished coating performance',
];

export default function InfrastructurePage() {
  return (
    <>
      <section className="relative text-white overflow-hidden">
        <img src="/img/heroes/factory-exterior.png" alt="Anupam Paints Factory" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[var(--color-navy)]/75" />
        <div className="container-wide py-20 md:py-28 relative z-10">
          <div className="w-12 h-[2px] bg-[var(--color-red)] mb-6" />
          <h1 className="text-page-title text-white mb-4">From Raw Material to Finished Coating</h1>
          <p className="text-white/50 max-w-2xl">An integrated manufacturing operation at Ranihati, Howrah, supported by in-house resin production, laboratory testing, batch control and technical development.</p>
        </div>
      </section>

      {/* Facility Overview */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="w-10 h-[2px] bg-[var(--color-red)] mb-6" />
              <h2 className="text-section-heading mb-4">Ranihati Manufacturing Campus</h2>
              <p className="text-[var(--color-steel)] leading-relaxed mb-4">The facility is spread across approximately 5 acres with an overall manufacturing capacity of approximately 1000 KL per month.</p>
              <p className="text-[var(--color-steel)] leading-relaxed mb-6">The manufacturing campus supports a wide portfolio covering decorative, protective and specialty coatings. Different product chemistries are manufactured through controlled production procedures appropriate to the system.</p>
              <div className="card p-4 text-sm text-[var(--color-steel)]">
                <strong className="text-[var(--color-navy)]">Address:</strong> Plot No. 5/27, Foundry Park, Laskarpur, Ranihati Amta Road, Howrah – 711414, West Bengal
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <img src="/img/heroes/hero-factory-inside.png" alt="Production" className="w-full h-48 object-cover" style={{borderRadius:'var(--radius-md)'}} />
              <img src="/img/heroes/hero-lab.png" alt="Laboratory" className="w-full h-48 object-cover" style={{borderRadius:'var(--radius-md)'}} />
              <img src="/img/infra/infra-production.png" alt="Mixing" className="w-full h-48 object-cover" style={{borderRadius:'var(--radius-md)'}} />
              <img src="/img/infra/infra-warehouse.png" alt="Warehouse" className="w-full h-48 object-cover" style={{borderRadius:'var(--radius-md)'}} />
            </div>
          </div>
        </div>
      </section>

      {/* In-House Resin */}
      <section className="section-padding" style={{background:'#F5F0EB'}}>
        <div className="container-wide max-w-3xl">
          <div className="w-10 h-[2px] bg-[var(--color-red)] mb-6" />
          <h2 className="text-section-heading mb-4">In-House Resin Plant</h2>
          <p className="text-[var(--color-steel)] leading-relaxed mb-4">Anupam Paints operates an in-house alkyd resin manufacturing facility supporting production of approximately 8 tonnes per shift.</p>
          <div className="space-y-2 mb-6">
            {resinAdvantages.map(a => (
              <div key={a} className="flex items-start gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[var(--color-red)] mt-1.5 shrink-0" /><span className="text-sm text-[var(--color-graphite)]">{a}</span></div>
            ))}
          </div>
          <p className="text-sm text-[var(--color-steel)]">The resin operation has supported Anupam&apos;s industrial and decorative product development since 2020.</p>
        </div>
      </section>

      {/* Manufacturing Process */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="w-10 h-[2px] bg-[var(--color-red)] mb-6" />
          <h2 className="text-section-heading mb-10">Manufacturing Process</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {processSteps.map(step => (
              <div key={step.num}>
                <div className="text-3xl font-extrabold mb-3" style={{color:'var(--color-border)'}}>{step.num}</div>
                <h3 className="text-sm font-bold text-[var(--color-navy)] mb-1">{step.title}</h3>
                <p className="text-xs text-[var(--color-steel)] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Laboratory */}
      <section className="section-padding" style={{background:'#EEF2F7'}}>
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-10 h-[2px] bg-[var(--color-red)] mb-6" />
              <h2 className="text-section-heading mb-4">Quality Control & Laboratory</h2>
              <p className="text-[var(--color-steel)] leading-relaxed mb-6">Quality control is carried out across raw materials, in-process production and finished products. Anupam maintains a NABL-compliant laboratory infrastructure for product testing and quality control.</p>
              <div className="space-y-3">
                {labEquipment.map(eq => (
                  <div key={eq.name} className="card p-4">
                    <h4 className="text-sm font-semibold text-[var(--color-navy)] mb-1">{eq.name}</h4>
                    <p className="text-xs text-[var(--color-steel)]">{eq.purpose}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <img src="/img/infra/infra-qclab.png" alt="QC Laboratory" className="w-full h-80 object-cover" style={{borderRadius:'var(--radius-md)'}} />
              <img src="/img/heroes/hero-lab.png" alt="Testing" className="w-full h-80 object-cover mt-4" style={{borderRadius:'var(--radius-md)'}} />
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 bg-[var(--color-navy)]">
        <div className="container-wide text-center">
          <h2 className="text-section-heading text-white mb-6">Certified Management Systems</h2>
          <div className="flex justify-center gap-8 mb-8">
            {['ISO 9001', 'ISO 14001', 'ISO 45001'].map(cert => (
              <div key={cert} className="text-center"><div className="text-2xl font-bold text-white">{cert}</div></div>
            ))}
          </div>
          <Link href="/approvals" className="text-sm font-semibold text-white/60 hover:text-white transition inline-flex items-center gap-1">View All Approvals & Certificates <ArrowRight size={14} /></Link>
        </div>
      </section>
    </>
  );
}
