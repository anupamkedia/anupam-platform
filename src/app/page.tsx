'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { SITE, STATS, WHY_ANUPAM, DIVISIONS_DATA } from '@/lib/constants';
import { createClient } from '@supabase/supabase-js';
import { ArrowRight, Shield, ChevronRight, Layers, Droplets, Flame, Factory as FactoryIcon, FlaskConical, Truck } from 'lucide-react';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export default function HomePage() {
  const [approvals, setApprovals] = useState<any[]>([]);
  useEffect(() => {
    supabase.from('approvals').select('*').eq('is_active', true).order('sort_order').limit(12).then(r => setApprovals(r.data || []));
  }, []);

  return (
    <>
      {/* HERO — Clean, authoritative, single focus */}
      <section className="relative bg-[var(--color-navy)] text-white overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1920&q=80" alt="" className="w-full h-full object-cover opacity-20" />
        </div>
        <div className="container-wide py-24 md:py-32 lg:py-40 relative z-10">
          <div className="max-w-3xl">
            <div className="section-divider !bg-[var(--color-red)] !mb-8" />
            <h1 className="text-hero text-white mb-6">
              Coating India&apos;s Infrastructure.<br />
              Protecting Industry.<br />
              Transforming Spaces.
            </h1>
            <p className="text-lg text-white/60 mb-10 max-w-xl leading-relaxed" style={{fontFamily:'var(--font-body)'}}>
              Since 1972, Anupam Paints has engineered decorative, industrial and specialty coating systems for homes, railways, marine assets, infrastructure and demanding industrial environments.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/solutions" className="btn-primary !bg-[var(--color-red)] text-lg !px-8 !py-4">Explore Solutions</Link>
              <Link href="/contact" className="btn-white text-lg !px-8 !py-4">Talk to a Specialist</Link>
            </div>
          </div>
        </div>
        {/* Trust strip */}
        <div className="border-t border-white/10 py-4 relative z-10">
          <div className="container-wide flex flex-wrap items-center justify-between gap-4 text-sm text-white/50">
            <span>Est. <strong className="text-white/80">1972</strong></span>
            <span className="hidden md:inline">·</span>
            <span><strong className="text-white/80">1000 KL</strong>/Month Capacity</span>
            <span className="hidden md:inline">·</span>
            <span><strong className="text-white/80">5-Acre</strong> Manufacturing Plant</span>
            <span className="hidden md:inline">·</span>
            <span>ISO <strong className="text-white/80">9001 | 14001 | 45001</strong></span>
            <span className="hidden md:inline">·</span>
            <span><strong className="text-white/80">RDSO | Navy | EIL</strong> Approved</span>
          </div>
        </div>
      </section>

      {/* THREE DIVISIONS — Visual, distinct */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="text-label mb-2">Our Coating Divisions</div>
          <div className="section-divider" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-[var(--color-border)]">
            {[
              { name: 'Decorative Coatings', slug: 'decorative', accent: 'var(--accent-decorative)',
                img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80',
                desc: 'Premium interior and exterior paints, waterproofing, textures, and wood finishes under AZURA, ASURE, ANEX, ATOP, AMAJE, and AREST brands.',
                subs: ['Interior Emulsions', 'Exterior Emulsions', 'Primers', 'Waterproofing', 'Enamels', 'Textures'] },
              { name: 'Industrial Protective', slug: 'industrial', accent: 'var(--accent-industrial)',
                img: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80',
                desc: 'High-performance anti-corrosion systems enhanced with Carbon Nano-Struct Technology for structural steel, pipelines, tanks, and process equipment.',
                subs: ['Epoxy Systems', 'PU Coatings', 'Zinc-Rich Primers', 'Heat Resistant', 'Chemical Resistant', 'Tank Linings'] },
              { name: 'Specialty & Defence', slug: 'specialty', accent: 'var(--accent-specialty)',
                img: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&q=80',
                desc: 'Marine, railway, fire protection, flooring, and advanced coatings for India\'s most demanding institutional and defence applications.',
                subs: ['Marine & Navy', 'Railway (RDSO)', 'Fire Protection', 'Flooring', 'Polyurea', 'Glass Coating'] },
            ].map((div) => (
              <div key={div.slug} className="bg-white p-8 md:p-10 group">
                <div className="w-full h-48 mb-6 overflow-hidden" style={{borderRadius: 'var(--radius-md)'}}>
                  <img src={div.img} alt={div.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="w-8 h-1 mb-4" style={{background: div.accent}} />
                <h3 className="text-section-heading mb-3">{div.name}</h3>
                <p className="text-caption leading-relaxed mb-4">{div.desc}</p>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {div.subs.map(s => <span key={s} className="badge bg-gray-100 text-gray-600 text-xs">{s}</span>)}
                </div>
                <Link href={`/products/${div.slug}`} className="text-sm font-semibold text-[var(--color-navy)] flex items-center gap-1 group-hover:gap-2 transition-all">
                  Explore Range <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTION FINDER — Interactive */}
      <section className="section-padding" style={{background: 'var(--color-warm-white)'}}>
        <div className="container-wide">
          <div className="text-center mb-10">
            <div className="text-label mb-2">Find Your Solution</div>
            <h2 className="text-page-title mb-3">What are you trying to protect?</h2>
            <p className="text-caption max-w-xl mx-auto">Select your asset type — we will recommend the right coating system with products, specifications, and expected performance.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {[
              { label: 'Structural Steel', slug: 'structural-steel', icon: '🏗️' },
              { label: 'Railway Asset', slug: 'railway-coaches', icon: '🚂' },
              { label: 'Marine Vessel', slug: 'marine-hull', icon: '🚢' },
              { label: 'Interior Walls', slug: 'real-estate', icon: '🏠' },
              { label: 'Exterior Walls', slug: 'real-estate', icon: '🏢' },
              { label: 'Roof', slug: 'real-estate', icon: '🏘️' },
              { label: 'Floor', slug: 'industrial-flooring', icon: '🏭' },
              { label: 'Tank', slug: 'tank-lining', icon: '💧' },
              { label: 'Pipeline', slug: 'oil-gas', icon: '⛽' },
              { label: 'Fire Protection', slug: 'fire-protection', icon: '🔥' },
            ].map((item) => (
              <Link key={item.label} href={`/solutions/${item.slug}`}
                className="card card-hover p-5 text-center group">
                <div className="text-3xl mb-2">{item.icon}</div>
                <div className="text-sm font-medium text-[var(--color-graphite)] group-hover:text-[var(--color-navy)]">{item.label}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CREDIBILITY — Data strip */}
      <section className="bg-[var(--color-navy)] text-white py-16">
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-center">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <div className="text-data text-white">{stat.value}<span className="text-[var(--color-red)]">{stat.suffix}</span></div>
                <div className="text-xs text-white/40 mt-1 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TECHNOLOGIES — Editorial */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-label mb-2">Technology</div>
              <div className="section-divider" />
              <h2 className="text-page-title mb-6">Carbon Nano-Struct Technology</h2>
              <p className="text-body text-[var(--color-steel)] mb-6">Our industrial and specialty coatings are enhanced with Carbon Nano-Struct Technology — delivering superior adhesion, chemical resistance, and extended service life. For coatings that outperform and outlast.</p>
              <div className="space-y-4">
                {['Superior barrier properties through nano-reinforcement', 'Extended corrosion protection in aggressive environments', 'Improved mechanical strength and abrasion resistance', 'Validated through 1000+ hour salt spray testing'].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-red)] mt-2 shrink-0" />
                    <span className="text-sm text-[var(--color-graphite)]">{item}</span>
                  </div>
                ))}
              </div>
              <Link href="/infrastructure" className="btn-outline mt-8">Learn About Our R&D</Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&q=80" alt="Lab" className="w-full h-52 object-cover" style={{borderRadius:'var(--radius-lg)'}} />
              <img src="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&q=80" alt="Testing" className="w-full h-52 object-cover mt-8" style={{borderRadius:'var(--radius-lg)'}} />
            </div>
          </div>
        </div>
      </section>

      {/* APPROVALS */}
      <section className="section-padding" style={{background: 'var(--color-warm-white)'}}>
        <div className="container-wide">
          <div className="text-label mb-2">Trust & Compliance</div>
          <div className="section-divider" />
          <h2 className="text-section-heading mb-8">Approvals & Certifications</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {approvals.map((a: any) => (
              <div key={a.id} className="card p-4 flex items-center gap-3">
                <Shield size={18} className="text-[var(--color-navy)] shrink-0" />
                <div>
                  <div className="text-sm font-semibold text-[var(--color-graphite)]">{a.name}</div>
                  <div className="text-xs text-[var(--color-steel)]">{a.category}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6"><Link href="/approvals" className="btn-ghost">View All Approvals <ArrowRight size={14} /></Link></div>
        </div>
      </section>

      {/* WHY ANUPAM — Proof-based */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="text-label mb-2">Why Anupam Paints</div>
          <div className="section-divider" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_ANUPAM.slice(0, 8).map((item, i) => (
              <div key={i} className="py-4 border-t-2 border-[var(--color-border)]">
                <h3 className="text-card-heading text-[var(--color-navy)] mb-2">{item.title}</h3>
                <p className="text-sm text-[var(--color-steel)] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MANUFACTURING — Full bleed editorial */}
      <section className="relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
          <div className="bg-[var(--color-navy)] p-10 md:p-16 flex flex-col justify-center">
            <div className="text-label text-white/40 mb-2">Manufacturing</div>
            <div className="w-12 h-1 bg-[var(--color-red)] mb-6" />
            <h2 className="text-page-title text-white mb-6">World-Class Facility</h2>
            <p className="text-white/50 leading-relaxed mb-8">5-acre semi-automatic plant at Ranihati, Howrah. In-house alkyd resin manufacturing. NABL-compliant QC laboratory with salt spray, QUV weathering, and spectrophotometer testing.</p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[{ icon: FactoryIcon, label: '1000 KL/Month' },{ icon: FlaskConical, label: 'In-House Resin Plant' },{ icon: Shield, label: 'NABL QC Lab' },{ icon: Truck, label: 'Pan-India Delivery' }].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-white/60 text-sm"><item.icon size={16} className="text-[var(--color-red)]" />{item.label}</div>
              ))}
            </div>
            <Link href="/infrastructure" className="btn-white w-fit">View Infrastructure <ArrowRight size={16} /></Link>
          </div>
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=960&q=80" alt="Anupam Paints Factory" className="w-full h-full object-cover min-h-[400px]" />
          </div>
        </div>
      </section>

      {/* HOME PAINTING — Clean, not garish */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-label mb-2" style={{color:'var(--accent-decorative)'}}>For Homeowners</div>
              <div className="w-12 h-1 mb-6" style={{background:'var(--accent-decorative)'}} />
              <h2 className="text-page-title mb-4">Beautiful Homes Begin With The Right Paint</h2>
              <p className="text-body text-[var(--color-steel)] mb-6">Premium quality decorative paints at 10–15% less than national brands. Six brand tiers from luxury to economy. Free colour consultation. Up to 15 years warranty.</p>
              <div className="space-y-3 mb-8">
                {['Interior & exterior painting', 'Waterproofing & cool roof', 'Texture & designer finishes', 'Wood & metal coatings', 'Free colour consultation'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm"><div className="w-1.5 h-1.5 rounded-full" style={{background:'var(--accent-decorative)'}} />{item}</div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/home-painting" className="btn-primary">Get Free Quote</Link>
                <Link href="/color-visualizer" className="btn-outline">Colour Visualizer</Link>
              </div>
            </div>
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80" alt="Beautiful interior" className="w-full h-80 object-cover" style={{borderRadius:'var(--radius-lg)'}} />
              <div className="absolute -bottom-4 -left-4 flex gap-1.5">
                {['#C4122F', '#0F1B2D', '#D97706', '#0891B2', '#4338CA', '#059669'].map(c => (
                  <div key={c} className="w-8 h-8 shadow-md" style={{background:c, borderRadius:'var(--radius-sm)'}} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA — Clean, authoritative */}
      <section className="bg-[var(--color-navy)] py-20">
        <div className="container-wide text-center">
          <div className="w-12 h-1 bg-[var(--color-red)] mx-auto mb-8" />
          <h2 className="text-page-title text-white mb-4">Let&apos;s discuss your coating requirements</h2>
          <p className="text-white/40 mb-10 max-w-xl mx-auto">Our technical team will prepare a detailed specification and competitive quotation for your project.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn-primary !bg-[var(--color-red)] text-lg !px-10 !py-4">Request a Quote</Link>
            <a href="tel:03322651204" className="btn-white text-lg !px-10 !py-4">Call: 033-2265 1204</a>
          </div>
        </div>
      </section>
    </>
  );
}
