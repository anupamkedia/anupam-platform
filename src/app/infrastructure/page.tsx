import { Metadata } from 'next';
import { Factory, FlaskConical, Shield, Droplets, Zap, Truck, Thermometer, HardHat } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Infrastructure & Manufacturing',
  description: 'Anupam Paints manufacturing facility at Ranihati, Howrah — 5-acre plant, in-house resin manufacturing, NABL-compliant laboratory, 1000 KL/month capacity.',
};

const facilities = [
  { icon: Factory, title: 'Paint Manufacturing', desc: 'High-speed dispersers, pearl mills, horizontal bead mills, planetary mixers, and automatic filling lines for consistent, high-quality production.' },
  { icon: Droplets, title: 'Alkyd Resin Plant', desc: 'In-house resin manufacturing plant producing alkyd, modified alkyd, and specialty resins — vertical integration for quality control and cost efficiency.' },
  { icon: FlaskConical, title: 'QC Laboratory', desc: 'NABL-compliant laboratory equipped for salt spray testing, adhesion testing, weathering, chemical resistance, viscosity, and all standard paint tests (ASTM, IS, ISO).' },
  { icon: Thermometer, title: 'R&D Laboratory', desc: 'Dedicated R&D facility for new product development, custom formulations, and advanced coating technologies including nano-enhanced and polyurea systems.' },
  { icon: Shield, title: 'Raw Material Storage', desc: 'Organised raw material warehouse with temperature-controlled sections for sensitive materials, FIFO inventory management, and safety systems.' },
  { icon: Truck, title: 'Dispatch & Logistics', desc: 'Finished goods warehouse with staging area, loading bays, and pan-India dispatch capability through multiple logistics partners.' },
  { icon: HardHat, title: 'Safety Systems', desc: 'Fire detection and suppression, PPE stations, spill containment, emergency assembly points, and regular safety drills. ISO 45001 compliant.' },
  { icon: Zap, title: 'Utility Infrastructure', desc: 'Dedicated power supply with backup, water treatment plant, compressed air systems, and effluent treatment plant (ETP) for environmental compliance.' },
];

export default function InfrastructurePage() {
  return (
    <>
      <section className="gradient-brand text-white py-16 md:py-24">
        <div className="container-wide px-4">
          <p className="text-brand-200 text-sm font-medium mb-2 tracking-wider uppercase">Infrastructure</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Manufacturing Excellence</h1>
          <p className="text-lg text-brand-200 max-w-2xl">Our 5-acre facility at Ranihati, Howrah is equipped with modern manufacturing, quality testing, and R&D infrastructure.</p>
        </div>
      </section>

      {/* Key numbers */}
      <section className="bg-white py-12 border-b border-gray-100">
        <div className="container-wide px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { val: '5 Acres', label: 'Manufacturing Facility' },
            { val: '1000 KL', label: 'Monthly Capacity' },
            { val: 'In-House', label: 'Resin Manufacturing' },
            { val: 'NABL', label: 'Compliant Laboratory' },
          ].map((s,i) => (
            <div key={i}>
              <div className="text-2xl md:text-3xl font-bold text-brand-500">{s.val}</div>
              <div className="text-sm text-steel-400 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Facility sections */}
      <section className="section-padding gradient-light">
        <div className="container-wide">
          <h2 className="section-title text-center mb-12">Our Facilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {facilities.map((f, i) => (
              <div key={i} className="card p-6 flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-500 flex items-center justify-center shrink-0">
                  <f.icon size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">{f.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo gallery placeholder */}
      <section className="section-padding bg-white">
        <div className="container-wide text-center">
          <h2 className="section-title mb-4">Factory Gallery</h2>
          <p className="text-gray-600 mb-8">[High-resolution factory photographs and video walkthrough will be displayed here. Content to be provided by Anupam Paints.]</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Manufacturing Area', 'Resin Plant', 'QC Laboratory', 'R&D Lab', 'Filling Lines', 'Raw Material Store', 'Dispatch Bay', 'Safety Systems'].map((area, i) => (
              <div key={i} className="bg-brand-50 rounded-xl p-8 text-center">
                <Factory className="mx-auto text-brand-300 mb-2" size={32} />
                <div className="text-sm text-brand-500 font-medium">{area}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
