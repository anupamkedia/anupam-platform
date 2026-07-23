'use client';
import { useState } from 'react';
import { SITE, ENQUIRY_TYPES } from '@/lib/constants';
import { MapPin, Phone, Mail, Globe, Clock, Send, CheckCircle, Factory } from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', enquiry_type: '', message: '' });
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
      <section className="relative text-white overflow-hidden">
        <img src="https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=1920&q=80" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-brand-500/85" />
        <div className="container-wide px-4 py-16 md:py-24 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
          <p className="text-lg text-brand-200 max-w-2xl">Whether it&apos;s a technical query, quotation request, or dealer enquiry — our team is ready to help.</p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="bg-brand-50 rounded-xl p-6">
                <h3 className="font-bold text-brand-500 mb-4 flex items-center gap-2"><MapPin size={20} /> Head Office</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{SITE.headOffice}</p>
              </div>
              <div className="bg-brand-50 rounded-xl p-6">
                <h3 className="font-bold text-brand-500 mb-4 flex items-center gap-2"><Factory size={20} /> Factory</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{SITE.factory}</p>
              </div>
              <div className="bg-brand-50 rounded-xl p-6">
                <h3 className="font-bold text-brand-500 mb-4 flex items-center gap-2"><Phone size={20} /> Phone</h3>
                <p className="text-gray-700 text-sm">{SITE.phone}</p>
                <p className="text-gray-700 text-sm">{SITE.phone2}</p>
              </div>
              <div className="bg-brand-50 rounded-xl p-6">
                <h3 className="font-bold text-brand-500 mb-4 flex items-center gap-2"><Mail size={20} /> Email</h3>
                <a href={`mailto:${SITE.email}`} className="text-brand-500 text-sm font-medium">{SITE.email}</a>
              </div>
              <div className="bg-brand-50 rounded-xl p-6">
                <h3 className="font-bold text-brand-500 mb-4 flex items-center gap-2"><Clock size={20} /> Office Hours</h3>
                <p className="text-gray-700 text-sm">Monday – Saturday: 10:00 AM – 6:00 PM</p>
                <p className="text-gray-500 text-xs mt-1">Sunday & Public Holidays: Closed</p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Send Us an Enquiry</h2>
                {status === 'done' ? (
                  <div className="text-center py-12">
                    <CheckCircle className="mx-auto text-green-500 mb-4" size={56} />
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Enquiry Received!</h3>
                    <p className="text-gray-600 mb-2">Our team will respond within 24 hours.</p>
                    <p className="text-sm text-gray-400">Or call us directly: <a href={`tel:${SITE.phone.replace(/-/g,'')}`} className="text-brand-500 font-medium">{SITE.phone}</a></p>
                    <button onClick={() => { setStatus('idle'); setForm({ name: '', email: '', phone: '', company: '', enquiry_type: '', message: '' }); }} className="btn-outline mt-6">Send Another Enquiry</button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div><label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label><input required className="input-field" value={form.name} onChange={e => setForm({...form, name: e.target.value})} /></div>
                      <div><label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label><input required type="tel" className="input-field" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} /></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div><label className="block text-sm font-medium text-gray-700 mb-1">Email</label><input type="email" className="input-field" value={form.email} onChange={e => setForm({...form, email: e.target.value})} /></div>
                      <div><label className="block text-sm font-medium text-gray-700 mb-1">Company</label><input className="input-field" value={form.company} onChange={e => setForm({...form, company: e.target.value})} /></div>
                    </div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Enquiry Type *</label>
                      <select required className="input-field" value={form.enquiry_type} onChange={e => setForm({...form, enquiry_type: e.target.value})}>
                        <option value="">Select type</option>
                        {ENQUIRY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                      </select></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                      <textarea required rows={4} className="input-field" value={form.message} onChange={e => setForm({...form, message: e.target.value})} placeholder="Tell us about your requirement..." /></div>
                    <button type="submit" disabled={status === 'sending'} className="btn-primary w-full !py-4 text-lg disabled:opacity-50">
                      <Send size={18} className="mr-2" /> {status === 'sending' ? 'Sending...' : 'Send Enquiry'}
                    </button>
                    {status === 'error' && <p className="text-red-500 text-sm text-center">Something went wrong. Please try again or call us directly.</p>}
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
