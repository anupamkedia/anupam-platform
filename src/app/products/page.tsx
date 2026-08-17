'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import { DIVISIONS_DATA } from '@/lib/constants';
import { ArrowRight, Package } from 'lucide-react';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

const divImages: Record<string, string> = {
  decorative: '/img/divisions/div-decorative.png',
  industrial: '/img/divisions/div-industrial.png',
  marine: '/img/divisions/div-specialty.png',
  railway: '/img/divisions/div-railway.png',
  specialty: '/img/divisions/div-industrial.png',
};

const divAccents: Record<string, string> = {
  decorative: 'var(--accent-decorative)',
  industrial: 'var(--accent-industrial)',
  marine: 'var(--accent-marine)',
  railway: 'var(--accent-railway)',
  specialty: 'var(--accent-specialty)',
};

export default function ProductsPage() {
  const [divisions, setDivisions] = useState<any[]>([]);
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    supabase.from('product_divisions').select('*').eq('is_active', true).order('sort_order').then(r => setDivisions(r.data || []));
    supabase.from('products').select('division_id').eq('is_active', true).then(r => {
      const c: Record<string, number> = {};
      (r.data || []).forEach((p: any) => { c[p.division_id] = (c[p.division_id] || 0) + 1; });
      setCounts(c);
    });
  }, []);

  const display = divisions.length > 0 ? divisions : DIVISIONS_DATA.map(d => ({ ...d, id: d.slug }));

  return (
    <>
      <section className="relative text-white overflow-hidden">
        <img src="/img/heroes/hero-products.png" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[var(--color-navy)]/75" />
        <div className="py-16 md:py-24 relative z-10">
        <div className="container-wide">
          <div className="section-divider !bg-[var(--color-red)] !mb-6" />
          <h1 className="text-page-title mb-3" style={{color:"white"}}>Our Product Range</h1>
          <p style={{color:"rgba(255,255,255,0.5)"}} className="max-w-2xl">From premium decorative finishes to high-performance industrial coatings — a complete range from a single manufacturer with 50+ years of formulation expertise.</p>
        </div>
      </div></section>

      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {display.map((div: any) => {
              const fallback = DIVISIONS_DATA.find(d => d.slug === div.slug);
              const slug = div.slug || '';
              return (
                <Link key={slug} href={`/products/${slug}`} className="group relative overflow-hidden" style={{borderRadius: 'var(--radius-lg)'}}>
                  <div className="h-72 overflow-hidden">
                    <img src={divImages[slug] || ''} alt={div.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="w-10 h-1 mb-3" style={{background: divAccents[slug] || 'var(--color-red)'}} />
                    <h2 className="text-2xl font-bold text-white mb-1">{div.name || fallback?.name}</h2>
                    <p className="text-sm text-white/60 mb-2">{div.tagline || fallback?.tagline}</p>
                    <p className="text-sm text-white/40 line-clamp-2 mb-3">{div.description || fallback?.desc}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-white/50 text-xs">{counts[div.id] || '—'} Products</span>
                      <span className="text-white text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">View Range <ArrowRight size={14} /></span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Quick links */}
          <div className="mt-12 pt-8 border-t border-[var(--color-border)]">
            <div className="text-label mb-4">Tools & Resources</div>
            <div className="flex flex-wrap gap-3">
              <Link href="/product-finder" className="btn-outline text-sm">Product Finder</Link>
              <Link href="/calculator" className="btn-outline text-sm">Paint Calculator</Link>
              <Link href="/shade-card" className="btn-outline text-sm">Shade Card</Link>
              <Link href="/color-visualizer" className="btn-outline text-sm">Colour Visualizer</Link>
              <Link href="/technical-library" className="btn-outline text-sm">Technical Library</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
