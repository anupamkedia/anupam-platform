'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { SITE, STATS, WHY_ANUPAM, DIVISIONS_DATA, HOME_PAINTING_SERVICES } from '@/lib/constants';
import { createClient } from '@supabase/supabase-js';
import { ArrowRight, Shield, CheckCircle, Factory, FlaskConical, Award, Truck, ChevronRight, Eye, Palette, Calculator, Phone } from 'lucide-react';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

const heroImages = [
  'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80',
  'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1920&q=80',
  'https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?w=1920&q=80',
];

const divisionImages: Record<string, string> = {
  decorative: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=600&q=80',
  industrial: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?w=600&q=80',
  marine: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80',
  railway: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=600&q=80',
  specialty: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80',
};

export default function HomePage() {
  const [approvals, setApprovals] = useState<any[]>([]);
  const [heroIdx, setHeroIdx] = useState(0);

  useEffect(() => {
    supabase.from('approvals').select('*').eq('is_active', true).order('sort_order').limit(12).then(r => setApprovals(r.data || []));
    const interval = setInterval(() => setHeroIdx(i => (i + 1) % heroImages.length), 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* HERO with rotating background */}
      <section className="relative text-white overflow-hidden min-h-[85vh] flex items-center">
        {heroImages.map((img, i) => (
          <div key={i} className={`absolute inset-0 transition-opacity duration-1000 ${i === heroIdx ? 'opacity-100' : 'opacity-0'}`}>
            <img src={img} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-500/90 via-brand-600/80 to-brand-800/70" />
          </div>
        ))}
        <div className="container-wide px-4 py-20 md:py-32 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white/90 px-4 py-2 rounded-full text-sm mb-6">
              <Award size={16} /> Trusted Since 1972 — ISO 9001 | ISO 14001 | ISO 45001
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Engineering Coatings.<br /><span className="text-yellow-300">Protecting Assets.</span><br />Beautifying Spaces.
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl leading-relaxed">
              India&apos;s trusted manufacturer of decorative, industrial, marine, railway, and specialty coatings. 50+ years of manufacturing excellence. Government approved.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/products" className="bg-white text-brand-500 font-semibold px-7 py-3.5 rounded-lg hover:bg-gray-100 transition shadow-lg flex items-center gap-2">Explore Products <ArrowRight size={18} /></Link>
              <Link href="/contact" className="bg-yellow-400 text-gray-900 font-bold px-7 py-3.5 rounded-lg hover:bg-yellow-300 transition shadow-lg">Request a Quote</Link>
              <Link href="/home-painting" className="border-2 border-white/40 text-white font-semibold px-7 py-3 rounded-lg hover:bg-white/10 transition">Home Painting</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Brand logos strip */}
      <section className="bg-white py-6 border-b border-gray-100">
        <div className="container-wide px-4 flex items-center justify-center gap-6 md:gap-10 overflow-x-auto">
          {['azura', 'asure', 'anex', 'atop', 'amaje', 'arest'].map(brand => (
            <img key={brand} src={`/img/logos/${brand}.${brand === 'asure' || brand === 'atop' || brand === 'amaje' ? 'png' : 'jpg'}`}
              alt={brand} className="h-8 md:h-12 w-auto opacity-70 hover:opacity-100 transition" />
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="bg-brand-500 text-white py-10">
        <div className="container-wide px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-1">{stat.value}<span className="text-yellow-300">{stat.suffix}</span></div>
                <div className="text-sm text-brand-200 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCT DIVISIONS with images */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="section-title">Our Product Divisions</h2>
            <p className="section-subtitle mx-auto">Comprehensive coating solutions from decorative interiors to high-performance industrial protection.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DIVISIONS_DATA.map((div, i) => (
              <Link key={div.slug} href={`/products/${div.slug}`} className="card card-hover group overflow-hidden">
                <div className="h-48 overflow-hidden relative">
                  <img src={divisionImages[div.slug]} alt={div.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className={`absolute inset-0 bg-gradient-to-t ${div.color} opacity-60`} />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="text-xs font-medium opacity-80">{div.tagline}</div>
                    <h3 className="text-xl font-bold">{div.name}</h3>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-sm text-gray-600 leading-relaxed mb-3">{div.desc}</p>
                  <span className="text-brand-500 font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">Explore Range <ChevronRight size={16} /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* HOME PAINTING - Lead gen for homeowners */}
      <section className="section-padding bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
        <div className="container-wide">
          <div className="text-center mb-10">
            <span className="badge bg-purple-100 text-purple-600 text-sm mb-3 inline-block">For Homeowners</span>
            <h2 className="section-title">Planning to Paint Your Home?</h2>
            <p className="section-subtitle mx-auto">Premium paints at 10-15% less than national brands. Free colour consultation. Up to 15 years warranty.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {HOME_PAINTING_SERVICES.map((s, i) => (
              <div key={i} className="bg-white rounded-xl p-4 text-center hover:shadow-lg transition group cursor-pointer">
                <div className="text-3xl mb-2">{s.icon}</div>
                <h3 className="text-sm font-bold text-gray-800 group-hover:text-purple-600 transition">{s.title}</h3>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/home-painting" className="bg-purple-600 text-white font-semibold px-8 py-3.5 rounded-lg hover:bg-purple-700 transition shadow-lg flex items-center gap-2"><Phone size={18} /> Get Free Quote</Link>
            <Link href="/color-visualizer" className="bg-white text-purple-600 font-semibold px-8 py-3.5 rounded-lg hover:bg-purple-50 transition border border-purple-200 flex items-center gap-2"><Eye size={18} /> AI Colour Visualizer</Link>
            <Link href="/calculator" className="bg-white text-purple-600 font-semibold px-8 py-3.5 rounded-lg hover:bg-purple-50 transition border border-purple-200 flex items-center gap-2"><Calculator size={18} /> Paint Calculator</Link>
          </div>
        </div>
      </section>

      {/* WHY ANUPAM */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="section-title">Why Anupam Paints</h2>
            <p className="section-subtitle mx-auto">What sets us apart from other coating manufacturers in India.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_ANUPAM.map((item, i) => (
              <div key={i} className="p-6 rounded-xl border border-gray-100 hover:border-brand-200 hover:shadow-lg transition-all group">
                <div className="w-10 h-10 rounded-lg bg-brand-50 text-brand-500 flex items-center justify-center mb-3 group-hover:bg-brand-500 group-hover:text-white transition"><CheckCircle size={20} /></div>
                <h3 className="font-bold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* APPROVALS */}
      <section className="section-padding gradient-light">
        <div className="container-wide">
          <div className="text-center mb-10">
            <h2 className="section-title">Approvals & Certifications</h2>
            <p className="section-subtitle mx-auto">Trusted and approved by India&apos;s most demanding institutions.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {approvals.map((a: any) => (
              <div key={a.id} className="bg-white rounded-xl shadow-sm border border-gray-100 px-5 py-4 flex items-center gap-3 hover:shadow-md transition min-w-[180px]">
                <Shield size={24} className="text-brand-500 shrink-0" />
                <div><div className="font-semibold text-sm text-gray-800">{a.name}</div><div className="text-xs text-steel-400">{a.category}</div></div>
              </div>
            ))}
          </div>
          <div className="text-center"><Link href="/approvals" className="btn-outline">View All Approvals</Link></div>
        </div>
      </section>

      {/* FACTORY with real image */}
      <section className="relative text-white overflow-hidden">
        <img src="https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=1920&q=80" alt="Factory" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-brand-500/85" />
        <div className="container-wide px-4 py-20 md:py-28 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">World-Class Manufacturing Infrastructure</h2>
              <p className="text-brand-200 text-lg mb-6 leading-relaxed">Our 5-acre facility at Ranihati, Howrah houses modern paint manufacturing equipment, an in-house alkyd resin plant, and NABL-compliant quality testing laboratory.</p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[{ icon: Factory, label: '5-Acre Manufacturing Plant' },{ icon: FlaskConical, label: 'In-House Alkyd Resin Plant' },{ icon: Shield, label: 'NABL-Compliant QC Lab' },{ icon: Truck, label: 'Pan-India Dispatch' }].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white/10 rounded-lg p-3"><item.icon size={20} className="text-yellow-300" /><span className="text-sm font-medium">{item.label}</span></div>
                ))}
              </div>
              <Link href="/infrastructure" className="bg-white text-brand-500 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition inline-flex items-center gap-2">View Infrastructure <ArrowRight size={18} /></Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&q=80" alt="Lab" className="rounded-xl shadow-2xl w-full h-48 object-cover" />
              <img src="https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=400&q=80" alt="Factory" className="rounded-xl shadow-2xl w-full h-48 object-cover mt-8" />
            </div>
          </div>
        </div>
      </section>

      {/* SOLUTIONS */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="section-title">Coating Solutions by Industry</h2>
            <p className="section-subtitle mx-auto">Pre-engineered coating systems for your specific application.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[{ label: 'Structural Steel', slug: 'structural-steel', icon: '🏗️' },{ label: 'Railways', slug: 'railway-systems', icon: '🚂' },{ label: 'Marine & Ships', slug: 'marine-systems', icon: '🚢' },{ label: 'Industrial Flooring', slug: 'industrial-flooring', icon: '🏭' },{ label: 'Roof Waterproofing', slug: 'roof-waterproofing', icon: '🏠' },{ label: 'Fire Protection', slug: 'fire-protection', icon: '🔥' },{ label: 'Oil & Gas', slug: 'oil-gas', icon: '⛽' },{ label: 'Potable Water Tanks', slug: 'potable-water', icon: '💧' }].map((sol) => (
              <Link key={sol.slug} href={`/solutions/${sol.slug}`} className="card p-5 text-center hover:bg-brand-50 group hover:shadow-lg transition">
                <div className="text-3xl mb-2">{sol.icon}</div>
                <div className="font-medium text-sm text-gray-800 group-hover:text-brand-500 transition">{sol.label}</div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8"><Link href="/solutions" className="btn-primary">View All Solutions</Link></div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <img src="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=1920&q=80" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-500/90 to-purple-600/90" />
        <div className="container-wide px-4 py-16 relative z-10 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Let&apos;s Discuss Your Coating Requirements</h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">Whether you need decorative paints for a residential project or high-performance coatings for industrial infrastructure — our technical team is ready to help.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="bg-white text-brand-500 font-bold text-lg px-8 py-4 rounded-xl hover:bg-gray-100 transition shadow-lg">Request a Quote</Link>
            <Link href="/technical-library" className="border-2 border-white text-white font-semibold text-lg px-8 py-4 rounded-xl hover:bg-white/10 transition">Download TDS</Link>
            <Link href="/portals" className="border-2 border-white/50 text-white font-semibold text-lg px-8 py-4 rounded-xl hover:bg-white/10 transition">Portal Login</Link>
          </div>
        </div>
      </section>
    </>
  );
}
