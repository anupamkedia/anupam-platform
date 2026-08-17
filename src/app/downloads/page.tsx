'use client';
import Link from 'next/link';
import { Download, FileText, BookOpen, Shield, Layers, Send } from 'lucide-react';
import { useState } from 'react';

const downloads = [
  { category: 'Catalogues', items: [
    { name: 'Decorative Coatings Catalogue', desc: 'Complete range of interior, exterior, primers, waterproofing, and specialty decorative products.', type: 'PDF' },
    { name: 'Industrial Coatings Catalogue', desc: 'Protective coating systems — epoxy, PU, zinc-rich, heat resistant, chemical resistant.', type: 'PDF' },
    { name: 'Marine & Naval Coatings Catalogue', desc: 'Hull, deck, tank, anti-fouling, and naval coating systems.', type: 'PDF' },
    { name: 'Railway Coatings Catalogue', desc: 'RDSO approved systems for coaches, bogies, underframes, and components.', type: 'PDF' },
    { name: 'Waterproofing Solutions Catalogue', desc: 'Arest range — roof, bathroom, basement, and terrace waterproofing.', type: 'PDF' },
    { name: 'Industrial Flooring Catalogue', desc: 'Epoxy, polyaspartic, anti-skid, and heavy-duty floor coating systems.', type: 'PDF' },
  ]},
  { category: 'Company Profile', items: [
    { name: 'Anupam Paints Company Profile', desc: 'Complete company overview — manufacturing, R&D, capabilities, approvals, and key clients.', type: 'PDF' },
    { name: 'Manufacturing Infrastructure', desc: 'Factory capabilities, resin plant, laboratory, and quality control.', type: 'PDF' },
  ]},
  { category: 'Technical Documents', items: [
    { name: 'TDS Library', desc: 'Technical Data Sheets for all products. Search and request via our Technical Library.', type: 'Link', link: '/technical-library' },
    { name: 'Coating System Specifications', desc: 'Pre-engineered coating systems with layer-by-layer specifications.', type: 'Link', link: '/coating-systems' },
    { name: 'Surface Preparation Guide', desc: 'Standards and methods for steel, concrete, galvanised, and masonry surfaces.', type: 'Link', link: '/surface-preparation' },
  ]},
  { category: 'Shade Cards', items: [
    { name: 'Decorative Shade Card', desc: 'Complete colour range for interior and exterior emulsions.', type: 'Link', link: '/shade-card' },
    { name: 'Industrial RAL Colours', desc: 'Standard RAL shades available for industrial coatings.', type: 'PDF' },
  ]},
  { category: 'Certificates', items: [
    { name: 'ISO 9001 Certificate', desc: 'Quality Management System certification.', type: 'PDF' },
    { name: 'ISO 14001 Certificate', desc: 'Environmental Management System certification.', type: 'PDF' },
    { name: 'ISO 45001 Certificate', desc: 'Occupational Health & Safety certification.', type: 'PDF' },
    { name: 'RDSO Approvals', desc: 'Railway approved product certificates.', type: 'Link', link: '/approvals' },
    { name: 'Navy / DQAN Approvals', desc: 'Indian Navy approved product certificates.', type: 'Link', link: '/approvals' },
  ]},
];

export default function DownloadsPage() {
  const [showForm, setShowForm] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState('');
  const [form, setForm] = useState({name:'',phone:'',email:'',company:''});
  const [submitted, setSubmitted] = useState(false);

  const requestDoc = async () => {
    await fetch('/api/enquiry',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:form.name,phone:form.phone,email:form.email,company:form.company,enquiry_type:'Document Download',message:'Requested: '+selectedDoc})});
    setSubmitted(true);
  };

  return (
    <>
      <section className="bg-[var(--color-navy)] text-white py-16 md:py-24">
        <div className="container-wide"><div className="w-12 h-[2px] bg-[var(--color-red)] mb-6" />
          <h1 className="text-page-title text-white mb-4">Downloads</h1>
          <p className="text-white/50 max-w-xl">Product catalogues, company profile, technical documents, shade cards, and certificates.</p>
        </div>
      </section>
      <section className="section-padding bg-white">
        <div className="container-wide max-w-4xl">
          {downloads.map(cat => (
            <div key={cat.category} className="mb-10">
              <h2 className="text-section-heading mb-4">{cat.category}</h2>
              <div className="space-y-2">
                {cat.items.map(item => (
                  <div key={item.name} className="card p-4 flex items-center justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      <FileText size={18} className="text-[var(--color-navy)] mt-0.5 shrink-0" />
                      <div><h3 className="text-sm font-semibold text-[var(--color-navy)]">{item.name}</h3><p className="text-xs text-[var(--color-steel)]">{item.desc}</p></div>
                    </div>
                    {item.type === 'Link' ? (
                      <Link href={item.link||'#'} className="text-sm font-semibold text-[var(--color-red)] shrink-0">View</Link>
                    ) : (
                      <button onClick={()=>{setSelectedDoc(item.name);setShowForm(true);setSubmitted(false);}} className="text-sm font-semibold px-4 py-2 bg-[var(--color-red)] text-white shrink-0 hover:opacity-90 transition" style={{borderRadius:'var(--radius-md)'}}>
                        <Download size={14} className="inline mr-1" />Request
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={()=>setShowForm(false)}>
          <div className="bg-white max-w-md w-full p-6" style={{borderRadius:'var(--radius-lg)'}} onClick={e=>e.stopPropagation()}>
            {submitted ? (
              <div className="text-center py-6"><Download className="mx-auto mb-3 text-[var(--color-red)]" size={48} /><h3 className="font-bold text-[var(--color-navy)]">Request Received!</h3><p className="text-sm text-[var(--color-steel)] mt-2">We will email {selectedDoc} to you shortly.</p></div>
            ) : (
              <div className="space-y-3">
                <h3 className="font-bold text-[var(--color-navy)]">Download: {selectedDoc}</h3>
                <p className="text-xs text-[var(--color-steel)]">Please provide your details to receive the document.</p>
                <input className="input-field" placeholder="Name *" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
                <input className="input-field" placeholder="Phone *" type="tel" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} />
                <input className="input-field" placeholder="Email *" type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
                <input className="input-field" placeholder="Company" value={form.company} onChange={e=>setForm({...form,company:e.target.value})} />
                <button onClick={requestDoc} className="w-full bg-[var(--color-red)] text-white font-semibold py-3" style={{borderRadius:'var(--radius-md)'}}><Send size={14} className="inline mr-1" />Send Me the Document</button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
