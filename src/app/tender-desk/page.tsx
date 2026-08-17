'use client';
import { useState } from 'react';
import { Upload, Send, CheckCircle } from 'lucide-react';

export default function TenderDeskPage() {
  const [form, setForm] = useState({ name:'',phone:'',email:'',company:'',project_name:'',consultant:'',client:'',location:'',industry:'',tender_date:'',quantity:'',approval:'',message:'' });
  const [status, setStatus] = useState<'idle'|'done'>('idle');
  const submit = async (e: React.FormEvent) => { e.preventDefault();
    await fetch('/api/enquiry',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:form.name,phone:form.phone,email:form.email,company:form.company,enquiry_type:'Tender Desk',message:`Project: ${form.project_name} | Client: ${form.client} | Consultant: ${form.consultant} | Location: ${form.location} | Industry: ${form.industry} | Tender Date: ${form.tender_date} | Qty: ${form.quantity} | Approval: ${form.approval} | ${form.message}`})});
    setStatus('done'); };
  return (
    <>
      <section className="relative text-white overflow-hidden">
        <img src="/img/app/industrial/ind-pipeline.png" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[var(--color-navy)]/75" />
        <div className="py-16 md:py-24 relative z-10">
        <div className="container-wide max-w-3xl">
          <div className="w-12 h-[2px] bg-[var(--color-red)] mb-6" />
          <h1 className="text-page-title text-white mb-4">Project & Tender Desk</h1>
          <p className="text-white/50">Submit your tender, BOQ, painting specification, or project requirement. Our technical and commercial team will prepare a competitive response.</p>
        </div>
      </div></section>
      <section className="section-padding bg-white">
        <div className="container-wide max-w-3xl">
          {status === 'done' ? (
            <div className="text-center py-16"><CheckCircle className="mx-auto mb-4" size={56} style={{color:'var(--color-red)'}} /><h2 className="text-2xl font-bold text-[var(--color-navy)] mb-2">Tender Request Received</h2><p className="text-[var(--color-steel)]">Our project desk will review and respond within 48 hours with a technical and commercial proposal.</p></div>
          ) : (
            <form onSubmit={submit} className="space-y-4">
              <h2 className="text-section-heading mb-4">Project Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className="text-xs font-semibold text-[var(--color-navy)] block mb-1">Project Name *</label><input required className="input-field" value={form.project_name} onChange={e=>setForm({...form,project_name:e.target.value})} /></div>
                <div><label className="text-xs font-semibold text-[var(--color-navy)] block mb-1">Client / Owner</label><input className="input-field" value={form.client} onChange={e=>setForm({...form,client:e.target.value})} /></div>
                <div><label className="text-xs font-semibold text-[var(--color-navy)] block mb-1">Consultant</label><input className="input-field" value={form.consultant} onChange={e=>setForm({...form,consultant:e.target.value})} /></div>
                <div><label className="text-xs font-semibold text-[var(--color-navy)] block mb-1">Location</label><input className="input-field" value={form.location} onChange={e=>setForm({...form,location:e.target.value})} /></div>
                <div><label className="text-xs font-semibold text-[var(--color-navy)] block mb-1">Industry</label>
                  <select className="input-field" value={form.industry} onChange={e=>setForm({...form,industry:e.target.value})}><option value="">Select</option><option>Railways</option><option>Marine</option><option>Oil & Gas</option><option>Infrastructure</option><option>Power</option><option>Real Estate</option><option>Water</option><option>Defence</option><option>Other</option></select></div>
                <div><label className="text-xs font-semibold text-[var(--color-navy)] block mb-1">Tender Due Date</label><input type="date" className="input-field" value={form.tender_date} onChange={e=>setForm({...form,tender_date:e.target.value})} /></div>
                <div><label className="text-xs font-semibold text-[var(--color-navy)] block mb-1">Approximate Quantity</label><input className="input-field" placeholder="e.g. 5000 Ltrs, 200 sqm" value={form.quantity} onChange={e=>setForm({...form,quantity:e.target.value})} /></div>
                <div><label className="text-xs font-semibold text-[var(--color-navy)] block mb-1">Required Approval</label><input className="input-field" placeholder="e.g. RDSO, EIL, Navy" value={form.approval} onChange={e=>setForm({...form,approval:e.target.value})} /></div>
              </div>
              <div><label className="text-xs font-semibold text-[var(--color-navy)] block mb-1">Specification / Requirements</label>
                <textarea className="input-field" rows={4} placeholder="Paste tender specifications, BOQ items, existing approved makes, or describe your coating requirement..." value={form.message} onChange={e=>setForm({...form,message:e.target.value})} /></div>
              <div className="pt-4" style={{borderTop:'1px solid var(--color-border)'}}>
                <h3 className="text-sm font-semibold text-[var(--color-navy)] mb-3">Your Contact</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input required className="input-field" placeholder="Name *" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
                  <input required className="input-field" placeholder="Phone *" type="tel" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} />
                  <input className="input-field" placeholder="Email" type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
                  <input className="input-field" placeholder="Company" value={form.company} onChange={e=>setForm({...form,company:e.target.value})} />
                </div>
              </div>
              <button type="submit" className="w-full bg-[var(--color-red)] text-white font-semibold py-4 hover:opacity-90 transition inline-flex items-center justify-center gap-2" style={{borderRadius:'var(--radius-md)'}}><Send size={16} /> Submit for Technical & Commercial Review</button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
