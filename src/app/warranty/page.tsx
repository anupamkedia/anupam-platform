'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Shield, Search, FileText, Send, CheckCircle, Upload, Camera } from 'lucide-react';

export default function WarrantyPage() {
  const [tab, setTab] = useState<'register'|'check'|'claim'>('register');
  const [form, setForm] = useState({name:'',phone:'',email:'',address:'',product:'',dealer:'',invoice:'',invoice_date:'',area:'',applicator:'',message:''});
  const [checkRef, setCheckRef] = useState('');
  const [status, setStatus] = useState<'idle'|'done'>('idle');

  const submit = async(type:string) => {
    await fetch('/api/enquiry',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:form.name,phone:form.phone,email:form.email,company:form.address,enquiry_type:`Warranty ${type}`,message:`Product: ${form.product} | Dealer: ${form.dealer} | Invoice: ${form.invoice} (${form.invoice_date}) | Area: ${form.area} sqft | Applicator: ${form.applicator} | ${form.message}`})});
    setStatus('done');
  };

  return (
    <>
      <section className="relative text-white overflow-hidden">
        <img src="/img/app/decorative/dec-living-premium.png" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[var(--color-navy)]/75" />
        <div className="container-wide py-16 md:py-24 relative z-10">
          <div className="w-12 h-[2px] bg-[var(--color-red)] mb-6" />
          <h1 className="text-page-title text-white mb-4">Warranty Centre</h1>
          <p className="text-white/50 max-w-xl">Register your warranty, check status, or raise a claim.</p>
        </div>
      </section>
      <section className="section-padding bg-white">
        <div className="container-wide max-w-3xl">
          <div className="flex gap-2 mb-8">
            {[{id:'register' as const,label:'Register Warranty'},{id:'check' as const,label:'Check Status'},{id:'claim' as const,label:'Raise Claim'}].map(t=>(
              <button key={t.id} onClick={()=>{setTab(t.id);setStatus('idle');}} className={`text-sm font-semibold px-4 py-2 transition ${tab===t.id?'bg-[var(--color-navy)] text-white':'bg-gray-100 text-[var(--color-steel)]'}`} style={{borderRadius:'var(--radius-md)'}}>{t.label}</button>
            ))}
          </div>

          {status === 'done' ? (
            <div className="text-center py-16"><CheckCircle className="mx-auto mb-4" size={56} style={{color:'var(--color-red)'}} />
              <h2 className="text-xl font-bold text-[var(--color-navy)] mb-2">Request Submitted</h2>
              <p className="text-[var(--color-steel)]">Our warranty team will process your request and respond within 48 hours.</p>
              <button onClick={()=>setStatus('idle')} className="mt-4 text-sm font-semibold" style={{color:'var(--color-red)'}}>Submit Another</button>
            </div>
          ) : tab === 'register' ? (
            <div className="space-y-4">
              <p className="text-sm text-[var(--color-steel)] mb-4">Warranty registration is subject to verification of purchase, approved application, and product eligibility. Warranty is not automatically issued upon purchase.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input className="input-field" placeholder="Your Name *" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
                <input className="input-field" placeholder="Phone *" type="tel" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} />
                <input className="input-field" placeholder="Email" type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
                <input className="input-field" placeholder="Address" value={form.address} onChange={e=>setForm({...form,address:e.target.value})} />
                <input className="input-field" placeholder="Product Name *" value={form.product} onChange={e=>setForm({...form,product:e.target.value})} />
                <input className="input-field" placeholder="Dealer Name" value={form.dealer} onChange={e=>setForm({...form,dealer:e.target.value})} />
                <input className="input-field" placeholder="Invoice / Bill No." value={form.invoice} onChange={e=>setForm({...form,invoice:e.target.value})} />
                <input className="input-field" placeholder="Purchase Date" type="date" value={form.invoice_date} onChange={e=>setForm({...form,invoice_date:e.target.value})} />
                <input className="input-field" placeholder="Area Painted (sq.ft)" value={form.area} onChange={e=>setForm({...form,area:e.target.value})} />
                <input className="input-field" placeholder="Applicator / Painter Name" value={form.applicator} onChange={e=>setForm({...form,applicator:e.target.value})} />
              </div>
              <button onClick={()=>submit('Registration')} className="w-full bg-[var(--color-red)] text-white font-semibold py-4 hover:opacity-90 transition" style={{borderRadius:'var(--radius-md)'}}>Submit Warranty Registration</button>
            </div>
          ) : tab === 'check' ? (
            <div className="space-y-4">
              <p className="text-sm text-[var(--color-steel)]">Enter your warranty reference number or registered phone number to check status.</p>
              <input className="input-field" placeholder="Warranty Reference or Phone Number" value={checkRef} onChange={e=>setCheckRef(e.target.value)} />
              <button onClick={()=>submit('Status Check')} className="bg-[var(--color-navy)] text-white font-semibold px-6 py-3 hover:opacity-90 transition" style={{borderRadius:'var(--radius-md)'}}>Check Status</button>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-[var(--color-steel)] mb-4">Describe the issue you are experiencing. Please include photographs if possible.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input className="input-field" placeholder="Your Name *" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
                <input className="input-field" placeholder="Phone *" type="tel" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} />
                <input className="input-field" placeholder="Warranty Reference" value={form.invoice} onChange={e=>setForm({...form,invoice:e.target.value})} />
                <input className="input-field" placeholder="Product" value={form.product} onChange={e=>setForm({...form,product:e.target.value})} />
              </div>
              <textarea className="input-field" rows={4} placeholder="Describe the problem — what you are seeing, when it started, which area is affected..." value={form.message} onChange={e=>setForm({...form,message:e.target.value})} />
              <button onClick={()=>submit('Claim')} className="w-full bg-[var(--color-red)] text-white font-semibold py-4 hover:opacity-90 transition" style={{borderRadius:'var(--radius-md)'}}>Submit Warranty Claim</button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
