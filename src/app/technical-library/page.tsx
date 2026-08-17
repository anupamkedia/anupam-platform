'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import { Search, Download, FileText, Filter, X, Send, CheckCircle } from 'lucide-react';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

const categories = ['All', 'Interior Emulsions', 'Exterior Emulsions', 'Primers & Preparatory', 'Waterproofing', 'Enamels & Wood Finishes', 'Texture & Designer Finishes', 'Zinc-Rich Primers', 'Epoxy Coatings', 'Polyurethane Coatings', 'Heat Resistant Coatings', 'Chemical Resistant', 'Tank Linings', 'Industrial Flooring', 'Hull Coatings', 'Coach Exterior', 'Fire Protection', 'Advanced Technology'];

export default function TechnicalLibraryPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [activeCat, setActiveCat] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [form, setForm] = useState({ name: '', phone: '', email: '', company: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    supabase.from('products').select('id, name, short_description, application_method, coverage_rate, warranty_years, tds_data, product_divisions(name), product_categories(name), product_brands(name)').eq('is_active', true).order('name').then(r => setProducts(r.data || []));
  }, []);

  const filtered = products.filter(p => {
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (activeCat !== 'All' && p.product_categories?.name !== activeCat) return false;
    return true;
  });

  const requestTDS = async () => {
    await fetch('/api/enquiry', { method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, enquiry_type: 'TDS Download', message: 'TDS requested for: ' + selectedProduct }) });
    setSubmitted(true);
  };

  return (
    <>
      <section className="bg-[var(--color-navy)] text-white py-16 md:py-24">
        <div className="container-wide">
          <div className="w-12 h-1 bg-[var(--color-red)] mb-6" />
          <h1 className="text-page-title text-white mb-3">Technical Library</h1>
          <p className="text-white/50 max-w-xl mb-8">Search our complete product catalogue. Request TDS, MSDS, or product specifications for any coating in our range.</p>
          <div className="relative max-w-xl">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
            <input className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 text-white placeholder-white/40 text-lg outline-none focus:border-white/40 transition" style={{borderRadius:'var(--radius-md)'}}
              placeholder="Search products — e.g. epoxy primer, waterproofing, FEVE..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="flex gap-2 overflow-x-auto pb-4 mb-6">
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveCat(cat)}
                className={`whitespace-nowrap text-sm px-3 py-1.5 transition ${activeCat === cat ? 'bg-[var(--color-navy)] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`} style={{borderRadius:'var(--radius-sm)'}}>
                {cat}
              </button>
            ))}
          </div>

          <div className="text-sm text-gray-400 mb-4">{filtered.length} products found</div>

          <div className="space-y-3">
            {filtered.map(p => (
              <div key={p.id} className="card p-5 flex items-center justify-between gap-4 hover:shadow-md transition">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium px-2 py-0.5 bg-gray-100 text-gray-500" style={{borderRadius:'var(--radius-sm)'}}>{p.product_divisions?.name}</span>
                    {p.product_brands?.name && <span className="text-xs font-medium" style={{color:'var(--color-red)'}}>{p.product_brands.name}</span>}
                  </div>
                  <h3 className="font-semibold text-[var(--color-navy)]">{p.name}</h3>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-1">{p.short_description}</p>
                  <div className="flex flex-wrap gap-3 mt-2 text-xs text-gray-400">
                    {p.coverage_rate && <span>Coverage: {p.coverage_rate}</span>}
                    {p.warranty_years && <span>Warranty: {p.warranty_years} yrs</span>}
                    {p.application_method && <span>Application: {p.application_method}</span>}
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => { setSelectedProduct(p.name); setShowModal(true); setSubmitted(false); }}
                    className="inline-flex items-center gap-1 text-sm font-medium px-4 py-2 bg-[var(--color-red)] text-white transition hover:opacity-90" style={{borderRadius:'var(--radius-md)'}}>
                    <Download size={14} /> TDS
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <FileText className="mx-auto text-gray-300 mb-3" size={40} />
              <h3 className="font-bold text-gray-800 mb-2">No products found</h3>
              <p className="text-gray-500 text-sm">Try a different search term or category. We manufacture 500+ products — contact us for any specific requirement.</p>
              <Link href="/contact" className="btn-primary mt-4">Contact Technical Team</Link>
            </div>
          )}
        </div>
      </section>

      {/* TDS Request Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white max-w-md w-full p-6" style={{borderRadius:'var(--radius-lg)'}} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-[var(--color-navy)]">Request TDS — {selectedProduct}</h3>
              <button onClick={() => setShowModal(false)}><X size={20} className="text-gray-400" /></button>
            </div>
            {submitted ? (
              <div className="text-center py-6">
                <CheckCircle className="mx-auto text-green-500 mb-3" size={48} />
                <h4 className="font-bold text-gray-800 mb-1">Request Received!</h4>
                <p className="text-sm text-gray-600">Our technical team will send the TDS to your email/WhatsApp shortly.</p>
              </div>
            ) : (
              <div className="space-y-3">
                <input className="input-field" placeholder="Your Name *" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                <input className="input-field" placeholder="Phone *" type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
                <input className="input-field" placeholder="Email" type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                <input className="input-field" placeholder="Company" value={form.company} onChange={e => setForm({...form, company: e.target.value})} />
                <button onClick={requestTDS} className="w-full inline-flex items-center justify-center gap-2 bg-[var(--color-red)] text-white font-semibold py-3 transition hover:opacity-90" style={{borderRadius:'var(--radius-md)'}}>
                  <Send size={16} /> Request TDS
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
