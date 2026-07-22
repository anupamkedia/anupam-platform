'use client';
import { EQUIPMENT, SITE } from '@/lib/constants';
import Link from 'next/link';
import { Factory, FlaskConical, Shield, Droplets, Zap, Microscope, Award, ArrowRight } from 'lucide-react';

const facilityFeatures = [
  { icon: Factory, title: '5-Acre Manufacturing Facility', desc: 'Located at Foundry Park, Ranihati, Howrah — our semi-automatic manufacturing facility has 1000 KL/month production capacity.' },
  { icon: FlaskConical, title: 'In-House Alkyd Resin Plant', desc: 'Resin plants with boilers for captive consumption of various resin types as per production needs — full vertical integration.' },
  { icon: Droplets, title: 'UV Water Treatment Plant', desc: 'Dedicated UV water treatment system for consumption in water-based paints ensuring consistent quality.' },
  { icon: Microscope, title: 'NABL-Compliant QC Laboratory', desc: 'Equipped with Wet Scrub Resistance tester, Spectrophotometer, QUV Accelerated Weathering Tester, Salt Spray Apparatus, GLC for R&D and batch testing.' },
  { icon: Zap, title: 'Power Backup', desc: '180 KVA silent generator installed for emergency requirement — zero production downtime.' },
  { icon: Shield, title: 'ISO Certified Operations', desc: 'ISO 9001 (Quality), ISO 14001 (Environment), ISO 45001 (Safety) certified manufacturing processes.' },
];

export default function InfrastructurePage() {
  return (
    <>
      <section className="gradient-brand text-white py-16 md:py-24">
        <div className="container-wide px-4">
          <p className="text-brand-200 text-sm font-medium mb-2 tracking-wider uppercase">Infrastructure</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">World-Class Manufacturing</h1>
          <p className="text-lg text-brand-200 max-w-2xl">Our semi-automatic facility at Howrah houses modern equipment, an in-house resin plant, and a NABL-compliant laboratory — producing 1000 KL/month across all coating categories.</p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilityFeatures.map((f, i) => (
              <div key={i} className="card p-6 hover:border-brand-200 transition group">
                <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-500 flex items-center justify-center mb-4 group-hover:bg-brand-500 group-hover:text-white transition"><f.icon size={24} /></div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding gradient-light">
        <div className="container-wide">
          <h2 className="section-title text-center mb-10">Manufacturing Equipment</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {EQUIPMENT.map((eq, i) => (
              <div key={i} className="bg-white rounded-xl p-5 border border-gray-100">
                <h3 className="font-bold text-brand-500 mb-2">{eq.name}</h3>
                <p className="text-sm text-gray-600">{eq.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-brand-500 text-white">
        <div className="container-wide px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[{ value: '1000 KL', label: 'Monthly Capacity' }, { value: '5 Acres', label: 'Facility Area' }, { value: '500+', label: 'Products Manufactured' }, { value: '150+', label: 'Team Members' }].map((stat, i) => (
            <div key={i}><div className="text-3xl font-bold">{stat.value}</div><div className="text-brand-200 text-sm mt-1">{stat.label}</div></div>
          ))}
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-wide text-center max-w-2xl mx-auto">
          <h2 className="section-title">Factory Location</h2>
          <div className="bg-brand-50 rounded-xl p-6 mt-6">
            <Factory className="mx-auto text-brand-500 mb-3" size={32} />
            <p className="font-medium text-gray-800 mb-1">Anupam Enterprises</p>
            <p className="text-sm text-gray-600">{SITE.factory}</p>
            <p className="text-sm text-gray-500 mt-2">Phone: {SITE.phone} / {SITE.phone2}</p>
          </div>
          <Link href="/contact" className="btn-primary mt-6">Schedule a Factory Visit <ArrowRight size={16} className="ml-2" /></Link>
        </div>
      </section>
    </>
  );
}
