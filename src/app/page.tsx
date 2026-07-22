'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { SITE, STATS, WHY_ANUPAM, DIVISIONS_DATA } from '@/lib/constants';
import { createClient } from '@supabase/supabase-js';
import { ArrowRight, Shield, CheckCircle, Factory, FlaskConical, Award, Truck, ChevronRight } from 'lucide-react';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export default function HomePage() {
  const [divisions, setDivisions] = useState<any[]>([]);
  const [approvals, setApprovals] = useState<any[]>([]);

  useEffect(() => {
    supabase.from('product_divisions').select('*').eq('is_active', true).order('sort_order').then(r => setDivisions(r.data || []));
    supabase.from('approvals').select('*').eq('is_active', true).order('sort_order').limit(12).then(r => setApprovals(r.data || []));
  }, []);

  const displayDivisions = divisions.length > 0 ? divisions : DIVISIONS_DATA;

  return (
    <>
      {/* HERO */}
      <section className="relative bg-gradient-to-br from-brand-500 via-brand-600 to-brand-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent-400/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        </div>
        <div className="container-wide px-4 py-20 md:py-32 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white/90 px-4 py-2 rounded-full text-sm mb-6">
              <Award size={16} /> Trusted Since 1972 — ISO 9001 | ISO 14001 | ISO 45001
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Engineering Coatings.<br /><span className="text-brand-200">Protecting Assets.</span><br />Beautifying Spaces.
            </h1>
            <p className="text-lg md:text-xl text-brand-200 mb-8 max-w-2xl leading-relaxed">
              India&apos;s trusted manufacturer of decorative, industrial, marine, railway, and specialty coatings. 50+ years of manufacturing excellence. Government and institutional approvals.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/products" className="bg-white text-brand-500 font-semibold px-6 py-3.5 rounded-lg hover:bg-gray-100 transition shadow-lg flex items-center gap-2">Explore Products <ArrowRight size={18} /></Link>
              <Link href="/contact" className="btn-accent !shadow-lg">Request a Quote</Link>
              <Link href="/dealers" className="border-2 border-white/40 text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/10 transition">Find a Dealer</Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* STATS */}
      <section className="bg-white py-12 -mt-4 relative z-10">
        <div className="container-wide px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-brand-500 mb-1">{stat.value}<span className="text-accent-400">{stat.suffix}</span></div>
                <div className="text-sm text-steel-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCT DIVISIONS */}
      <section className="section-padding gradient-light">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="section-title">Our Product Divisions</h2>
            <p className="section-subtitle mx-auto">Comprehensive coating solutions from decorative interiors to high-performance industrial protection.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayDivisions.map((div: any, i: number) => {
              const divData = DIVISIONS_DATA.find(d => d.slug === div.slug);
              return (
                <Link key={div.slug || i} href={`/products/${div.slug}`} className="card card-hover group p-6">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${divData?.color || 'from-brand-400 to-brand-600'} flex items-center justify-center mb-4 group-hover:scale-110 transition`}>
                    <Factory className="text-white" size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-1">{div.name}</h3>
                  <p className="text-sm text-accent-400 font-medium mb-2">{div.tagline || divData?.tagline}</p>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{div.description || divData?.desc}</p>
                  <span className="text-brand-500 font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">Explore Range <ChevronRight size={16} /></span>
                </Link>
              );
            })}
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

      {/* SOLUTIONS */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="section-title">Coating Solutions by Industry</h2>
            <p className="section-subtitle mx-auto">Pre-engineered coating systems for your specific application.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[{ label: 'Structural Steel', slug: 'structural-steel', icon: '🏗️' },{ label: 'Railways', slug: 'railway-systems', icon: '🚂' },{ label: 'Marine & Ships', slug: 'marine-systems', icon: '🚢' },{ label: 'Industrial Flooring', slug: 'industrial-flooring', icon: '🏭' },{ label: 'Roof Waterproofing', slug: 'roof-waterproofing', icon: '🏠' },{ label: 'Fire Protection', slug: 'fire-protection', icon: '🔥' },{ label: 'Oil & Gas', slug: 'oil-gas', icon: '⛽' },{ label: 'Potable Water Tanks', slug: 'potable-water', icon: '💧' }].map((sol) => (
              <Link key={sol.slug} href={`/solutions/${sol.slug}`} className="card p-4 text-center hover:bg-brand-50 group">
                <div className="text-3xl mb-2">{sol.icon}</div>
                <div className="font-medium text-sm text-gray-800 group-hover:text-brand-500 transition">{sol.label}</div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8"><Link href="/solutions" className="btn-primary">View All Solutions</Link></div>
        </div>
      </section>

      {/* FACTORY */}
      <section className="section-padding bg-brand-500 text-white">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">World-Class Manufacturing Infrastructure</h2>
              <p className="text-brand-200 text-lg mb-6 leading-relaxed">Our 5-acre facility at Ranihati, Howrah houses modern paint manufacturing equipment, an in-house alkyd resin plant, and NABL-compliant quality testing laboratory.</p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[{ icon: Factory, label: '5-Acre Manufacturing Plant' },{ icon: FlaskConical, label: 'In-House Resin Plant' },{ icon: Shield, label: 'NABL-Compliant QC Lab' },{ icon: Truck, label: 'Pan-India Dispatch' }].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white/10 rounded-lg p-3"><item.icon size={20} className="text-brand-200" /><span className="text-sm font-medium">{item.label}</span></div>
                ))}
              </div>
              <Link href="/infrastructure" className="bg-white text-brand-500 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition inline-flex items-center gap-2">View Infrastructure <ArrowRight size={18} /></Link>
            </div>
            <div className="bg-white/10 rounded-2xl p-8 text-center">
              <div className="text-6xl mb-4">🏭</div>
              <p className="text-brand-200 text-sm">[Factory photographs will be displayed here]</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-brand-50 via-white to-blue-50 py-16">
        <div className="container-wide px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-500 mb-4">Let&apos;s Discuss Your Coating Requirements</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">Whether you need decorative paints for a residential project or high-performance coatings for industrial infrastructure — our technical team is ready to help.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn-primary text-lg px-8 py-4">Request a Quote</Link>
            <Link href="/technical-library" className="btn-outline text-lg px-8 py-4">Download TDS</Link>
            <Link href="/dealers" className="btn-outline text-lg px-8 py-4">Find a Dealer</Link>
          </div>
        </div>
      </section>
    </>
  );
}
