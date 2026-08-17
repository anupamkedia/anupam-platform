'use client';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const brands = [
  { name:'Azura', tier:'Luxury', logo:'/img/logos/azura.jpg', color:'#1A365D', bg:'#EBF0F5', desc:'The flagship decorative range. Pearl Glow, Weather Shield 15, Damp Arrestor Primer — luxury finishes with advanced protection technology. Up to 15-year warranty.', products:['Pearl Glow Interior','Weather Shield 15 Exterior','Damp Arrestor Alkali Block Dual Primer','Premium Exterior Primer','HiGloss Enamel','Biowash','Gold Metallica','Wud Glaze','Aluminium Paint','HeatShield','FireSeal'] },
  { name:'Asure', tier:'Premium', logo:'/img/logos/asure.png', color:'#9B2C2C', bg:'#FEF2F2', desc:'Premium quality interior and exterior emulsions. CleanWalls with superior washability, Radiance with weather resistance. For customers who want premium performance.', products:['CleanWalls Interior','Radiance Exterior','Floor Shield'] },
  { name:'Anex', tier:'Mainstream', logo:'/img/logos/anex.jpg', color:'#276749', bg:'#F0FFF4', desc:'Best-in-class quality at competitive pricing. Super Acrylic emulsions for interior and exterior, primers, putty, and wood coatings. The workhorse range for dealers and contractors.', products:['Super Acrylic Interior','Super Acrylic Exterior','Interior Primer','Wud Primer','Red Oxide Primer','Zinc Chromate Primer','Acrylic Distemper','Wall Putty'] },
  { name:'Atop', tier:'Economy', logo:'/img/logos/atop.png', color:'#975A16', bg:'#FFFBEB', desc:'Value-for-money range for price-sensitive projects. Reliable quality at accessible pricing — perfect for large-area painting and institutional projects.', products:['Interior Emulsion','Exterior Emulsion','Interior Primer'] },
  { name:'Amaje', tier:'Primers & Preparatory', logo:'/img/logos/amaje.png', color:'#B45309', bg:'#FFF7ED', desc:'High-performance primers and surface preparation products. Universal Primer for metal, wood, and masonry. The foundation of every good paint job.', products:['Universal Primer Interior & Exterior'] },
  { name:'Arest', tier:'Waterproofing', logo:'/img/logos/arest.jpg', color:'#0E7490', bg:'#ECFEFF', desc:'Complete waterproofing and damp-proofing solutions. Base Coat, Cool Roof Coat, Crack Filler, and Damp Block 2K — protecting buildings from water damage.', products:['Premium Waterproofing Base Coat','Cool Roof Coat','Crack Filler','Damp Block 2K'] },
];

export default function BrandsPage() {
  return (
    <>
      <section className="relative text-white overflow-hidden">
        <img src="/img/heroes/decorative-range.png" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[var(--color-navy)]/80" />
        <div className="container-wide py-20 md:py-28 relative z-10">
          <div className="w-12 h-[2px] bg-[var(--color-red)] mb-6" />
          <h1 className="text-page-title text-white mb-4">Our Brands</h1>
          <p className="text-white/50 max-w-xl">Six decorative brands — from luxury to economy. Every tier manufactured with the same commitment to quality, just positioned for different customer needs.</p>
        </div>
      </section>
      <section className="section-padding bg-white">
        <div className="container-wide">
          {brands.map((brand, i) => (
            <div key={brand.name} className="mb-8 last:mb-0">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8" style={{background:brand.bg, borderRadius:'var(--radius-lg)', borderLeft:`4px solid ${brand.color}`}}>
                <div className="lg:col-span-1 flex flex-col items-center lg:items-start text-center lg:text-left">
                  <img src={brand.logo} alt={brand.name} className="h-16 w-auto mb-3" />
                  <span className="text-xs font-semibold uppercase tracking-wider px-2 py-0.5 bg-white" style={{color:brand.color,borderRadius:'var(--radius-sm)'}}>{brand.tier}</span>
                </div>
                <div className="lg:col-span-2">
                  <h2 className="text-xl font-bold mb-3" style={{color:brand.color}}>{brand.name}</h2>
                  <p className="text-sm text-[var(--color-steel)] leading-relaxed mb-4">{brand.desc}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {brand.products.map(p => <span key={p} className="text-xs px-2 py-0.5 bg-white text-[var(--color-graphite)]" style={{borderRadius:'var(--radius-sm)'}}>{p}</span>)}
                  </div>
                  <Link href="/products/decorative" className="text-sm font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all" style={{color:brand.color}}>
                    Explore {brand.name} Products <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
