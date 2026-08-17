'use client';
import { useState } from 'react';
import { MapPin, Search, Phone, Store, ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';

const dealerBenefits = [
  'Attractive dealer margins and credit terms',
  'Complete product range — decorative through industrial',
  'Marketing support — branding, POS materials, digital assets',
  'Technical training and product knowledge sessions',
  'Dedicated sales representative support',
  'Loyalty programme — Silver, Gold, Platinum, Diamond tiers',
  'Priority access to new product launches',
  'Warranty registration and management tools',
];

export default function DealersPage() {
  const [searchCity, setSearchCity] = useState('');

  return (
    <>
      <section className="gradient-brand text-white py-16 md:py-24">
        <div className="container-wide px-4">
          <p className="text-brand-200 text-sm font-medium mb-2 tracking-wider uppercase">Dealer Network</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Find or Become a Dealer</h1>
          <p className="text-lg text-brand-200 max-w-2xl">Join the Anupam Paints network — backed by 50+ years of manufacturing trust.</p>
        </div>
      </section>

      {/* Find a dealer */}
      <section className="section-padding bg-white">
        <div className="container-wide max-w-3xl">
          <h2 className="section-title text-center mb-8">Find a Dealer Near You</h2>
          <div className="card p-6">
            <div className="flex gap-3">
              <input type="text" placeholder="Enter city, state, or PIN code" className="input-field flex-1"
                value={searchCity} onChange={e => setSearchCity(e.target.value)} />
              <button className="btn-primary"><Search size={18} className="mr-2" /> Search</button>
            </div>
            <div className="mt-6 bg-brand-50 rounded-xl p-8 text-center">
              <MapPin className="mx-auto text-brand-400 mb-2" size={32} />
              <p className="text-sm text-brand-500">[Dealer search results with map will appear here once dealer data is populated]</p>
            </div>
          </div>
        </div>
      </section>

      {/* Become a dealer */}
      <section className="section-padding gradient-light">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-title mb-6">Become an Anupam Paints Dealer</h2>
              <div className="space-y-3 mb-8">
                {dealerBenefits.map((b, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle className="text-green-500 shrink-0 mt-0.5" size={18} />
                    <span className="text-gray-700">{b}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="card p-8">
              <h3 className="text-xl font-bold text-brand-500 mb-4">Dealer Enquiry Form</h3>
              <form className="space-y-4">
                <input type="text" placeholder="Firm Name *" className="input-field" required />
                <input type="text" placeholder="Contact Person *" className="input-field" required />
                <div className="grid grid-cols-2 gap-3">
                  <input type="tel" placeholder="Phone *" className="input-field" required />
                  <input type="email" placeholder="Email" className="input-field" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input type="text" placeholder="City *" className="input-field" required />
                  <input type="text" placeholder="State *" className="input-field" required />
                </div>
                <input type="text" placeholder="GST Number" className="input-field" />
                <input type="text" placeholder="Currently handling brands" className="input-field" />
                <select className="input-field">
                  <option value="">Product Interest</option>
                  <option>Decorative</option>
                  <option>Industrial</option>
                  <option>Both Decorative & Industrial</option>
                  <option>Waterproofing</option>
                  <option>All Products</option>
                </select>
                <button type="submit" className="btn-primary w-full">Submit Dealer Application</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
