'use client';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
const areas = [
  { name:'RCC Roof / Terrace', problem:'Cracks, ponding water, failed joints, pipe penetrations, parapet junctions, poor drainage.', system:'Crack repair → Primer → Reinforced membrane → UV finish', products:['Arest Crack Filler','Arest Base Coat','Arest Cool Roof Coat'], link:'/products/decorative' },
  { name:'Metal Roof', problem:'Rust at fasteners, sheet joints, ponding, thermal expansion cracking.', system:'Rust removal → Corrosion primer → Joint sealing → Reinforced membrane → UV finish', products:['Anex Red Oxide Primer','Arest Cool Roof Coat'], link:'/products/decorative' },
  { name:'Bathroom / Wet Area', problem:'Tile grout failure, pipe penetrations, floor-wall junction leaks.', system:'Substrate cleaning → Fillets → Penetration treatment → Membrane → Protection → Tiling', products:['Arest Damp Block 2K','Arest Base Coat'], link:'/products/decorative' },
  { name:'Basement', problem:'Groundwater pressure, construction joint leaks, hydrostatic pressure.', system:'Positive-side waterproofing preferred. Joint treatment. Injection where required.', products:['Arest Damp Block 2K','Arest Base Coat'], link:'/products/decorative' },
  { name:'Exterior Wall', problem:'Rain penetration through cracks, porous plaster, failed joints.', system:'Biowash → Crack filling → Damp arrestor primer → Weather-resistant emulsion', products:['Azura Biowash','Arest Crack Filler','Azura Damp Arrestor Primer','Azura Antidirt Long Life'], link:'/products/decorative' },
  { name:'Podium / Deck', problem:'Vehicle traffic over waterproofed slab. Complex detailing at drains and joints.', system:'Prepared concrete → Crack detailing → Membrane → Protection → Traffic/wearing layer', products:['Arest Damp Block 2K','Arest Base Coat'], link:'/products/decorative' },
];
export default function WaterproofingPage() {
  return (
    <>
      <section className="relative text-white overflow-hidden">
        <img src="/img/heroes/hero-waterproof.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[var(--color-navy)]/75" />
        <div className="py-16 md:py-24 relative z-10">
        <div className="container-wide max-w-3xl">
          <div className="w-12 h-[2px] bg-[var(--color-red)] mb-6" />
          <h1 className="text-page-title text-white mb-4">Waterproofing Solutions</h1>
          <p className="text-white/50">Diagnose the water path before choosing the product. Waterproofing problems cannot be solved reliably without identifying the source of water.</p>
        </div>
      </div></section>
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="space-y-6">
            {areas.map(a => (
              <div key={a.name} className="card p-6 md:p-8" style={{borderLeft:'3px solid var(--accent-waterproofing)'}}>
                <h2 className="text-lg font-bold text-[var(--color-navy)] mb-2">{a.name}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div><span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-red)]">Common Problems</span><p className="text-sm text-[var(--color-steel)] mt-1">{a.problem}</p></div>
                  <div><span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-navy)]">Typical System</span><p className="text-sm text-[var(--color-steel)] mt-1">{a.system}</p></div>
                  <div><span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-navy)]">Anupam Products</span><div className="flex flex-wrap gap-1 mt-1">{a.products.map(p=><span key={p} className="text-xs px-2 py-0.5 bg-blue-50 text-[var(--color-navy)]" style={{borderRadius:'var(--radius-sm)'}}>{p}</span>)}</div></div>
                </div>
                <Link href={a.link} className="text-sm font-semibold mt-4 inline-flex items-center gap-1 hover:gap-2 transition-all" style={{color:'var(--accent-waterproofing)'}}>View Products <ArrowRight size={14} /></Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
