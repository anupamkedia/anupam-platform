'use client';
import { useState } from 'react';
import { SITE, ENQUIRY_TYPES } from '@/lib/constants';
import { MapPin, Phone, Mail, Send, CheckCircle, Factory, Clock, Globe } from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', company: '', enquiry_type: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/enquiry', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      setStatus(res.ok ? 'done' : 'error');
    } catch { setStatus('error'); }
  };

  return (
    <>
      <section className="gradient-brand text-white py-16 md:py-24">
        <div className="container-wide px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-brand-200 max-w-2xl">Get in touch with our team for product enquiries, technical support, or project specifications.</p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              {status === 'done' ? (
                <div className="bg-green-50 rounded-2xl p-8 text-center">
                  <CheckCircle className="mx-auto text-green-500 mb-3" size={48} />
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Enquiry Submitted!</h3>
                  <p className="text-gray-600">Our team will respond within 24 hours.</p>
                  <p className="text-sm text-gray-400 mt-2">Or call directly: <a href={`tel:${SITE.phone}`} className="text-brand-500 font-medium">{SITE.phone}</a></p>
                  <button onClick={() => { setStatus('idle'); setForm({ name: '', phone: '', email: '', company: '', enquiry_type: '', message: '' }); }} className="btn-outline mt-4">Send Another</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Send Us a Message</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Name *</label><input required className="input-field" value={form.name} onChange={e => setForm({...form, name: e.target.value})} /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label><input required type="tel" className="input-field" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} /></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Email</label><input type="email" className="input-field" value={form.email} onChange={e => setForm({...form, email: e.target.value})} /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Company</label><input className="input-field" value={form.company} onChange={e => setForm({...form, company: e.target.value})} /></div>
                  </div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Enquiry Type</label>
                    <select className="input-field" value={form.enquiry_type} onChange={e => setForm({...form, enquiry_type: e.target.value})}>
                      <option value="">Select type</option>
                      {ENQUIRY_TYPES.map(t => <option key={t}>{t}</option>)}
                    </select></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                    <textarea required rows={4} className="input-field" value={form.message} onChange={e => setForm({...form, message: e.target.value})} placeholder="Describe your requirement — product, quantity, application, specifications..." /></div>
                  <button type="submit" disabled={status === 'sending'} className="btn-primary disabled:opacity-50">
                    <Send size={16} className="mr-2" /> {status === 'sending' ? 'Sending...' : 'Send Enquiry'}
                  </button>
                  {status === 'error' && <p className="text-red-500 text-sm">Something went wrong. Please call us directly.</p>}
                </form>
              )}
            </div>

            <div className="space-y-6">
              <div className="card p-6">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><MapPin className="text-brand-500" size={20} /> Head Office</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{SITE.headOffice}</p>
              </div>
              <div className="card p-6">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><Factory className="text-brand-500" size={20} /> Manufacturing Unit</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{SITE.factory}</p>
              </div>
              <div className="card p-6">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><Phone className="text-brand-500" size={20} /> Phone</h3>
                <p className="text-sm text-gray-600"><a href={`tel:${SITE.phone}`} className="text-brand-500 font-medium">{SITE.phone}</a> / <a href={`tel:${SITE.phone2}`} className="text-brand-500">{SITE.phone2}</a></p>
              </div>
              <div className="card p-6">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><Mail className="text-brand-500" size={20} /> Email</h3>
                <p className="text-sm"><a href={`mailto:${SITE.email}`} className="text-brand-500 font-medium">{SITE.email}</a></p>
              </div>
              <div className="card p-6">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><Clock className="text-brand-500" size={20} /> Working Hours</h3>
                <p className="text-sm text-gray-600">Mon – Sat: 10:00 AM – 6:00 PM<br />Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
