'use client';
import { useState } from 'react';

const categories = ['All','Factory','Products','Railway','Marine','Industrial','Decorative','Flooring','Infrastructure','Team'];

const images = [
  {src:'/img/heroes/factory-aerial.jpg',cat:'Factory',caption:'Manufacturing campus at Ranihati, Howrah'},
  {src:'/img/heroes/factory-exterior.jpg',cat:'Factory',caption:'Factory building exterior'},
  {src:'/img/heroes/hero-factory-inside.jpg',cat:'Factory',caption:'Production floor — mixing and dispersion'},
  {src:'/img/infra/infra-production.jpg',cat:'Factory',caption:'Stainless steel mixing vessels'},
  {src:'/img/infra/infra-resinplant.jpg',cat:'Factory',caption:'In-house alkyd resin plant'},
  {src:'/img/infra/infra-qclab.jpg',cat:'Factory',caption:'Quality control laboratory'},
  {src:'/img/heroes/hero-lab.jpg',cat:'Factory',caption:'Spectrophotometer testing'},
  {src:'/img/infra/infra-warehouse.jpg',cat:'Factory',caption:'Finished goods warehouse'},
  {src:'/img/heroes/team-group.jpg',cat:'Team',caption:'Leadership and technical team'},
  {src:'/img/heroes/decorative-range.jpg',cat:'Products',caption:'Premium decorative product range'},
  {src:'/img/heroes/paint-pouring.jpg',cat:'Products',caption:'Colour manufacturing'},
  {src:'/img/app/railway/rly-coach-painting.jpg',cat:'Railway',caption:'Railway coach painting'},
  {src:'/img/app/railway/rly-bogie.jpg',cat:'Railway',caption:'Bogie coating application'},
  {src:'/img/app/railway/rly-workshop.jpg',cat:'Railway',caption:'Railway workshop'},
  {src:'/img/heroes/railway-coach.jpg',cat:'Railway',caption:'Freshly painted LHB coach'},
  {src:'/img/app/marine/mar-drydock.jpg',cat:'Marine',caption:'Ship in dry dock'},
  {src:'/img/heroes/naval-vessel.jpg',cat:'Marine',caption:'Naval vessel coating'},
  {src:'/img/app/marine/mar-superstructure.jpg',cat:'Marine',caption:'Superstructure painting'},
  {src:'/img/app/industrial/ind-structural-spray.jpg',cat:'Industrial',caption:'Structural steel coating'},
  {src:'/img/app/industrial/ind-bridge-coating.jpg',cat:'Industrial',caption:'Bridge anti-corrosion system'},
  {src:'/img/heroes/structural-steel.jpg',cat:'Industrial',caption:'Industrial coating application'},
  {src:'/img/app/industrial/ind-pipeline.jpg',cat:'Industrial',caption:'Pipeline coating'},
  {src:'/img/app/decorative/dec-living-premium.jpg',cat:'Decorative',caption:'Premium interior finish'},
  {src:'/img/app/decorative/dec-bedroom.jpg',cat:'Decorative',caption:'Bedroom wall painting'},
  {src:'/img/app/decorative/dec-exterior-apartment.jpg',cat:'Decorative',caption:'Exterior apartment painting'},
  {src:'/img/heroes/living-room.jpg',cat:'Decorative',caption:'Living room accent wall'},
  {src:'/img/app/flooring/floor-epoxy.jpg',cat:'Flooring',caption:'Industrial epoxy flooring'},
  {src:'/img/app/flooring/floor-selflevelling.jpg',cat:'Flooring',caption:'Self-levelling application'},
  {src:'/img/solutions/sol-oilgas.jpg',cat:'Infrastructure',caption:'Refinery coating'},
  {src:'/img/solutions/sol-tanklining.jpg',cat:'Infrastructure',caption:'Potable water tank lining'},
  {src:'/img/solutions/sol-fireprotection.jpg',cat:'Infrastructure',caption:'Fire protection coating'},
  {src:'/img/solutions/sol-flooring.jpg',cat:'Infrastructure',caption:'Warehouse floor coating'},
];

export default function GalleryPage() {
  const [filter, setFilter] = useState('All');
  const [lightbox, setLightbox] = useState<number|null>(null);
  const filtered = filter==='All' ? images : images.filter(i=>i.cat===filter);

  return (
    <>
      <section className="relative text-white overflow-hidden">
        <img src="/img/heroes/hero-gallery.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[var(--color-navy)]/75" />
        <div className="container-wide py-16 md:py-24 relative z-10">
          <div className="w-12 h-[2px] bg-[var(--color-red)] mb-6" />
          <h1 className="text-page-title text-white mb-4">Gallery</h1>
          <p className="text-white/50 max-w-xl">Manufacturing facility, products, projects, and applications.</p>
        </div>
      </section>
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="flex gap-2 overflow-x-auto pb-4 mb-6">{categories.map(c=><button key={c} onClick={()=>setFilter(c)} className={`whitespace-nowrap text-sm px-3 py-1.5 transition ${filter===c?'bg-[var(--color-navy)] text-white':'bg-gray-100 text-[var(--color-steel)]'}`} style={{borderRadius:'var(--radius-sm)'}}>{c}</button>)}</div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {filtered.map((img,i) => (
              <div key={i} className="relative group cursor-pointer overflow-hidden" style={{borderRadius:'var(--radius-md)'}} onClick={()=>setLightbox(i)}>
                <img src={img.src} alt={img.caption} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-end">
                  <div className="p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-white text-xs font-medium">{img.caption}</p>
                    <span className="text-white/60 text-[10px]">{img.cat}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {lightbox !== null && (
        <div className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4 cursor-pointer" onClick={()=>setLightbox(null)}>
          <img src={filtered[lightbox].src} alt={filtered[lightbox].caption} className="max-w-full max-h-[85vh] object-contain" />
          <div className="absolute bottom-8 text-center text-white"><p className="font-medium">{filtered[lightbox].caption}</p></div>
        </div>
      )}
    </>
  );
}
