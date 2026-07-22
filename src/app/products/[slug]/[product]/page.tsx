'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import { getProductImage } from '@/lib/productImages';
import { ChevronRight, Download, Package, Send, FlaskConical, Shield } from 'lucide-react';
import { useParams } from 'next/navigation';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export default function ProductDetailPage() {
  const params = useParams();
  const divSlug = params.slug as string;
  const prodSlug = params.product as string;
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from('products')
      .select('*, product_divisions(name, slug), product_categories(name), product_brands(name, slug)')
      .eq('slug', prodSlug).single()
      .then(r => { setProduct(r.data); setLoading(false); });
  }, [prodSlug]);

  if (loading) return <div className="section-padding text-center text-gray-400">Loading product...</div>;
  if (!product) return <div className="section-padding text-center"><h2 className="text-xl font-bold text-gray-800">Product Not Found</h2><Link href={`/products/${divSlug}`} className="btn-primary mt-4">Back to Products</Link></div>;

  const imgUrl = getProductImage(product.code, product.slug);
  const features = product.features || [];
  const packSizes = product.pack_sizes || [];
  const standards = product.standards || [];

  return (
    <>
      <section className="bg-brand-500 text-white py-6">
        <div className="container-wide px-4">
          <div className="flex items-center gap-2 text-brand-200 text-sm">
            <Link href="/products" className="hover:text-white">Products</Link><ChevronRight size={14} />
            <Link href={`/products/${divSlug}`} className="hover:text-white">{product.product_divisions?.name}</Link><ChevronRight size={14} />
            <span className="text-white">{product.name}</span>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 flex items-center justify-center min-h-[350px]">
              {imgUrl ? (
                <img src={imgUrl} alt={product.name} className="max-h-80 object-contain" />
              ) : (
                <Package size={80} className="text-brand-200" />
              )}
            </div>
            <div>
              {product.product_brands?.name && <span className="text-accent-400 text-sm font-semibold uppercase tracking-wider">{product.product_brands.name}</span>}
              <h1 className="text-3xl font-bold text-gray-800 mt-1 mb-2">{product.name}</h1>
              {product.code && <span className="badge-blue text-xs mb-4 inline-block">Code: {product.code}</span>}
              <p className="text-gray-600 mt-4 leading-relaxed">{product.description || product.short_description}</p>

              {features.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-bold text-gray-800 mb-2">Key Features</h3>
                  <ul className="space-y-1.5">{features.map((f: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700"><Shield size={14} className="text-green-500 mt-0.5 shrink-0" /> {f}</li>
                  ))}</ul>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3 mt-6">
                {product.application_method && <div className="bg-gray-50 rounded-lg p-3"><div className="text-xs text-gray-500">Application</div><div className="text-sm font-medium text-gray-800">{product.application_method}</div></div>}
                {(product.dft_min || product.dft_max) && <div className="bg-gray-50 rounded-lg p-3"><div className="text-xs text-gray-500">DFT</div><div className="text-sm font-medium text-gray-800">{product.dft_min}–{product.dft_max} {product.dft_unit || 'microns'}</div></div>}
                {product.coverage_rate && <div className="bg-gray-50 rounded-lg p-3"><div className="text-xs text-gray-500">Coverage</div><div className="text-sm font-medium text-gray-800">{product.coverage_rate}</div></div>}
                {product.voc_content && <div className="bg-gray-50 rounded-lg p-3"><div className="text-xs text-gray-500">VOC</div><div className="text-sm font-medium text-gray-800">{product.voc_content}</div></div>}
                {product.warranty_years && <div className="bg-gray-50 rounded-lg p-3"><div className="text-xs text-gray-500">Warranty</div><div className="text-sm font-medium text-gray-800">{product.warranty_years} Years</div></div>}
                {product.surface_prep && <div className="bg-gray-50 rounded-lg p-3"><div className="text-xs text-gray-500">Surface Prep</div><div className="text-sm font-medium text-gray-800">{product.surface_prep}</div></div>}
              </div>

              {packSizes.length > 0 && <div className="mt-4"><span className="text-sm text-gray-500">Pack Sizes: </span><span className="text-sm font-medium text-gray-800">{packSizes.join(', ')}</span></div>}
              {standards.length > 0 && <div className="mt-2"><span className="text-sm text-gray-500">Standards: </span><span className="text-sm font-medium text-gray-800">{standards.join(', ')}</span></div>}

              <div className="flex flex-wrap gap-3 mt-8">
                <Link href="/contact" className="btn-primary"><Send size={16} className="mr-2" /> Request Quote</Link>
                <Link href="/contact" className="btn-outline"><FlaskConical size={16} className="mr-2" /> Request Sample</Link>
                <button className="btn-outline"><Download size={16} className="mr-2" /> Download TDS</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
