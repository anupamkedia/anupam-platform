'use client';
import { useState } from 'react';
import { Download, FileText, Send, CheckCircle, X } from 'lucide-react';

const catalogues = [
  { name: 'Anupam Paints Company Profile', desc: 'Complete company overview — manufacturing, R&D, capabilities, approvals, and key clients.', file: '/catalogues/company-profile.pdf' },
  { name: 'Steel & PEB Coatings', desc: 'Protective coating systems for structural steel, PEB structures, bridges, and industrial steel.', file: '/catalogues/steel-peb-coatings.pdf' },
  { name: 'Railway Coatings Brochure', desc: 'RDSO approved coating systems for coaches, bogies, underframes, and railway infrastructure.', file: '/catalogues/railway-coatings.pdf' },
  { name: 'Automotive Coatings', desc: 'Coating systems for automotive components, axles, chassis, and OEM applications.', file: '/catalogues/automotive-coatings.pdf' },
  { name: 'FireSeal Intumescent Coating', desc: 'Passive fire protection for structural steel — intumescent technology, fire ratings, and specifications.', file: '/catalogues/fireseal-brochure.pdf' },
  { name: 'Arest PU Roof Coat', desc: 'Polyurethane waterproofing and cool roof coating for terraces and metal roofs.', file: '/catalogues/arest-roofcoat.pdf' },
  { name: 'Complete TDS Book', desc: 'Technical Data Sheets for the entire Anupam Paints product range.', file: '/catalogues/tds-book.pdf' },
];

export default function DownloadsPage() {
  const [showForm, setShowForm] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState({ name: '', file: '' });
  const [form, setForm] = useState({ name: '', phone: '', email: '', company: '' });
  const [submitted, setSubmitted] = useState(false);

  const requestDoc = async () => {
    try {
      await fetch('/api/enquiry', { method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, phone: form.phone, email: form.email, company: form.company,
          enquiry_type: 'Catalogue Download', message: 'Downloaded: ' + selectedDoc.name }) });
    } catch {}
    setSubmitted(true);
    // Auto-download after form submission
    setTimeout(() => {
      const link = document.createElement('a');
      link.href = selectedDoc.file;
      link.download = selectedDoc.name + '.pdf';
      link.click();
    }, 1000);
  };

  return (
    <>
      <section className="relative text-white overflow-hidden">
        <img src="/img/heroes/hero-products.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[var(--color-navy)]/75" />
        <div className="container-wide py-16 md:py-24 relative z-10">
          <div className="w-12 h-[2px] bg-[var(--color-red)] mb-6" />
          <h1 className="text-page-title text-white mb-3">Download Catalogues & Brochures</h1>
          <p className="text-white/50 max-w-xl">Product catalogues, technical brochures, company profile, and TDS book. Enter your details to download.</p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-wide max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {catalogues.map(cat => (
              <div key={cat.name} className="card p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-start gap-3 mb-3">
                    <FileText size={24} className="text-[var(--color-red)] shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold text-[var(--color-navy)]">{cat.name}</h3>
                      <p className="text-xs text-[var(--color-steel)] mt-1">{cat.desc}</p>
                    </div>
                  </div>
                </div>
                <button onClick={() => { setSelectedDoc({ name: cat.name, file: cat.file }); setShowForm(true); setSubmitted(false); }}
                  className="mt-4 w-full bg-[var(--color-red)] text-white font-semibold py-3 hover:opacity-90 transition inline-flex items-center justify-center gap-2" style={{borderRadius:'var(--radius-md)'}}>
                  <Download size={16} /> Download PDF
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {showForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <div className="bg-white max-w-md w-full overflow-hidden" style={{borderRadius:'var(--radius-lg)'}} onClick={e => e.stopPropagation()}>
            {submitted ? (
              <div className="p-10 text-center">
                <CheckCircle className="mx-auto mb-4" size={56} style={{color:'var(--color-red)'}} />
                <h3 className="text-xl font-bold text-[var(--color-navy)] mb-2">Downloading...</h3>
                <p className="text-[var(--color-steel)] text-sm">{selectedDoc.name} will download automatically.</p>
              </div>
            ) : (
              <>
                <div className="bg-[var(--color-navy)] p-6 text-white relative">
                  <button onClick={() => setShowForm(false)} className="absolute top-4 right-4 text-white/50 hover:text-white"><X size={20} /></button>
                  <h3 className="font-bold text-lg mb-1">Download: {selectedDoc.name}</h3>
                  <p className="text-white/50 text-sm">Enter your details to receive the brochure.</p>
                </div>
                <div className="p-6 space-y-3">
                  <input className="input-field" placeholder="Your Name *" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                  <input className="input-field" placeholder="Phone Number *" type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
                  <input className="input-field" placeholder="Email *" type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                  <input className="input-field" placeholder="Company (optional)" value={form.company} onChange={e => setForm({...form, company: e.target.value})} />
                  <button onClick={requestDoc} disabled={!form.name || !form.phone || !form.email}
                    className="w-full bg-[var(--color-red)] text-white font-semibold py-3.5 hover:opacity-90 transition disabled:opacity-40 inline-flex items-center justify-center gap-2" style={{borderRadius:'var(--radius-md)'}}>
                    <Download size={16} /> Download Now
                  </button>
                  <p className="text-xs text-center text-[var(--color-steel)]">Your details help us serve you better. We do not spam.</p>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}