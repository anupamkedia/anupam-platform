'use client';
import { EQUIPMENT, SITE } from '@/lib/constants';
import { Factory, FlaskConical, Cpu, Droplets, Zap, Microscope, Shield, Award } from 'lucide-react';

const facilityHighlights = [
  { icon: Factory, label: '5-Acre Manufacturing Facility', desc: 'State-of-the-art semi-automatic plant at Howrah\'s Foundry Park with 1000KL monthly capacity.' },
  { icon: FlaskConical, label: 'In-House Alkyd Resin Plant', desc: 'Captive resin production for quality control from raw material to finished product.' },
  { icon: Microscope, label: 'NABL-Compliant QC Lab', desc: 'Wet Scrub, Spectrophotometer, QUV Weathering, Salt Spray, GLC — all in-house.' },
  { icon: Droplets, label: 'UV Water Treatment', desc: 'Dedicated water treatment for water-based paint manufacturing.' },
  { icon: Zap, label: '180 KVA Backup Power', desc: 'Uninterrupted production with silent generator backup.' },
  { icon: Cpu, label: 'Semi-Automatic Production', desc: 'High Speed Dispersers, Ball Mills, Dyno Mills, Twin Shaft Dispersers, Attritors.' },
];

export default function InfrastructurePage() {
  return (
    <>
      <section className="relative text-white overflow-hidden">
        <img src="/img/heroes/factory-aerial.png" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-brand-500/85" />
        <div className="container-wide px-4 py-20 md:py-28 relative z-10">
          <p className="text-brand-200 text-sm font-medium mb-2 tracking-wider uppercase">Infrastructure</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Manufacturing Excellence</h1>
          <p className="text-lg text-brand-200 max-w-2xl">5-acre state-of-the-art facility with in-house resin plant and NABL-compliant laboratory.</p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilityHighlights.map((item, i) => (
              <div key={i} className="card p-6 hover:shadow-lg transition">
                <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-500 flex items-center justify-center mb-4"><item.icon size={24} /></div>
                <h3 className="font-bold text-gray-800 mb-2">{item.label}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding gradient-light">
        <div className="container-wide">
          <h2 className="section-title text-center mb-10">Equipment & Testing Facilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {EQUIPMENT.map((eq, i) => (
              <div key={i} className="bg-white rounded-xl p-6 border border-gray-100">
                <h3 className="font-bold text-brand-500 mb-2">{eq.name}</h3>
                <p className="text-sm text-gray-600">{eq.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-wide">
          <h2 className="section-title text-center mb-10">Factory Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              '/img/heroes/factory-aerial.png',
              '/img/heroes/structural-steel.png',
              '/img/heroes/factory-aerial.png',
              '/img/heroes/structural-steel.png',
              '/img/heroes/structural-steel.png',
              '/img/heroes/factory-aerial.png',
              '/img/heroes/railway-coach.png',
              '/img/heroes/naval-vessel.png',
            ].map((img, i) => (
              <div key={i} className="rounded-xl overflow-hidden hover:shadow-lg transition"><img src={img} alt={`Factory ${i+1}`} className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500" /></div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-400 mt-4">Factory photographs will be replaced with actual Anupam Paints facility images</p>
        </div>
      </section>
    </>
  );
}
