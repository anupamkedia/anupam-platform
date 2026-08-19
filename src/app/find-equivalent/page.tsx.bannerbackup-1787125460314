'use client';
import { useState } from 'react';
import { Upload, Send, CheckCircle, FileText, ArrowRight } from 'lucide-react';

export default function FindEquivalentPage() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', company: '', competitor_product: '', competitor_brand: '', application: '', substrate: '', environment: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await fetch('/api/enquiry', { method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, phone: form.phone, email: form.email, company: form.company,
          enquiry_type: 'Find Equivalent',
          message: `Competitor: ${form.competitor_brand} - ${form.competitor_product} | Application: ${form.application} | Substrate: ${form.substrate} | Environment: ${form.environment} | ${form.message}` }) });
    } catch {}
    setStatus('done');
  };

  return (
    <>
      <section className="relative text-white overflow-hidden">
        <img src="/img/app/industrial/ind-tank-external.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[var(--color-navy)]/75" />
        <div className="py-16 md:py-24 relative z-10">
        <div className="container-wide max-w-3xl">
          <div className="w-12 h-[2px] bg-[var(--color-red)] mb-6" />
          <h1 className="text-page-title text-white mb-4">Find an Anupam Equivalent</h1>
          <p className="text-white/50 leading-relaxed">Using a competitor product? Tell us the product name, specification, or upload a TDS — our technical team will review and recommend a technically equivalent Anupam coating system within 24 hours.</p>
        </div>
      </div></section>

      <section className="section-padding bg-white">
        <div className="container-wide max-w-3xl">
          {status === 'done' ? (
            <div className="text-center py-16">
              <CheckCircle className="mx-auto mb-4" size={56} style={{color:'var(--color-red)'}} />
              <h2 className="text-2xl font-bold text-[var(--color-navy)] mb-2">Request Received</h2>
              <p className="text-[var(--color-steel)] mb-2">Our technical team will review your specification and respond with an Anupam equivalent within 24 hours.</p>
              <p className="text-sm text-[var(--color-steel)]">For urgent requirements, call <a href="tel:03322651204" className="font-semibold text-[var(--color-navy)]">033-2265 1204</a></p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h2 className="text-section-heading mb-1">Tell Us What You Currently Use</h2>
                <p className="text-caption mb-6">We will review the specification and recommend our technically equivalent product.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className="text-xs font-semibold text-[var(--color-navy)] block mb-1.5">Competitor Brand *</label>
                  <input required className="input-field" placeholder="e.g. Jotun, Hempel, International, Asian" value={form.competitor_brand} onChange={e => setForm({...form, competitor_brand: e.target.value})} /></div>
                <div><label className="text-xs font-semibold text-[var(--color-navy)] block mb-1.5">Product Name / Code *</label>
                  <input required className="input-field" placeholder="e.g. Penguard Express, Hardtop AX" value={form.competitor_product} onChange={e => setForm({...form, competitor_product: e.target.value})} /></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className="text-xs font-semibold text-[var(--color-navy)] block mb-1.5">Application / Use Case</label>
                  <select className="input-field" value={form.application} onChange={e => setForm({...form, application: e.target.value})}>
                    <option value="">Select</option>
                    <option>Primer</option><option>Intermediate / Build Coat</option><option>Topcoat / Finish</option>
                    <option>Anti-Corrosive System</option><option>Tank Lining</option><option>Floor Coating</option>
                    <option>Fire Protection</option><option>Heat Resistant</option><option>Marine / Anti-Fouling</option>
                    <option>Railway</option><option>Decorative Emulsion</option><option>Other</option>
                  </select></div>
                <div><label className="text-xs font-semibold text-[var(--color-navy)] block mb-1.5">Substrate</label>
                  <select className="input-field" value={form.substrate} onChange={e => setForm({...form, substrate: e.target.value})}>
                    <option value="">Select</option>
                    <option>Carbon Steel</option><option>Galvanised Steel</option><option>Stainless Steel</option>
                    <option>Concrete</option><option>Masonry / Plaster</option><option>Wood</option>
                    <option>Aluminium</option><option>GRP / FRP</option><option>Other</option>
                  </select></div>
              </div>

              <div><label className="text-xs font-semibold text-[var(--color-navy)] block mb-1.5">Service Environment</label>
                <select className="input-field" value={form.environment} onChange={e => setForm({...form, environment: e.target.value})}>
                  <option value="">Select</option>
                  <option>C1–C2 (Mild interior/rural)</option><option>C3 (Urban/industrial)</option>
                  <option>C4 (Industrial/coastal)</option><option>C5 (Severe industrial/marine)</option>
                  <option>CX (Extreme / offshore)</option><option>Im1 (Freshwater immersion)</option>
                  <option>Im2 (Seawater immersion)</option><option>Im3 (Soil burial)</option>
                  <option>High Temperature</option><option>Chemical exposure</option><option>Not sure</option>
                </select></div>

              <div><label className="text-xs font-semibold text-[var(--color-navy)] block mb-1.5">Additional Details</label>
                <textarea className="input-field" rows={3} placeholder="Paste TDS specifications, tender requirements, or describe the coating system you need replaced..." value={form.message} onChange={e => setForm({...form, message: e.target.value})} /></div>

              <div className="pt-4" style={{borderTop:'1px solid var(--color-border)'}}>
                <h3 className="text-sm font-semibold text-[var(--color-navy)] mb-4">Your Contact Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><input required className="input-field" placeholder="Your Name *" value={form.name} onChange={e => setForm({...form, name: e.target.value})} /></div>
                  <div><input required type="tel" className="input-field" placeholder="Phone *" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} /></div>
                  <div><input type="email" className="input-field" placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} /></div>
                  <div><input className="input-field" placeholder="Company" value={form.company} onChange={e => setForm({...form, company: e.target.value})} /></div>
                </div>
              </div>

              <button type="submit" disabled={status === 'sending'}
                className="w-full bg-[var(--color-red)] text-white font-semibold py-4 hover:bg-[var(--color-red-hover)] transition disabled:opacity-50 inline-flex items-center justify-center gap-2" style={{borderRadius:'var(--radius-md)'}}>
                <Send size={16} /> {status === 'sending' ? 'Submitting...' : 'Submit for Technical Review'}
              </button>
              <p className="text-xs text-[var(--color-steel)] text-center">Our technical team typically responds within 24 hours with a detailed equivalent recommendation.</p>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
