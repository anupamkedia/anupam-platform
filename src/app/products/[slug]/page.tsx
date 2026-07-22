'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import { DIVISIONS_DATA } from '@/lib/constants';
import { getProductImage, getBrandLogo } from '@/lib/productImages';
import { ArrowRight, Package } from 'lucide-react';
import { useParams } from 'next/navigation';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export default function DivisionPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [division, setDivision] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    async function load() {
      const { data: div } = await supabase.from('product_divisions').select('*').eq('slug', slug).single();
      setDivision(div);
      if (div) {
        const { data: prods } = await supabase.from('products')
          .select('id, name, slug, code, short_description, features, application_method, dft_min, dft_max, coverage_rate, pack_sizes, is_featured, product_categories(id, name, slug), product_brands(name, slug)')
          .eq('division_id', div.id).eq('is_active', true).order('sort_order');
        setProducts(prods || []);
        const { data: cats } = await supabase.from('product_categories').select('*').eq('division_id', div.id).eq('is_active', true).order('sort_order');
        setCategories(cats || []);
      }
      setLoading(false);
    }
    load();
  }, [slug]);

  const fallbackDiv = DIVISIONS_DATA.find(d => d.slug === slug);
  const divColor = fallbackDiv?.color || 'from-brand-500 to-brand-700';
  const filteredProducts = activeCategory === 'all' ? products : products.filter(p => p.product_categories?.id === activeCategory);

  return (
    <>
      <section className={`bg-gradient-to-br ${divColor} text-white py-16 md:py-24 relative overflow-hidden`}>
        <div className="container-wide px-4 relative z-10">
          <p className="text-white/70 text-sm font-medium mb-2 tracking-wider uppercase">Products</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-2">{division?.name || fallbackDiv?.name || slug}</h1>
          {(division?.tagline || fallbackDiv?.tagline) && <p className="text-sm text-white/60 font-medium mb-4">{division?.tagline || fallbackDiv?.tagline}</p>}
          <p className="text-lg text-white/80 max-w-2xl">{division?.description || fallbackDiv?.desc || ''}</p>
          <p className="text-white/50 text-sm mt-4">{filteredProducts.length} products</p>
        </div>
      </section>

      {categories.length > 0 && (
        <section className="bg-white border-b border-gray-100 py-4 sticky top-16 md:top-20 z-30 backdrop-blur-sm bg-white/95">
          <div className="container-wide px-4 flex gap-2 overflow-x-auto pb-1">
            <button onClick={() => setActiveCategory('all')} className={`badge font-medium whitespace-nowrap ${activeCategory === 'all' ? 'bg-brand-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-brand-50'}`}>All Products</button>
            {categories.map((cat: any) => (
              <button key={cat.id} onClick={() => setActiveCategory(cat.id)} className={`badge whitespace-nowrap ${activeCategory === cat.id ? 'bg-brand-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-brand-50 hover:text-brand-500'} cursor-pointer transition`}>{cat.name}</button>
            ))}
          </div>
        </section>
      )}

      <section className="section-padding bg-white">
        <div className="container-wide">
          {loading ? (
            <div className="text-center py-16"><p className="text-gray-400 text-lg">Loading products...</p></div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product: any) => {
                const imgUrl = getProductImage(product.code, product.slug);
                return (
                  <Link key={product.id} href={`/products/${slug}/${product.slug}`} className="card card-hover group">
                    <div className="h-52 bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center overflow-hidden">
                      {imgUrl ? (
                        <img src={imgUrl} alt={product.name} className="h-full w-full object-contain p-4 group-hover:scale-105 transition-transform duration-300" />
                      ) : (
                        <Package size={48} className="text-brand-300" />
                      )}
                    </div>
                    <div className="p-5">
                      {product.product_brands?.name && (
                        <span className="text-xs font-semibold text-accent-400 uppercase tracking-wider">{product.product_brands.name}</span>
                      )}
                      <h3 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-brand-500 transition">{product.name}</h3>
                      {product.product_categories?.name && (
                        <span className="badge-blue text-xs mb-2 inline-block">{product.product_categories.name}</span>
                      )}
                      <p className="text-sm text-gray-600 line-clamp-2 mt-2">{product.short_description}</p>
                      <div className="flex items-center justify-between mt-4">
                        {product.code && <span className="text-xs text-gray-400 font-mono">{product.code}</span>}
                        <span className="text-brand-500 text-sm font-medium flex items-center gap-1">Details <ArrowRight size={14} /></span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <Package size={48} className="mx-auto text-brand-300 mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">No Products in This Category</h3>
              <button onClick={() => setActiveCategory('all')} className="btn-outline mt-4">Show All Products</button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
