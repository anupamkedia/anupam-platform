'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { KEY_PARTNERS, INDUSTRIES_SERVED } from '@/lib/constants';
import { Building2, Factory } from 'lucide-react';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export default function ClientsPage() {
  const [clients, setClients] = useState<any[]>([]);
  useEffect(() => { supabase.from('clients').select('*').order('sort_order').then(r => setClients(r.data || [])); }, []);

  const sectors = Array.from(new Set(clients.map(c => c.sector)));

  return (
    <>
      <section className="bg-[var(--color-navy)] text-white py-16 md:py-24">
        <div className="container-wide">
          <div className="section-divider !bg-[var(--color-red)] !mb-6" />
          <h1 className="text-page-title text-white mb-3">Our Clients & Partners</h1>
          <p className="text-white/50 max-w-xl">Trusted by India's leading institutions, EPCs, and industrial companies for over 50 years.</p>
        </div>
      </section>
      <section className="section-padding bg-white">
        <div className="container-wide">
          {sectors.length > 0 ? sectors.map(sector => (
            <div key={sector} className="mb-10">
              <h2 className="text-section-heading mb-4 flex items-center gap-2"><Building2 size={20} className="text-[var(--color-red)]" /> {sector}</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {clients.filter(c => c.sector === sector).map(c => (
                  <div key={c.id} className="card p-4 text-sm font-medium text-[var(--color-graphite)]">{c.name}</div>
                ))}
              </div>
            </div>
          )) : (
            <div>
              <h2 className="text-section-heading mb-6">Our Partners in Progress</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {KEY_PARTNERS.map(p => (
                  <div key={p} className="card p-4 text-sm font-medium text-[var(--color-graphite)] text-center">{p}</div>
                ))}
              </div>
              <h2 className="text-section-heading mt-12 mb-6">Industries We Serve</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {INDUSTRIES_SERVED.map(ind => (
                  <div key={ind} className="flex items-center gap-2 p-3 text-sm text-[var(--color-steel)]"><Factory size={14} className="text-[var(--color-navy)]" /> {ind}</div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
