import { Metadata } from 'next';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { DIVISIONS_DATA } from '@/lib/constants';
import { ArrowRight, Search } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Products',
  description: 'Explore Anupam Paints complete product range — decorative, industrial protective, marine, railway, and specialty coatings. 500+ products.',
};

async function getDivisions() {
  const { data } = await supabase.from('product_divisions').select('*, product_categories(id, name, slug)').eq('is_active', true).order('sort_order');
  return data || [];
}

export default async function ProductsPage() {
  const divisions = await getDivisions();
  const displayDivisions = divisions.length > 0 ? divisions : DIVISIONS_DATA;

  return (
    <>
      <section className="gradient-brand text-white py-16 md:py-24">
        <div className="container-wide px-4">
          <p className="text-brand-200 text-sm font-medium mb-2 tracking-wider uppercase">Products</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Product Range</h1>
          <p className="text-lg text-brand-200 max-w-2xl">500+ coating products across 5 divisions — from premium decorative finishes to high-performance industrial protection systems.</p>
        </div>
      </section>

      {/* Product Finder CTA */}
      <section className="bg-brand-50 py-8 border-b border-brand-100">
        <div className="container-wide px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Search className="text-brand-500" size={24} />
            <div>
              <div className="font-bold text-brand-500">Not sure which product you need?</div>
              <div className="text-sm text-gray-600">Use our smart Product Finder to get recommendations based on your requirements.</div>
            </div>
          </div>
          <Link href="/products?finder=true" className="btn-primary shrink-0">Open Product Finder</Link>
        </div>
      </section>

      {/* Divisions */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          {displayDivisions.map((div: any, i: number) => {
            const divData = DIVISIONS_DATA.find(d => d.slug === div.slug);
            return (
              <div key={div.slug || i} className={`mb-12 last:mb-0 ${i % 2 === 1 ? 'bg-gray-50 -mx-4 px-4 md:-mx-8 md:px-8 py-8 rounded-2xl' : ''}`}>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-brand-500">{div.name}</h2>
                    <p className="text-accent-400 font-medium">{div.tagline || divData?.tagline}</p>
                    <p className="text-gray-600 mt-2 max-w-2xl">{div.description || divData?.desc}</p>
                  </div>
                  <Link href={`/products/${div.slug}`} className="btn-outline shrink-0 self-start">
                    View All <ArrowRight size={16} className="ml-1" />
                  </Link>
                </div>
                {div.product_categories && div.product_categories.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {div.product_categories.map((cat: any) => (
                      <Link key={cat.id} href={`/products/${div.slug}?category=${cat.slug}`}
                        className="badge-blue hover:bg-brand-100 transition">
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
