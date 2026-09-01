'use client';
import { useState } from 'react';
import Link from 'next/link';
import { SITE } from '@/lib/constants';
import { Send, CheckCircle, Phone, Palette, Calculator, Eye, Star, ArrowRight, Shield, Droplets, Home, Sun, PaintBucket, Clock, Users, Award, MapPin } from 'lucide-react';

const paintTiers = [
  { name: 'Azura', tier: 'Luxury', desc: 'Our flagship range. Advanced Polysiloxane and PU hybrid technology for interiors and exteriors. Superior stain resistance, richest colour depth, and up to 15-year exterior warranty.', warranty: '15 Years', bestFor: 'Living rooms, main facades, homes where finish quality matters most', color: '#1A365D', bg: '#EBF0F5' },
  { name: 'Asure', tier: 'Premium', desc: 'High-performance emulsions with excellent washability and weather resistance. The most popular choice for families who want durability without the luxury price tag.', warranty: '10 Years', bestFor: 'Bedrooms, kitchens, entire homes on a considered budget', color: '#9B2C2C', bg: '#FEF2F2' },
  { name: 'Anex', tier: 'Mainstream', desc: 'Reliable acrylic emulsions trusted by contractors and dealers across India. Great coverage, solid performance, honest pricing.', warranty: '5 Years', bestFor: 'Rental properties, large-area painting, value-conscious projects', color: '#276749', bg: '#F0FFF4' },
  { name: 'Atop', tier: 'Economy', desc: 'Dependable everyday emulsions for when budget is the primary consideration. Still built to our quality standards, just without the premium additives.', warranty: '2 Years', bestFor: 'Institutional buildings, budget renovations, secondary spaces', color: '#975A16', bg: '#FFFBEB' },
];

const journeySteps = [
  { num: '01', title: 'Tell Us About Your Home', desc: 'Share your area, current wall condition, and what you\'re looking for — a fresh coat, a colour change, or fixing a damp problem.' },
  { num: '02', title: 'Free Site Visit & Colour Consultation', desc: 'Our team visits, assesses your walls, and helps you choose colours and finishes that suit your lighting and lifestyle.' },
  { num: '03', title: 'Get a Detailed Quote', desc: 'Transparent pricing broken down by area, product tier, and surface preparation needed — no hidden costs.' },
  { num: '04', title: 'Professional Application', desc: 'Trained painters from our dealer network handle everything — surface prep, priming, and finishing to specification.' },
  { num: '05', title: 'Final Inspection & Warranty', desc: 'We inspect the finished work with you and register your warranty, so you have documented protection for years to come.' },
];

const commonProblems = [
  { icon: Droplets, title: 'Damp Walls & Seepage', desc: 'Water stains, peeling paint, or that musty smell — usually means water is getting in through a crack, joint, or the wall itself. We diagnose the source before repainting.', link: '/waterproofing' },
  { icon: Sun, title: 'Faded Exterior Colour', desc: 'Years of monsoon and sun exposure can leave exteriors chalky and dull. Azura Antidirt Long Life is built specifically to resist this fading.', link: '/products/decorative' },
  { icon: Home, title: 'Cracks in Plaster', desc: 'Hairline cracks are cosmetic; wider ones may need structural attention first. We assess before recommending a crack-filling and repainting system.', link: '/coating-failures' },
  { icon: PaintBucket, title: 'Old, Yellowed Interiors', desc: 'Interior emulsions naturally yellow over 5-8 years, especially near kitchens. A fresh coat with the right primer restores brightness instantly.', link: '/color-visualizer' },
];

const faqs = [
  { q: 'How much paint will I need for my home?', a: 'It depends on wall area, number of coats, and surface condition. Use our free Paint Calculator, or request a site visit for an exact quantity and cost estimate.' },
  { q: 'How long does a typical home painting job take?', a: 'A standard 2-3 BHK apartment interior takes 4-6 days including surface preparation and drying time between coats. Exteriors depend on building height and weather.' },
  { q: 'Do I need to empty the room before painting?', a: 'Furniture should be moved to the centre and covered, not removed entirely. Our painters bring protective sheeting for floors and fixtures.' },
  { q: 'What is the difference between the paint tiers?', a: 'Higher tiers (Azura, Asure) use better resins and additives for washability, stain resistance, and colour retention. All tiers meet our quality standards — the difference is longevity and finish quality.' },
  { q: 'Is the warranty really honoured?', a: 'Yes. Register your warranty through our Warranty Centre after painting is complete. Claims are assessed against documented application by our trained network.' },
  { q: 'Can you match a specific colour I have in mind?', a: 'Yes — bring a reference (fabric, photo, or existing paint chip) to your consultation, and we can match or recommend the closest shade from our card.' },
];

export default function HomePaintingPage() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', city: '', area: '', service: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await fetch('/api/enquiry', { method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, phone: form.phone, email: form.email, company: form.city,
          enquiry_type: 'Home Painting', message: `Area: ${form.area} sqft | Service: ${form.service}` }) });
    } catch {}
    setStatus('done');
  };

  return (
    <>
      {/* HERO */}
      <section className="relative text-white overflow-hidden">
        <img src="/img/heroes/hero-home-painting.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[var(--color-navy)]/70" />
        <div className="container-wide py-20 md:py-28 relative z-10">
          <div className="w-12 h-[2px] bg-[var(--color-red)] mb-6" />
          <div className="text-xs font-semibold uppercase tracking-widest text-white/60 mb-3">For Your Home</div>
          <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-white leading-tight mb-5 max-w-2xl">Your Home Deserves the Right System, Not Just the Right Shade</h1>
          <p className="text-white/70 text-lg max-w-xl leading-relaxed mb-8">Colour is only the beginning. The right primer, surface preparation, and product tier are what make a paint job last 5 years instead of fading in 18 months. We help you get the whole system right.</p>
          <div className="flex flex-wrap gap-3">
            <a href="#enquiry" className="bg-[var(--color-red)] text-white font-semibold px-7 py-3.5 hover:opacity-90 transition inline-flex items-center gap-2" style={{borderRadius:'var(--radius-md)'}}>Get a Free Quote <ArrowRight size={16} /></a>
            <Link href="/color-visualizer" className="bg-white/10 backdrop-blur text-white font-semibold px-7 py-3.5 hover:bg-white/20 transition border border-white/20 inline-flex items-center gap-2" style={{borderRadius:'var(--radius-md)'}}><Eye size={16} /> Visualize Colours</Link>
            <Link href="/painting-cost" className="bg-white/10 backdrop-blur text-white font-semibold px-7 py-3.5 hover:bg-white/20 transition border border-white/20 inline-flex items-center gap-2" style={{borderRadius:'var(--radius-md)'}}>What Will It Cost?</Link>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="bg-white border-b border-gray-100 py-6">
        <div className="container-wide grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div><div className="text-2xl font-extrabold text-[var(--color-navy)]">50+ Yrs</div><div className="text-xs text-[var(--color-steel)] font-medium mt-1">Manufacturing Since 1972</div></div>
          <div><div className="text-2xl font-extrabold text-[var(--color-navy)]">15 Yr</div><div className="text-xs text-[var(--color-steel)] font-medium mt-1">Warranty on Azura Range</div></div>
          <div><div className="text-2xl font-extrabold text-[var(--color-navy)]">6</div><div className="text-xs text-[var(--color-steel)] font-medium mt-1">Product Tiers to Choose From</div></div>
          <div><div className="text-2xl font-extrabold text-[var(--color-navy)]">Pan India</div><div className="text-xs text-[var(--color-steel)] font-medium mt-1">Dealer & Applicator Network</div></div>
        </div>
      </section>

      {/* COMMON PROBLEMS */}
      <section className="section-padding" style={{background:'var(--color-warm-white)'}}>
        <div className="container-wide">
          <div className="w-10 h-[2px] bg-[var(--color-red)] mb-5" />
          <h2 className="text-section-heading mb-3">What Brings You Here Today?</h2>
          <p className="text-[var(--color-steel)] max-w-xl mb-10">Most homeowners come to us with a specific problem, not just a wish for a new colour. Here's how we typically help.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {commonProblems.map(p => (
              <Link key={p.title} href={p.link} className="card card-hover p-6 group">
                <p.icon size={22} className="text-[var(--color-red)] mb-4" />
                <h3 className="font-semibold text-[var(--color-navy)] mb-2">{p.title}</h3>
                <p className="text-sm text-[var(--color-steel)] leading-relaxed mb-3">{p.desc}</p>
                <span className="text-xs font-semibold text-[var(--color-red)] inline-flex items-center gap-1 group-hover:gap-2 transition-all">Learn more <ArrowRight size={12} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PAINT TIERS */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="w-10 h-[2px] bg-[var(--color-red)] mb-5" />
          <h2 className="text-section-heading mb-3">Choose the Right Paint Tier for Your Home</h2>
          <p className="text-[var(--color-steel)] max-w-2xl mb-10">Every tier is manufactured to genuine quality standards — the difference is in the resin technology, additives, and how long the finish lasts. There's no wrong choice, only the right choice for your budget and expectations.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {paintTiers.map(t => (
              <div key={t.name} className="p-6" style={{background: t.bg, borderRadius:'var(--radius-lg)', borderTop: `3px solid ${t.color}`}}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-lg" style={{color: t.color}}>{t.name}</h3>
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 bg-white" style={{color: t.color, borderRadius:'var(--radius-sm)'}}>{t.tier}</span>
                </div>
                <p className="text-sm text-[var(--color-graphite)] leading-relaxed mb-4">{t.desc}</p>
                <div className="text-xs text-[var(--color-steel)] mb-1"><strong style={{color: t.color}}>Warranty:</strong> {t.warranty}</div>
                <div className="text-xs text-[var(--color-steel)]"><strong style={{color: t.color}}>Best for:</strong> {t.bestFor}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TOOLS */}
      <section className="section-padding" style={{background:'linear-gradient(135deg, #EBF0F5 0%, #E0E8F0 100%)'}}>
        <div className="container-wide">
          <div className="w-10 h-[2px] bg-[var(--color-red)] mb-5" />
          <h2 className="text-section-heading mb-8">Plan Your Project Before You Call Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/color-visualizer" className="card card-hover p-6 text-center">
              <Eye size={28} className="mx-auto text-[var(--color-navy)] mb-3" />
              <h3 className="font-semibold text-[var(--color-navy)] mb-1">Colour Visualizer</h3>
              <p className="text-xs text-[var(--color-steel)]">See shades on a real room before you commit</p>
            </Link>
            <Link href="/shade-card" className="card card-hover p-6 text-center">
              <Palette size={28} className="mx-auto text-[var(--color-navy)] mb-3" />
              <h3 className="font-semibold text-[var(--color-navy)] mb-1">Digital Shade Card</h3>
              <p className="text-xs text-[var(--color-steel)]">Browse our complete colour range</p>
            </Link>
            <Link href="/calculator" className="card card-hover p-6 text-center">
              <Calculator size={28} className="mx-auto text-[var(--color-navy)] mb-3" />
              <h3 className="font-semibold text-[var(--color-navy)] mb-1">Paint Calculator</h3>
              <p className="text-xs text-[var(--color-steel)]">Estimate quantity and cost by area</p>
            </Link>
            <Link href="/dealers" className="card card-hover p-6 text-center">
              <MapPin size={28} className="mx-auto text-[var(--color-navy)] mb-3" />
              <h3 className="font-semibold text-[var(--color-navy)] mb-1">Find a Dealer</h3>
              <p className="text-xs text-[var(--color-steel)]">Locate your nearest Anupam dealer</p>
            </Link>
          </div>
        </div>
      </section>

      {/* JOURNEY */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="w-10 h-[2px] bg-[var(--color-red)] mb-5" />
          <h2 className="text-section-heading mb-3">How It Works, Start to Finish</h2>
          <p className="text-[var(--color-steel)] max-w-xl mb-10">A clear, no-surprises process from your first enquiry to a finished, warrantied home.</p>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {journeySteps.map(s => (
              <div key={s.num}>
                <div className="text-3xl font-extrabold mb-3" style={{color:'var(--color-red)', opacity:0.35}}>{s.num}</div>
                <h3 className="text-sm font-bold text-[var(--color-navy)] mb-2">{s.title}</h3>
                <p className="text-xs text-[var(--color-steel)] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WATERPROOFING CALLOUT */}
      <section className="section-padding" style={{background:'#ECFEFF'}}>
        <div className="container-wide grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="w-10 h-[2px] mb-5" style={{background:'#0E7490'}} />
            <h2 className="text-section-heading mb-4">Painting Won't Fix a Leak — Waterproofing Will</h2>
            <p className="text-[var(--color-steel)] leading-relaxed mb-4">If you're seeing damp patches, peeling paint near the ceiling, or a musty smell after monsoon, repainting alone won't solve it. Water needs to be stopped at its source first — cracks, roof joints, or bathroom seepage — before any coating will hold.</p>
            <p className="text-[var(--color-steel)] leading-relaxed mb-6">Our Arest waterproofing range handles roofs, terraces, bathrooms, and basements with systems built for Indian monsoon conditions.</p>
            <Link href="/waterproofing" className="font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all" style={{color:'#0E7490'}}>Explore Waterproofing Solutions <ArrowRight size={14} /></Link>
          </div>
          <img src="/img/app/decorative/dec-roof-waterproof.jpg" alt="Waterproofing" className="w-full h-72 object-cover" style={{borderRadius:'var(--radius-lg)'}} />
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-white">
        <div className="container-wide max-w-3xl">
          <div className="w-10 h-[2px] bg-[var(--color-red)] mb-5" />
          <h2 className="text-section-heading mb-8">Common Questions</h2>
          <div className="space-y-4">
            {faqs.map((f, i) => (
              <details key={i} className="card p-5 group">
                <summary className="font-semibold text-[var(--color-navy)] cursor-pointer list-none flex items-center justify-between">
                  {f.q}
                  <span className="text-[var(--color-red)] group-open:rotate-45 transition-transform text-xl leading-none">+</span>
                </summary>
                <p className="text-sm text-[var(--color-steel)] leading-relaxed mt-3">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ENQUIRY FORM */}
      <section id="enquiry" className="section-padding bg-[var(--color-navy)]">
        <div className="container-wide max-w-2xl">
          <div className="text-center mb-8">
            <div className="w-12 h-[2px] bg-[var(--color-red)] mb-5 mx-auto" />
            <h2 className="text-section-heading text-white mb-3">Get a Free Site Visit & Quote</h2>
            <p className="text-white/50">No obligation. Our team will call within 24 hours to schedule a convenient time.</p>
          </div>
          {status === 'done' ? (
            <div className="bg-white p-10 text-center" style={{borderRadius:'var(--radius-lg)'}}>
              <CheckCircle className="mx-auto mb-4" size={48} style={{color:'var(--color-red)'}} />
              <h3 className="font-bold text-[var(--color-navy)] text-lg mb-2">Request Received!</h3>
              <p className="text-[var(--color-steel)] text-sm">Our home painting team will contact you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white p-8 space-y-4" style={{borderRadius:'var(--radius-lg)'}}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input required className="input-field" placeholder="Your Name *" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                <input required className="input-field" placeholder="Phone Number *" type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
                <input className="input-field" placeholder="Email" type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                <input className="input-field" placeholder="City *" required value={form.city} onChange={e => setForm({...form, city: e.target.value})} />
                <input className="input-field" placeholder="Approx. Area (sq.ft)" value={form.area} onChange={e => setForm({...form, area: e.target.value})} />
                <select className="input-field" value={form.service} onChange={e => setForm({...form, service: e.target.value})}>
                  <option value="">What do you need?</option>
                  <option>Interior Painting</option>
                  <option>Exterior Painting</option>
                  <option>Waterproofing</option>
                  <option>Both Interior & Exterior</option>
                  <option>Not Sure Yet</option>
                </select>
              </div>
              <button type="submit" disabled={status === 'sending'} className="w-full bg-[var(--color-red)] text-white font-semibold py-4 hover:opacity-90 transition disabled:opacity-50 inline-flex items-center justify-center gap-2" style={{borderRadius:'var(--radius-md)'}}>
                <Send size={16} /> {status === 'sending' ? 'Submitting...' : 'Request Free Quote'}
              </button>
              <p className="text-xs text-center text-[var(--color-steel)]">Or call us directly at <a href={`tel:${SITE.phone}`} className="font-semibold text-[var(--color-navy)]">{SITE.phone}</a></p>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
