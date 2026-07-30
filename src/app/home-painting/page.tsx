'use client';
import { useState } from 'react';
import Link from 'next/link';
import { HOME_PAINTING_SERVICES, SITE } from '@/lib/constants';
import { Send, CheckCircle, Phone, Palette, Calculator, Eye, Star, ArrowRight, Shield } from 'lucide-react';

export default function HomePaintingPage() {
  const [form, setForm] = useState({ name: '', phone: '', city: '', rooms: '', service: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, phone: form.phone, company: form.city, email: '', enquiry_type: 'Home Painting Enquiry', message: `Service: ${form.service} | Rooms: ${form.rooms} | ${form.message}` }),
      });
      setStatus('done');
    } catch { setStatus('done'); }
  };

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 text-white py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-10 w-72 h-72 bg-yellow-300 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-300 rounded-full blur-3xl" />
        </div>
        <div className="container-wide px-4 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Transform Your Home<br /><span className="text-yellow-300">With Beautiful Colours</span>
            </h1>
            <p className="text-lg text-white/80 mb-8">Premium quality paints at affordable prices. Free colour consultation. Professional application support. Up to 15 years warranty.</p>
            <div className="flex flex-wrap gap-3">
              <a href="#enquiry" className="bg-yellow-400 text-gray-900 font-bold px-8 py-4 rounded-xl hover:bg-yellow-300 transition shadow-lg text-lg">Get Free Quote</a>
              <Link href="/color-visualizer" className="bg-white/20 backdrop-blur text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/30 transition border border-white/30">
                <Eye size={20} className="inline mr-2" /> Visualize Colours
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Brand logos strip */}
      <section className="bg-white py-6 border-b border-gray-100">
        <div className="container-wide px-4 flex items-center justify-center gap-8 overflow-x-auto">
          {['azura', 'asure', 'anex', 'atop', 'amaje', 'arest'].map(brand => (
            <img key={brand} src={`/img/logos/${brand}.${brand === 'asure' || brand === 'atop' || brand === 'amaje' ? 'png' : 'jpg'}`}
              alt={brand} className="h-10 md:h-14 w-auto opacity-80 hover:opacity-100 transition" />
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="section-title">Home Painting Services</h2>
            <p className="section-subtitle mx-auto">Everything you need for your home — from colour selection to final finish.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {HOME_PAINTING_SERVICES.map((service, i) => (
              <div key={i} className="card p-6 hover:border-purple-200 transition group">
                <div className="text-4xl mb-3">{service.icon}</div>
                <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition">{service.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us for home */}
      <section className="section-padding gradient-light">
        <div className="container-wide">
          <h2 className="section-title text-center mb-8">Why Choose Anupam Paints for Your Home?</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Shield, label: 'Up to 15 Years Warranty', desc: 'Performance warranty on our premium range' },
              { icon: Palette, label: 'Low VOC Paints', desc: 'Safe for your family — no harmful chemicals' },
              { icon: Star, label: '50+ Years Trust', desc: 'If Railways & Navy trust us, your home is in safe hands' },
              { icon: Calculator, label: '10-15% Cost Saving', desc: 'Premium quality at prices below national brands' },
            ].map((item, i) => (
              <div key={i} className="text-center p-4">
                <div className="w-14 h-14 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mx-auto mb-3"><item.icon size={28} /></div>
                <h3 className="font-bold text-gray-800 text-sm mb-1">{item.label}</h3>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <h2 className="section-title text-center mb-8">Plan Your Home Painting</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/color-visualizer" className="card p-8 text-center hover:border-purple-300 group">
              <Eye className="mx-auto text-purple-500 mb-3 group-hover:scale-110 transition" size={40} />
              <h3 className="font-bold text-gray-800 text-lg mb-2">AI Colour Visualizer</h3>
              <p className="text-sm text-gray-600">See how different colours look on your walls before painting.</p>
              <span className="text-purple-500 text-sm font-medium mt-3 inline-flex items-center gap-1">Try Now <ArrowRight size={14} /></span>
            </Link>
            <Link href="/shade-card" className="card p-8 text-center hover:border-purple-300 group">
              <Palette className="mx-auto text-purple-500 mb-3 group-hover:scale-110 transition" size={40} />
              <h3 className="font-bold text-gray-800 text-lg mb-2">Digital Shade Card</h3>
              <p className="text-sm text-gray-600">Browse our complete shade collection across all brands.</p>
              <span className="text-purple-500 text-sm font-medium mt-3 inline-flex items-center gap-1">Explore <ArrowRight size={14} /></span>
            </Link>
            <Link href="/calculator" className="card p-8 text-center hover:border-purple-300 group">
              <Calculator className="mx-auto text-purple-500 mb-3 group-hover:scale-110 transition" size={40} />
              <h3 className="font-bold text-gray-800 text-lg mb-2">Paint Calculator</h3>
              <p className="text-sm text-gray-600">Calculate exactly how much paint you need for your rooms.</p>
              <span className="text-purple-500 text-sm font-medium mt-3 inline-flex items-center gap-1">Calculate <ArrowRight size={14} /></span>
            </Link>
          </div>
        </div>
      </section>

      {/* Lead capture form */}
      <section id="enquiry" className="section-padding bg-gradient-to-br from-purple-600 to-blue-700 text-white">
        <div className="container-wide max-w-2xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Get a Free Painting Quote</h2>
            <p className="text-white/70">Tell us about your home — we'll call you with the best pricing.</p>
          </div>
          {status === 'done' ? (
            <div className="bg-white rounded-2xl p-8 text-center">
              <CheckCircle className="mx-auto text-green-500 mb-3" size={48} />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Thank You!</h3>
              <p className="text-gray-600">Our team will call you within 2 hours with a free quote.</p>
              <p className="text-sm text-gray-400 mt-2">Or call us directly: <a href="tel:03322651204" className="text-purple-600 font-medium">033-22651204</a></p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 md:p-8 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Your Name *</label>
                  <input required className="input-field" value={form.name} onChange={e => setForm({...form, name: e.target.value})} /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                  <input required type="tel" className="input-field" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="+91" /></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input className="input-field" value={form.city} onChange={e => setForm({...form, city: e.target.value})} /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Number of Rooms</label>
                  <select className="input-field" value={form.rooms} onChange={e => setForm({...form, rooms: e.target.value})}>
                    <option value="">Select</option><option>1 BHK</option><option>2 BHK</option><option>3 BHK</option><option>4+ BHK</option><option>Villa / Independent House</option><option>Commercial Space</option>
                  </select></div>
              </div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Service Needed</label>
                <select className="input-field" value={form.service} onChange={e => setForm({...form, service: e.target.value})}>
                  <option value="">Select service</option><option>Interior Painting</option><option>Exterior Painting</option><option>Both Interior & Exterior</option><option>Waterproofing</option><option>Texture / Designer Walls</option><option>Wood & Metal Painting</option><option>Complete Home Painting</option>
                </select></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Any Specific Requirement?</label>
                <textarea className="input-field" rows={2} value={form.message} onChange={e => setForm({...form, message: e.target.value})} placeholder="Budget, preferred brand, timeline..." /></div>
              <button type="submit" disabled={status === 'sending'} className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-4 rounded-xl hover:from-purple-700 hover:to-blue-700 transition text-lg disabled:opacity-50">
                {status === 'sending' ? 'Sending...' : <><Phone size={20} className="inline mr-2" /> Get Free Quote</>}
              </button>
              <p className="text-xs text-gray-400 text-center">Or call directly: <a href="tel:03322651204" className="text-purple-600">033-22651204</a></p>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
