'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Store, MapPin, Phone, Send, CheckCircle, ArrowRight } from 'lucide-react';

const benefits = [
  { title: 'Complete Product Range', desc: 'Decorative, industrial, waterproofing, flooring — one manufacturer for all coating needs.' },
  { title: '10-15% Better Margins', desc: 'Competitive pricing versus national brands means better margins for your business.' },
  { title: 'Marketing Support', desc: 'Shop branding, display boards, shade cards, brochures, and digital marketing materials.' },
  { title: 'Technical Training', desc: 'Product knowledge, application training, and certification for your team and painters.' },
  { title: 'Loyalty & Incentive Programme', desc: 'Earn loyalty points, quarterly incentives, and annual rewards based on performance.' },
  { title: 'Exclusive Territory', desc: 'Protected territory allocation to build your business without competing with other dealers.' },
  { title: 'Fast Delivery', desc: 'Pan-India dispatch from our Howrah manufacturing facility with reliable logistics.' },
  { title: 'Digital Tools', desc: 'Online ordering, inventory tracking, scheme management, and sales leads through our dealer portal.' },
];

export default function DealershipPage() {
  const [form, setForm] = useState({name:'',phone:'',email:'',company:'',city:'',state:'',existing_brands:'',monthly_potential:'',shop_type:'',message:''});
  const [status, setStatus] = useState<'idle'|'done'>('idle');

  const submit = async (e: React.FormEvent) => { e.preventDefault();
    await fetch('/api/enquiry',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:form.name,phone:form.phone,email:form.email,company:form.company,enquiry_type:'Dealership Enquiry',message:`City: ${form.city}, ${form.state} | Existing Brands: ${form.existing_brands} | Monthly Potential: ${form.monthly_potential} | Shop: ${form.shop_type} | ${form.message}`})});
    setStatus('done'); };

  return (
    <>
      <section className="relative text-white overflow-hidden">
        <img src="/img/app/decorative/dec-colour-consult.png" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[var(--color-navy)]/80" />
        <div className="container-wide py-20 md:py-28 relative z-10">
          <div className="w-12 h-[2px] bg-[var(--color-red)] mb-6" />
          <h1 className="text-page-title text-white mb-4">Become an Anupam Paints Dealer</h1>
          <p className="text-white/50 max-w-xl">Join India&apos;s growing paint manufacturer with 50+ years of manufacturing heritage. 6 decorative brands, full industrial range, competitive margins, and complete business support.</p>
        </div>
      </section>

      <section className="section-padding" style={{background:'var(--color-warm-white)'}}>
        <div className="container-wide">
          <h2 className="text-section-heading mb-8">Why Partner With Anupam Paints?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {benefits.map(b => (
              <div key={b.title} className="card p-5">
                <h3 className="font-semibold text-[var(--color-navy)] mb-2 text-sm">{b.title}</h3>
                <p className="text-xs text-[var(--color-steel)] leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="w-10 h-[2px] bg-[var(--color-red)] mb-6" />
              <h2 className="text-section-heading mb-4">Our Brands</h2>
              <p className="text-[var(--color-steel)] leading-relaxed mb-6">As an Anupam dealer, you get access to 6 decorative brands plus our complete industrial and specialty range:</p>
              <div className="space-y-3 mb-8">
                {[{brand:'Azura',tier:'Luxury',desc:'Premium emulsions with 10-15 year warranty'},
                  {brand:'Asure',tier:'Premium',desc:'High-performance interior and exterior emulsions'},
                  {brand:'Anex',tier:'Mainstream',desc:'Best-in-class quality at competitive pricing'},
                  {brand:'Atop',tier:'Economy',desc:'Value range for price-sensitive projects'},
                  {brand:'Amaje',tier:'Primers',desc:'Universal primers for all substrates'},
                  {brand:'Arest',tier:'Waterproofing',desc:'Complete waterproofing and damp-proofing solutions'}
                ].map(b => (
                  <div key={b.brand} className="flex items-center gap-3 p-3 bg-gray-50" style={{borderRadius:'var(--radius-md)'}}>
                    <img src={`/img/logos/${b.brand.toLowerCase()}.${['asure','atop','amaje'].includes(b.brand.toLowerCase())?'png':'jpg'}`} alt={b.brand} className="h-8 w-auto" />
                    <div><span className="text-sm font-semibold text-[var(--color-navy)]">{b.brand}</span> <span className="text-xs text-[var(--color-steel)]">({b.tier})</span><p className="text-xs text-[var(--color-steel)]">{b.desc}</p></div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              {status === 'done' ? (
                <div className="text-center py-16"><CheckCircle className="mx-auto mb-4" size={56} style={{color:'var(--color-red)'}} /><h2 className="text-xl font-bold text-[var(--color-navy)] mb-2">Application Received!</h2><p className="text-[var(--color-steel)]">Our dealer development team will contact you within 48 hours.</p></div>
              ) : (
                <form onSubmit={submit} className="card p-6 space-y-3">
                  <h3 className="font-bold text-[var(--color-navy)] mb-2">Apply for Dealership</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <input required className="input-field" placeholder="Your Name *" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
                    <input required className="input-field" placeholder="Phone *" type="tel" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} />
                    <input className="input-field" placeholder="Email" type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
                    <input className="input-field" placeholder="Shop / Company Name" value={form.company} onChange={e=>setForm({...form,company:e.target.value})} />
                    <input className="input-field" placeholder="City *" value={form.city} onChange={e=>setForm({...form,city:e.target.value})} />
                    <input className="input-field" placeholder="State" value={form.state} onChange={e=>setForm({...form,state:e.target.value})} />
                  </div>
                  <input className="input-field" placeholder="Existing paint brands you stock" value={form.existing_brands} onChange={e=>setForm({...form,existing_brands:e.target.value})} />
                  <select className="input-field" value={form.shop_type} onChange={e=>setForm({...form,shop_type:e.target.value})}>
                    <option value="">Type of Business</option><option>Paint Retail Shop</option><option>Hardware Store</option><option>Building Material Store</option><option>Distributor</option><option>Contractor with Shop</option><option>New Business</option>
                  </select>
                  <input className="input-field" placeholder="Expected monthly business (Rs.)" value={form.monthly_potential} onChange={e=>setForm({...form,monthly_potential:e.target.value})} />
                  <textarea className="input-field" rows={2} placeholder="Any additional details..." value={form.message} onChange={e=>setForm({...form,message:e.target.value})} />
                  <button type="submit" className="w-full bg-[var(--color-red)] text-white font-semibold py-3 hover:opacity-90 transition" style={{borderRadius:'var(--radius-md)'}}><Send size={16} className="inline mr-2" />Submit Dealership Application</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
