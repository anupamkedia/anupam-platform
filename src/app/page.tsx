'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { SITE, STATS, WHY_ANUPAM, CHAIRMAN_MESSAGE } from '@/lib/constants';
import { createClient } from '@supabase/supabase-js';
import { ArrowRight, ChevronRight, Shield, Phone, Mail, Upload, MessageSquare } from 'lucide-react';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

const heroSlides: any[] = [];

const scaleData = [
  { value: '1972', label: 'Established' },
  { value: '5 Acres', label: 'Manufacturing Campus' },
  { value: '~1000 KL', label: 'Monthly Capacity' },
  { value: 'In-House', label: 'Resin Manufacturing' },
  { value: 'Decorative \u2192 Defence', label: 'Integrated Portfolio' },
  { value: 'Pan India', label: 'Supply & Application' },
];

const processSteps = [
  { num: '01', title: 'Raw Materials', desc: 'Controlled sourcing and incoming quality checks on every batch.' },
  { num: '02', title: 'In-House Resin', desc: 'Alkyd resin manufacturing for tighter formulation control.' },
  { num: '03', title: 'Dispersion & Mixing', desc: 'High-speed dispersers, ball mills, and dyno mills for precise manufacturing.' },
  { num: '04', title: 'Quality Control', desc: 'Raw material, in-process and finished-product testing at every stage.' },
  { num: '05', title: 'Performance Testing', desc: 'Salt spray, QUV weathering, wet scrub, spectrophotometry and adhesion testing.' },
  { num: '06', title: 'Dispatch', desc: 'Packaged, inspected and supplied to projects across India.' },
];

const signatureProducts = [
  { name: 'FireSeal', desc: 'Intumescent fire protection for structural steel. Expands to form insulating char layer.', tag: 'Fire Protection', link: '/solutions/fire-protection' },
  { name: 'FEVE Coach Exterior', desc: 'Fluoropolymer technology for railway coaches. Gloss retention beyond 10 years.', tag: 'Railway', link: '/solutions/railway-coaches' },
  { name: 'Anti-Fouling System', desc: 'Biocide-free silicone-epoxy hybrid for naval vessels. 5-year docking intervals.', tag: 'Marine', link: '/solutions/marine-hull' },
  { name: 'WRAS Tank Lining', desc: 'Solventless epoxy approved for potable water contact. Zero VOC.', tag: 'Water', link: '/solutions/tank-lining' },
  { name: 'Azura Weather Shield 15', desc: 'Premium exterior emulsion with Polysiloxane and PU hybrid. 15-year dirt resistance.', tag: 'Decorative', link: '/products/decorative' },
  { name: 'Duraflo Floor System', desc: 'Self-levelling epoxy + polyaspartic topcoat. Return to service in 4 hours.', tag: 'Flooring', link: '/solutions/industrial-flooring' },
];

const roles = [
  { role: 'Homeowner', desc: 'Colours, products, calculator, warranty', link: '/home-painting' },
  { role: 'Architect', desc: 'Shades, specifications, samples', link: '/shade-card' },
  { role: 'Consultant', desc: 'TDS, approvals, coating systems', link: '/technical-library' },
  { role: 'Industrial Buyer', desc: 'Products, systems, RFQ', link: '/contact' },
  { role: 'Govt / PSU', desc: 'Approvals, credentials, tender support', link: '/approvals' },
  { role: 'Contractor', desc: 'Application guidance, support', link: '/solutions' },
  { role: 'Dealer', desc: 'Products, schemes, orders', link: '/dealer' },
  { role: 'Painter', desc: 'Training, loyalty, rewards', link: '/painter' },
];

export default function HomePage() {
  const [heroIdx, setHeroIdx] = useState(0);
  const [approvals, setApprovals] = useState<any[]>([]);
  const [finderStep, setFinderStep] = useState(0);
  const [finderAsset, setFinderAsset] = useState('');
  const [finderChallenge, setFinderChallenge] = useState('');

  useEffect(() => {
    supabase.from('approvals').select('*').eq('is_active', true).order('sort_order').limit(10).then(r => setApprovals(r.data || []));
    // video hero
  }, []);

  const assets = ['Structural Steel', 'Railway Asset', 'Ship / Marine', 'Roof', 'Floor', 'Tank', 'Pipeline', 'Interior Wall', 'Exterior Wall', 'Equipment', 'Concrete'];
  const challenges: Record<string, string[]> = {
    'Structural Steel': ['Corrosion', 'Coastal Exposure', 'Fire Protection', 'UV Degradation', 'Abrasion'],
    'Railway Asset': ['Corrosion', 'Stone Chipping', 'Fire Safety', 'UV / Gloss Retention', 'Chemical Splash'],
    'Ship / Marine': ['Seawater Immersion', 'Fouling', 'Cathodic Disbondment', 'UV', 'Impact'],
    'Tank': ['Immersion', 'Potable Water', 'Chemical Storage', 'Fuel Contact', 'Corrosion'],
    'Floor': ['Abrasion', 'Chemical Spills', 'Fast Turnaround', 'Anti-Static', 'Hygienic'],
    'Interior Wall': ['Washability', 'Stain Resistance', 'Low Odour', 'Fungal Resistance', 'Luxury Finish'],
    'Exterior Wall': ['Weather', 'Algae & Fungus', 'Crack Bridging', 'Dirt Pickup', 'UV Fade'],
    'Roof': ['Waterproofing', 'Heat Reflection', 'Crack Bridging', 'Ponding Water', 'UV'],
    'Pipeline': ['Corrosion', 'Cathodic Protection', 'Soil Stress', 'Chemical Transport', 'Temperature'],
    'Equipment': ['Corrosion', 'Heat', 'Chemical Exposure', 'Quick Dry', 'Abrasion'],
    'Concrete': ['Carbonation', 'Chemical Attack', 'Waterproofing', 'Aesthetics', 'Durability'],
  };

  const systemRecommendations: Record<string, { primer: string; intermediate: string; topcoat: string; dft: string; link: string }> = {
    'Structural Steel-Corrosion': { primer: 'Inorganic Zinc Silicate', intermediate: 'Epoxy MIO', topcoat: 'Aliphatic PU', dft: '250-320 microns', link: '/solutions/structural-steel' },
    'Structural Steel-Fire Protection': { primer: 'Epoxy Zinc Phosphate', intermediate: 'FireSeal Intumescent', topcoat: 'Aliphatic PU (exterior)', dft: '500-3000 microns', link: '/solutions/fire-protection' },
    'Railway Asset-Corrosion': { primer: 'Epoxy Zinc Phosphate', intermediate: 'Epoxy MIO', topcoat: 'FEVE Fluoropolymer', dft: '180-250 microns', link: '/solutions/railway-coaches' },
    'Ship / Marine-Seawater Immersion': { primer: 'Marine Epoxy Primer', intermediate: 'Epoxy High-Build', topcoat: 'Anti-Fouling System', dft: '375-500 microns', link: '/solutions/marine-hull' },
    'Tank-Potable Water': { primer: 'Solventless Epoxy (self-priming)', intermediate: 'Solventless Epoxy', topcoat: 'Solventless Epoxy', dft: '300-500 microns', link: '/solutions/tank-lining' },
    'Floor-Abrasion': { primer: 'Epoxy Floor Primer', intermediate: 'Duraflo Self-Levelling Epoxy', topcoat: 'Polyaspartic Topcoat', dft: '1-3mm', link: '/solutions/industrial-flooring' },
    'Interior Wall-Luxury Finish': { primer: 'Azura Damp Arrestor Primer', intermediate: 'Acrylic Wall Putty', topcoat: 'Azura Pearl Glow', dft: 'Per spec', link: '/products/decorative' },
    'Exterior Wall-Weather': { primer: 'Azura Damp Arrestor Primer', intermediate: 'Cement Putty', topcoat: 'Azura Weather Shield 15', dft: 'Per spec', link: '/products/decorative' },
    'Roof-Waterproofing': { primer: 'Arest Base Coat', intermediate: 'Arest Crack Filler', topcoat: 'Arest Cool Roof Coat', dft: 'Per spec', link: '/products/decorative' },
  };

  const getRecommendation = () => {
    const key = `${finderAsset}-${finderChallenge}`;
    return systemRecommendations[key] || { primer: 'Contact our technical team', intermediate: 'System designed to spec', topcoat: 'Engineered solution', dft: 'Project specific', link: '/contact' };
  };

  return (
    <>
      {/* ═══════════════════════════════════════════ */}
      {/* CHAPTER 1 — WHO WE ARE */}
      {/* ═══════════════════════════════════════════ */}

      {/* HERO */}
      <section className="relative h-screen flex items-center overflow-hidden bg-[var(--color-navy)]">
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-30"><source src="/video/hero.mp4" type="video/mp4" /></video>
        <div className="absolute inset-0 bg-[var(--color-navy)]/50" />
        <div className="container-wide relative z-10">
          <div className="max-w-3xl">
            <div className="w-16 h-[2px] bg-[var(--color-red)] mb-10" />
            <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-extrabold text-white leading-[1.05] tracking-tight mb-6">
              Colouring India.<br /><span style={{color:'var(--color-red)'}}>Protecting India.</span>
            </h1>
            <p className="text-white/50 text-lg max-w-xl leading-relaxed mb-10" style={{fontFamily:'var(--font-body)'}}>
              Since 1972, Anupam Paints has engineered decorative and high-performance coating systems for homes, factories, railways, ships, infrastructure and some of India&apos;s most demanding assets.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/solutions" className="bg-[var(--color-red)] text-white font-semibold px-7 py-3.5 hover:bg-[var(--color-red-hover)] transition inline-flex items-center gap-2" style={{borderRadius:'var(--radius-md)'}}>Explore Our World</Link>
              <Link href="/contact" className="text-white/70 font-medium px-4 py-3.5 hover:text-white transition inline-flex items-center gap-2">Talk to a Coating Specialist <ArrowRight size={16} /></Link>
            </div>
          </div>
        </div>
      </section>

      {/* SCALE OF ANUPAM */}
      <section className="bg-[var(--color-navy)] border-t border-white/5 py-16">
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {scaleData.map((item) => (
              <div key={item.label}>
                <div className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">{item.value}</div>
                <div className="text-xs text-white/60 mt-2 font-semibold uppercase tracking-wider">{item.label}</div>
              </div>
            ))}
          </div>
          <p className="text-white/50 text-sm mt-10 max-w-3xl" style={{fontFamily:'var(--font-body)'}}>
            From formulation and resin manufacturing to testing, production and technical application support — critical capabilities remain under our control.
          </p>
        </div>
      </section>

      {/* BRAND LOGOS */}
      <section className="py-10" style={{background:'#F5F2ED',borderTop:'1px solid #E8E5E0',borderBottom:'1px solid #E8E5E0'}}>
        <div className="container-wide">
          <p className="text-center text-xs font-semibold uppercase tracking-widest mb-6" style={{color:'var(--color-steel)'}}>Our Decorative Brands — Premium Range</p>
          <div className="flex items-center justify-center gap-8 md:gap-14 flex-wrap">
            {[
              {name:'Azura',shots:['azura-advance-emulsion.jpg','azura-pearl-glow.jpg','azura-luxury-exterior-7.jpg']},
              {name:'Asure',shots:['asure-cleanwalls.jpg','asure-radiance.jpg']},
              {name:'Anex',shots:['anex-advance-interior.jpg','anex-advance-exterior.jpg']},
              {name:'Arest',shots:['arest-base-coat.jpg','arest-roof-coat.jpg','arest-crack-fillers.jpg']},
            ].map(brand => (
              <div key={brand.name} className="text-center">
                <img src={`/img/logos/${brand.name.toLowerCase()}.${brand.name === 'Asure' ? 'png' : 'jpg'}`} alt={brand.name} className="h-8 mx-auto mb-3" />
                <div className="flex gap-2 justify-center">
                  {brand.shots.map(s => <img key={s} src={`/img/products/${s}`} alt="" className="h-32 w-auto object-contain bg-white p-3 border border-gray-200 shadow-sm" style={{borderRadius:'var(--radius-md)'}} />)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THREE DIVISIONS — Full-width editorial */}
      <section className="bg-white">
        <div className="container-wide py-20">
          <div className="text-label mb-2">Our Coating Divisions</div>
          <h2 className="text-page-title mb-16">One Manufacturer. Three Very Different Worlds.</h2>
        </div>
        {[
          { name: 'Decorative & Architectural', sub: 'Colour, durability and protection for the places people live and work.', img: '/img/divisions/div-decorative.png', link: '/products/decorative', tags: ['Interior Emulsions', 'Exterior Emulsions', 'Waterproofing', 'Primers', 'Enamels', 'Textures'], accent: 'var(--accent-decorative)' },
          { name: 'Industrial & Protective', sub: 'Engineered coating systems for corrosion, chemicals, weathering and demanding service.', img: '/img/divisions/div-industrial.png', link: '/products/industrial', tags: ['Epoxy', 'PU', 'Zinc-Rich', 'MIO', 'Heat Resistant', 'Tank Linings'], accent: 'var(--accent-industrial)' },
          { name: 'Advanced & Critical Coatings', sub: 'Specialised coatings for assets where ordinary paint is not enough.', img: '/img/divisions/div-specialty.png', link: '/products/specialty', tags: ['Railway', 'Marine', 'Fire Protection', 'Potable Water', 'Thermal', 'Advanced'], accent: 'var(--accent-specialty)' },
        ].map((div, i) => (
          <div key={div.name} className={`grid grid-cols-1 lg:grid-cols-2 min-h-[450px] ${i % 2 === 1 ? 'lg:direction-rtl' : ''}`}>
            <div className={`relative overflow-hidden ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
              <img src={div.img} alt={div.name} className="w-full h-full object-cover min-h-[350px]" />
            </div>
            <div className={`p-10 md:p-16 flex flex-col justify-center ${i % 2 === 1 ? 'lg:order-1' : ''}`} style={{background: i === 0 ? '#FDF8F4' : i === 1 ? '#F5F6F8' : '#F0FAFB'}}>
              <div className="w-10 h-[2px] mb-6" style={{background: div.accent}} />
              <h3 className="text-section-heading mb-3">{div.name}</h3>
              <p className="text-[var(--color-steel)] leading-relaxed mb-6">{div.sub}</p>
              <div className="flex flex-wrap gap-2 mb-8">
                {div.tags.map(t => <span key={t} className="text-xs px-2.5 py-1 bg-white text-[var(--color-steel)] border border-gray-200" style={{borderRadius:'var(--radius-sm)'}}>{t}</span>)}
              </div>
              <Link href={div.link} className="text-sm font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all" style={{color: div.accent}}>
                Explore Range <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        ))}
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* CHAPTER 2 — WHAT WE SOLVE */}
      {/* ═══════════════════════════════════════════ */}

      {/* SOLUTION FINDER — Interactive diagnostic */}
      <section className="section-padding" style={{background:'linear-gradient(135deg, #FEF7ED 0%, #FDF4E8 100%)'}}>
        <div className="container-wide max-w-4xl">
          <div className="text-center mb-12">
            <div className="w-12 h-[2px] bg-[var(--color-red)] mx-auto mb-6" />
            <h2 className="text-page-title mb-3">Tell Us the Problem. We&apos;ll Build the System.</h2>
            <p className="text-caption">Select your asset and challenge — we recommend the right Anupam coating system.</p>
          </div>

          {finderStep === 0 && (
            <div>
              <p className="text-sm font-semibold text-[var(--color-navy)] mb-4">Step 1 — What are you protecting?</p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {assets.map(a => (
                  <button key={a} onClick={() => { setFinderAsset(a); setFinderStep(1); }}
                    className="card p-4 text-left text-sm font-medium text-[var(--color-graphite)] hover:border-[var(--color-navy)] hover:text-[var(--color-navy)] transition">{a}</button>
                ))}
              </div>
            </div>
          )}

          {finderStep === 1 && (
            <div>
              <p className="text-sm text-[var(--color-steel)] mb-1">Asset: <strong className="text-[var(--color-navy)]">{finderAsset}</strong></p>
              <p className="text-sm font-semibold text-[var(--color-navy)] mb-4 mt-4">Step 2 — What is the main challenge?</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {(challenges[finderAsset] || ['Corrosion', 'Weather', 'Chemical', 'Heat', 'Abrasion']).map(c => (
                  <button key={c} onClick={() => { setFinderChallenge(c); setFinderStep(2); }}
                    className="card p-4 text-left text-sm font-medium text-[var(--color-graphite)] hover:border-[var(--color-navy)] transition">{c}</button>
                ))}
              </div>
              <button onClick={() => setFinderStep(0)} className="text-sm text-[var(--color-steel)] mt-4 hover:text-[var(--color-navy)]">&larr; Change asset</button>
            </div>
          )}

          {finderStep === 2 && (
            <div>
              <p className="text-sm text-[var(--color-steel)] mb-6">Asset: <strong className="text-[var(--color-navy)]">{finderAsset}</strong> &middot; Challenge: <strong className="text-[var(--color-navy)]">{finderChallenge}</strong></p>
              <div className="bg-[var(--color-warm-white)] p-8" style={{borderRadius:'var(--radius-lg)', border:'1px solid var(--color-border)'}}>
                <h3 className="text-lg font-bold text-[var(--color-navy)] mb-6">Recommended Anupam Coating System</h3>
                {(() => { const rec = getRecommendation(); return (
                  <div className="space-y-4">
                    <div className="flex items-start gap-4"><div className="w-8 h-8 bg-[var(--color-navy)] text-white flex items-center justify-center text-xs font-bold shrink-0" style={{borderRadius:'var(--radius-sm)'}}>1</div><div><div className="text-xs text-[var(--color-steel)] uppercase tracking-wider">Primer</div><div className="font-semibold text-[var(--color-navy)]">{rec.primer}</div></div></div>
                    <div className="flex items-start gap-4"><div className="w-8 h-8 bg-[var(--color-navy)] text-white flex items-center justify-center text-xs font-bold shrink-0" style={{borderRadius:'var(--radius-sm)'}}>2</div><div><div className="text-xs text-[var(--color-steel)] uppercase tracking-wider">Intermediate</div><div className="font-semibold text-[var(--color-navy)]">{rec.intermediate}</div></div></div>
                    <div className="flex items-start gap-4"><div className="w-8 h-8 bg-[var(--color-red)] text-white flex items-center justify-center text-xs font-bold shrink-0" style={{borderRadius:'var(--radius-sm)'}}>3</div><div><div className="text-xs text-[var(--color-steel)] uppercase tracking-wider">Topcoat</div><div className="font-semibold text-[var(--color-navy)]">{rec.topcoat}</div></div></div>
                    <div className="pt-4 mt-4" style={{borderTop:'1px solid var(--color-border)'}}>
                      <span className="text-xs text-[var(--color-steel)]">Indicative Total DFT: <strong>{rec.dft}</strong></span>
                    </div>
                    <p className="text-xs text-[var(--color-steel)]">Final specification must be technically verified by our team for your specific conditions.</p>
                    <div className="flex gap-3 mt-4">
                      <Link href={rec.link} className="bg-[var(--color-red)] text-white text-sm font-semibold px-5 py-2.5 inline-flex items-center gap-2 hover:opacity-90 transition" style={{borderRadius:'var(--radius-md)'}}>View Full System <ArrowRight size={14} /></Link>
                      <Link href="/contact" className="border border-[var(--color-border)] text-[var(--color-navy)] text-sm font-semibold px-5 py-2.5 hover:bg-gray-50 transition" style={{borderRadius:'var(--radius-md)'}}>Request Technical Review</Link>
                    </div>
                  </div>
                ); })()}
              </div>
              <button onClick={() => { setFinderStep(0); setFinderAsset(''); setFinderChallenge(''); }} className="text-sm text-[var(--color-steel)] mt-4 hover:text-[var(--color-navy)]">&larr; Start over</button>
            </div>
          )}
        </div>
      </section>

      {/* SIGNATURE PRODUCTS */}
      <section className="section-padding" style={{background:'var(--color-navy)'}}>
        <div className="container-wide">
          <div className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-2">Signature Technologies</div>
          <h2 className="text-section-heading mb-10" style={{color:'white'}}>Built for Problems Ordinary Paint Cannot Solve.</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--color-border)]">
            {signatureProducts.map((prod) => (
              <Link key={prod.name} href={prod.link} className="bg-[#1A2940] p-8 group hover:bg-[#1E3050] transition" style={{borderLeft:"3px solid var(--color-red)"}}>
                <span className="text-xs font-semibold text-[#FF6B6B] uppercase tracking-wider">{prod.tag}</span>
                <h3 className="text-lg font-bold text-white mt-2 mb-2">{prod.name}</h3>
                <p className="text-sm text-white/60 leading-relaxed mb-4">{prod.desc}</p>
                <span className="text-sm font-semibold text-[#FF6B6B] inline-flex items-center gap-1 group-hover:gap-2 transition-all">Learn More <ArrowRight size={14} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* CHAPTER 3 — WHY TRUST US */}
      {/* ═══════════════════════════════════════════ */}

      {/* MANUFACTURING JOURNEY */}
      <section className="section-padding" style={{background:'linear-gradient(135deg, #E8EEF5 0%, #DCE5F0 50%, #D0DCE9 100%)'}}>
        <div className="container-wide">
          <div className="text-label mb-2">Inside Anupam</div>
          <h2 className="text-section-heading mb-12">From Resin to Ready Coating.</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {processSteps.map((step) => (
              <div key={step.num}>
                <div className="text-3xl font-extrabold text-[var(--color-border)] mb-3">{step.num}</div>
                <h4 className="text-sm font-bold text-[var(--color-navy)] mb-1">{step.title}</h4>
                <p className="text-xs text-[var(--color-steel)] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10"><Link href="/infrastructure" className="text-sm font-semibold text-[var(--color-navy)] inline-flex items-center gap-1 hover:gap-2 transition-all">Explore Our Manufacturing Facility <ArrowRight size={14} /></Link></div>
        </div>
      </section>

      {/* PROOF, NOT PROMISES */}
      <section className="section-padding" style={{background:'linear-gradient(135deg, #F0E8E0 0%, #EBE0D5 100%)'}}>
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="text-page-title">Proof, Not Promises.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--color-border)]">
            {[
              { title: 'Tested', desc: 'Salt spray, QUV weathering, wet scrub, spectrophotometry — every batch verified in our NABL-compliant laboratory.', link: '/infrastructure' },
              { title: 'Approved', desc: 'RDSO, Indian Navy, MES, EIL, CMRL, AAI, HPCL, WRAS, ISO 9001/14001/45001 certified.', link: '/approvals' },
              { title: 'Proven', desc: 'Serving Indian Railways and Navy for over three decades. Active supply to major EPCs and infrastructure projects.', link: '/clients' },
              { title: 'Controlled', desc: 'In-house resin manufacturing, batch traceability, and integrated quality management from raw material to dispatch.', link: '/infrastructure' },
            ].map((pillar) => (
              <Link key={pillar.title} href={pillar.link} className="bg-white p-8 group hover:bg-[var(--color-warm-white)] transition">
                <h3 className="text-xl font-bold text-[var(--color-navy)] mb-3">{pillar.title}</h3>
                <p className="text-sm text-[var(--color-steel)] leading-relaxed mb-4">{pillar.desc}</p>
                <span className="text-xs font-semibold text-[var(--color-navy)] inline-flex items-center gap-1 group-hover:gap-2 transition-all">Learn More <ArrowRight size={12} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* CHAPTER 4 — WHO WE SERVE */}
      {/* ═══════════════════════════════════════════ */}

      {/* BUILT AROUND YOUR ROLE */}
      <section className="section-padding" style={{background:"linear-gradient(135deg, #EBF0F5 0%, #E0E8F0 100%)"}}>
        <div className="container-wide">
          <div className="text-center mb-12">
            <div className="w-12 h-[2px] bg-[var(--color-red)] mx-auto mb-6" />
            <h2 className="text-page-title">How Can We Help You?</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {roles.map((r) => (
              <Link key={r.role} href={r.link} className="card p-5 text-center group hover:border-[var(--color-navy)] transition">
                <h3 className="font-bold text-[var(--color-navy)] mb-1 text-sm">{r.role}</h3>
                <p className="text-xs text-[var(--color-steel)]">{r.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* HOME PAINTING — Premium consumer section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
        <div className="relative overflow-hidden">
          <img src="/img/divisions/div-decorative.png" alt="Premium interior" className="w-full h-full object-cover min-h-[400px]" />
        </div>
        <div className="p-10 md:p-16 flex flex-col justify-center" style={{background:'linear-gradient(135deg, #FDF8F4 0%, #FAF0E6 100%)'}}>
          <div className="w-10 h-[2px] mb-6" style={{background:'var(--accent-decorative)'}} />
          <span className="text-xs font-semibold uppercase tracking-wider mb-2" style={{color:'var(--accent-decorative)'}}>For Homeowners</span>
          <h2 className="text-page-title mb-4">Your Home Deserves More Than a Colour.</h2>
          <div className="grid grid-cols-2 gap-4 mb-8">
            {[
              { label: 'Choose Your Colour', desc: 'Visualizer + shade inspiration', link: '/color-visualizer' },
              { label: 'Choose Your Paint', desc: 'Interior, exterior, waterproofing', link: '/products/decorative' },
              { label: 'Estimate Requirement', desc: 'Paint calculator', link: '/calculator' },
              { label: 'Get It Done', desc: 'Dealer or painting service', link: '/home-painting' },
            ].map(item => (
              <Link key={item.label} href={item.link} className="group">
                <div className="text-sm font-semibold text-[var(--color-navy)] group-hover:text-[var(--accent-decorative)] transition">{item.label}</div>
                <div className="text-xs text-[var(--color-steel)]">{item.desc}</div>
              </Link>
            ))}
          </div>
          <Link href="/home-painting" className="inline-flex items-center gap-2 text-sm font-semibold hover:gap-3 transition-all" style={{color:'var(--accent-decorative)'}}>Explore Home Painting <ArrowRight size={14} /></Link>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* CHAPTER 5 — START A CONVERSATION */}
      {/* ═══════════════════════════════════════════ */}

      {/* TECHNICAL ASSISTANCE */}
      <section className="section-padding bg-[var(--color-navy)]">
        <div className="container-wide max-w-3xl text-center">
          <div className="w-12 h-[2px] bg-[var(--color-red)] mx-auto mb-6" />
          <h2 className="text-page-title mb-3" style={{color:'white'}}>Tell Us What You Need to Protect.</h2>
          <p className="text-white/60 mb-10">A home. A bridge. A railway coach. A ship. A factory. A tank. A floor. Our team will help you identify the right Anupam system.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="bg-[var(--color-red)] text-white font-semibold px-8 py-4 inline-flex items-center gap-2 hover:opacity-90 transition" style={{borderRadius:'var(--radius-md)'}}>Find My Coating System</Link>
            <Link href="/contact" className="border border-white/20 text-white font-semibold px-8 py-4 inline-flex items-center gap-2 hover:bg-gray-50 transition" style={{borderRadius:'var(--radius-md)'}}>Request Technical Consultation</Link>
          </div>
          <div className="flex justify-center gap-6 mt-8 text-sm text-[var(--color-steel)]">
            <a href="tel:03322651204" className="hover:text-[var(--color-navy)] transition inline-flex items-center gap-1"><Phone size={14} /> 033-2265 1204</a>
            <a href="https://wa.me/919830063651" className="hover:text-white transition inline-flex items-center gap-1"><MessageSquare size={14} /> WhatsApp</a>
            <a href="mailto:care@anupampaints.com" className="hover:text-white transition inline-flex items-center gap-1"><Mail size={14} /> Email</a>
          </div>
        </div>
      </section>
    </>
  );
}
