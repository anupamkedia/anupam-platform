'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, MapPin, Calendar, Layers } from 'lucide-react';

const projects = [
  { client:'Indian Railways — CLW',industry:'Railways',location:'Chittaranjan, WB',application:'Coach Exterior Coating',products:['Epoxy Zinc Phosphate Primer','Epoxy MIO','FEVE Fluoropolymer Topcoat'],year:'Ongoing',img:'/img/app/railway/rly-coach-painting.png' },
  { client:'Indian Railways — DMW',industry:'Railways',location:'Patiala, Punjab',application:'Bogie and Underframe Coating',products:['Epoxy Zinc-Rich Primer','Epoxy High-Build'],year:'Ongoing',img:'/img/app/railway/rly-bogie.png' },
  { client:'Indian Navy via GRSE',industry:'Marine & Defence',location:'Kolkata, WB',application:'Hull, Superstructure, Deck Coating Systems',products:['Marine Epoxy Primer','Anti-Fouling System','Naval Grey PU'],year:'Ongoing',img:'/img/app/marine/mar-drydock.png' },
  { client:'Mazagon Dock Shipbuilders',industry:'Marine',location:'Mumbai, MH',application:'Naval Vessel Coating Systems',products:['Underwater Epoxy','Anti-Fouling','Deck Coatings'],year:'Ongoing',img:'/img/heroes/naval-vessel.png' },
  { client:'Tata Projects',industry:'Infrastructure',location:'Pan India',application:'Structural Steel Anti-Corrosion Systems',products:['Zinc-Rich Primer','Epoxy MIO','Aliphatic PU'],year:'Multiple projects',img:'/img/app/industrial/ind-bridge-coating.png' },
  { client:'Kalpataru Projects',industry:'Infrastructure',location:'Pan India',application:'Transmission Tower and Structural Coating',products:['Epoxy Primer','PU Topcoat'],year:'Multiple',img:'/img/app/industrial/ind-structural-spray.png' },
  { client:'KEC International',industry:'Infrastructure',location:'Pan India',application:'Power Transmission Infrastructure',products:['Protective Coating Systems'],year:'Multiple',img:'/img/heroes/structural-steel.png' },
  { client:'BHEL',industry:'Power',location:'Multiple locations',application:'Power Plant Equipment and Structure Coating',products:['Heat Resistant Coatings','Structural Steel Systems'],year:'Ongoing',img:'/img/app/industries/industry-power.png' },
  { client:'Major Steel Manufacturer',industry:'Steel',location:'Eastern India',application:'Plant Structure, Equipment, and High-Temperature Areas',products:['Zinc-Rich Primer','Heat Resistant Aluminium','Epoxy Floor Coating'],year:'Ongoing',img:'/img/app/industries/industry-steel-plant.png' },
  { client:'Shapoorji Pallonji',industry:'Real Estate',location:'Pan India',application:'Decorative and Waterproofing Systems',products:['Azura Weather Shield','Arest Waterproofing','Primers'],year:'Multiple',img:'/img/app/decorative/dec-exterior-apartment.png' },
  { client:'PWD West Bengal',industry:'Government',location:'West Bengal',application:'Institutional Building Coatings',products:['Decorative Emulsions','Primers','Enamels'],year:'Ongoing',img:'/img/solutions/sol-realestate.png' },
  { client:'Transafe Container Manufacturing',industry:'Containers',location:'India',application:'ISO Container Coating Systems',products:['Epoxy Primer','High-Build Epoxy','PU Topcoat'],year:'Ongoing',img:'/img/heroes/structural-steel.png' },
];

const industries = ['All','Railways','Marine & Defence','Infrastructure','Power','Steel','Real Estate','Government','Containers'];

export default function ProjectsPage() {
  const [filter, setFilter] = useState('All');
  const filtered = projects.filter(p => filter === 'All' || p.industry === filter);

  return (
    <>
      <section className="relative text-white overflow-hidden">
        <img src="/img/app/industrial/ind-bridge-coating.png" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[var(--color-navy)]/75" />
        <div className="container-wide py-16 md:py-24 relative z-10">
          <div className="w-12 h-[2px] bg-[var(--color-red)] mb-6" />
          <h1 className="text-page-title text-white mb-4">Projects & References</h1>
          <p className="text-white/50 max-w-xl">Verified project references across railways, marine, infrastructure, industrial, and institutional sectors.</p>
        </div>
      </section>
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="flex gap-2 overflow-x-auto pb-4 mb-6">{industries.map(i=><button key={i} onClick={()=>setFilter(i)} className={`whitespace-nowrap text-sm px-3 py-1.5 transition ${filter===i?'bg-[var(--color-navy)] text-white':'bg-gray-100 text-[var(--color-steel)]'}`} style={{borderRadius:'var(--radius-sm)'}}>{i}</button>)}</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((p,i) => (
              <div key={i} className="card overflow-hidden group">
                <div className="h-44 overflow-hidden relative">
                  <img src={p.img} alt={p.client} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <span className="text-xs px-2 py-0.5 bg-white/20 backdrop-blur-sm" style={{borderRadius:'var(--radius-sm)'}}>{p.industry}</span>
                    <h3 className="font-bold mt-1">{p.client}</h3>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-4 text-xs text-[var(--color-steel)] mb-3">
                    <span className="flex items-center gap-1"><MapPin size={12} />{p.location}</span>
                    <span className="flex items-center gap-1"><Calendar size={12} />{p.year}</span>
                  </div>
                  <p className="text-sm text-[var(--color-graphite)] mb-3"><strong>Application:</strong> {p.application}</p>
                  <div className="flex flex-wrap gap-1">{p.products.map(pr=><span key={pr} className="text-xs px-2 py-0.5 bg-blue-50 text-[var(--color-navy)]" style={{borderRadius:'var(--radius-sm)'}}>{pr}</span>)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
