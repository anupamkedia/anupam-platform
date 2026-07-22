'use client';
import { useState } from 'react';
import { SITE, ENQUIRY_TYPES } from '@/lib/constants';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, Factory } from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', company: '', phone: '', email: '', enquiry_type: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/enquiry', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      if (res.ok) { setStatus('sent'); setForm({ name: '', company: '', phone: '', email: '', enquiry_type: '', message: '' }); }
      else setStatus('error');
    } catch { setStatus('error'); }
  };

  return (
    <>
      <section className="gradient-brand text-white py-16 md:py-24">
        <div className="container-wide px-4">
          <p className="text-brand-200 text-sm font-medium mb-2 tracking-wider uppercase">Contact Us</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
          <p className="text-lg text-brand-200 max-w-2xl">Whether you need a product quotation, technical consultation, or want to become a dealer — we&apos;re here to help.</p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact info */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-brand-500 mb-6">Contact Information</h2>
              {[
                { icon: MapPin, title: 'Head Office', lines: [SITE.headOffice] },
                { icon: Factory, title: 'Manufacturing Plant', lines: [SITE.factory] },
                { icon: Phone, title: 'Phone', lines: [SITE.phone] },
                { icon: Mail, title: 'Email', lines: [SITE.email] },
                { icon: Clock, title: 'Working Hours', lines: ['Mon–Sat: 9:00 AM – 6:00 PM', 'Sunday: Closed'] },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-brand-50 text-brand-500 flex items-center justify-center shrink-0">
                    <item.icon size={20} />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">{item.title}</div>
                    {item.lines.map((line, j) => (
                      <div key={j} className="text-sm text-gray-600">{line}</div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Map placeholder */}
              <div className="bg-brand-50 rounded-xl p-8 text-center mt-6">
                <MapPin className="mx-auto text-brand-400 mb-2" size={32} />
                <p className="text-sm text-brand-500">[Google Map embed will be displayed here]</p>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <div className="card p-8">
                <h2 className="text-2xl font-bold text-brand-500 mb-6">Send Us a Message</h2>
                {status === 'sent' ? (
                  <div className="text-center py-12">
                    <CheckCircle className="mx-auto text-green-500 mb-4" size={48} />
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Thank You!</h3>
                    <p className="text-gray-600">Your enquiry has been received. Our team will contact you within 24 hours.</p>
                    <button onClick={() => setStatus('idle')} className="btn-outline mt-6">Send Another Message</button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                        <input type="text" required className="input-field" value={form.name}
                          onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your name" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                        <input type="text" className="input-field" value={form.company}
                          onChange={e => setForm({ ...form, company: e.target.value })} placeholder="Company name" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                        <input type="tel" required className="input-field" value={form.phone}
                          onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+91" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input type="email" className="input-field" value={form.email}
                          onChange={e => setForm({ ...form, email: e.target.value })} placeholder="your@email.com" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Enquiry Type *</label>
                      <select required className="input-field" value={form.enquiry_type}
                        onChange={e => setForm({ ...form, enquiry_type: e.target.value })}>
                        <option value="">Select type</option>
                        {ENQUIRY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                      <textarea required rows={5} className="input-field" value={form.message}
                        onChange={e => setForm({ ...form, message: e.target.value })}
                        placeholder="Describe your requirement — products needed, surface type, quantity, application details..." />
                    </div>
                    <button type="submit" disabled={status === 'sending'} className="btn-primary w-full md:w-auto">
                      {status === 'sending' ? 'Sending...' : <><Send size={18} className="mr-2" /> Send Enquiry</>}
                    </button>
                    {status === 'error' && <p className="text-red-500 text-sm">Something went wrong. Please try again or contact us directly.</p>}
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
