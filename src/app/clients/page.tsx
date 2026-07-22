import { Metadata } from 'next';
import { supabase } from '@/lib/supabase';
import { Building2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Clients & Projects', description: 'Anupam Paints serves Indian Railways, Indian Navy, BHEL, HPCL, Tata Projects, L&T, Shapoorji Pallonji, Adani, and 500+ institutional and industrial clients.' };

const clientSectors = [
  { name: 'Indian Railways', clients: ['All Railway Zones', 'ICF Chennai', 'CLW Chittaranjan', 'DMW Patiala', 'RCF Kapurthala', 'MCF Rae Bareli', 'COFMOW', 'Railway Workshops'] },
  { name: 'Defence & Navy', clients: ['Indian Navy', 'GRSE Kolkata', 'Mazagon Dock', 'Cochin Shipyard', 'MES Eastern Command'] },
  { name: 'Government & PSU', clients: ['BHEL', 'HPCL', 'IOCL', 'NBCC', 'PWD West Bengal', 'AAI', 'CMRL'] },
  { name: 'Infrastructure & EPC', clients: ['Tata Projects', 'L&T', 'Shapoorji Pallonji', 'KEC International', 'Adani', 'NCC', 'Welspun'] },
  { name: 'Industrial', clients: ['Rungta Mines', 'Electrosteel', 'Steel Plants', 'Cement Plants', 'Power Plants'] },
  { name: 'Real Estate', clients: ['Lodha', 'IndoSpace', 'Commercial Projects', 'Residential Projects'] },
];

export default async function ClientsPage() {
  return (
    <>
      <section className="gradient-brand text-white py-16 md:py-24">
        <div className="container-wide px-4">
          <p className="text-brand-200 text-sm font-medium mb-2 tracking-wider uppercase">Clients</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Clients & Projects</h1>
          <p className="text-lg text-brand-200 max-w-2xl">Trusted by India's leading railways, defence, infrastructure, and industrial organizations.</p>
        </div>
      </section>
      <section className="section-padding bg-white">
        <div className="container-wide">
          {clientSectors.map((sector, i) => (
            <div key={i} className="mb-10 last:mb-0">
              <h2 className="text-2xl font-bold text-brand-500 mb-4 flex items-center gap-2">
                <Building2 size={24} /> {sector.name}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {sector.clients.map((client) => (
                  <div key={client} className="card p-4 text-center text-sm font-medium text-gray-700 hover:text-brand-500 hover:border-brand-200 transition">
                    {client}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="section-padding gradient-light text-center">
        <h2 className="section-title mb-4">Want to See Our Work?</h2>
        <p className="text-gray-600 mb-6">Case studies with project details, coating systems, and results will be published soon.</p>
        <Link href="/contact" className="btn-primary">Request Project References</Link>
      </section>
    </>
  );
}
