import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { DIVISIONS_DATA } from '@/lib/constants';
import { ArrowRight, Download, FileText, Package } from 'lucide-react';

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { data: div } = await supabase.from('product_divisions').select('name, meta_title, meta_description').eq('slug', params.slug).single();
  if (!div) {
    const fallback = DIVISIONS_DATA.find(d => d.slug === params.slug);
    return { title: fallback?.name || 'Products', description: fallback?.desc };
  }
  return { title: div.meta_title || div.name, description: div.meta_description };
}

export default async function DivisionPage({ params }: Props) {
  const { data: division } = await supabase.from('product_divisions').select('*').eq('slug', params.slug).single();
  const fallbackDiv = DIVISIONS_DATA.find(d => d.slug === params.slug);

  if (!division && !fallbackDiv) notFound();

  const div = division || fallbackDiv;

  const { data: products } = await supabase
    .from('products')
    .select('id, name, slug, short_description, features, application_method, pack_sizes, is_featured, product_images(image_url, is_primary), product_categories(name, slug), product_brands(name, slug)')
    .eq('division_id', division?.id || '')
    .eq('is_active', true)
    .order('sort_order');

  const { data: categories } = await supabase
    .from('product_categories')
    .select('*')
    .eq('division_id', division?.id || '')
    .eq('is_active', true)
    .order('sort_order');

  return (
    <>
      <section className={`bg-gradient-to-br ${fallbackDiv?.color || 'from-brand-500 to-brand-700'} text-white py-16 md:py-24`}>
        <div className="container-wide px-4">
          <p className="text-white/70 text-sm font-medium mb-2 tracking-wider uppercase">Products</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-2">{div?.name}</h1>
          <p className="text-sm text-white/60 font-medium mb-4">{div?.tagline || fallbackDiv?.tagline}</p>
          <p className="text-lg text-white/80 max-w-2xl">{div?.description || fallbackDiv?.desc}</p>
        </div>
      </section>

      {/* Categories filter */}
      {categories && categories.length > 0 && (
        <section className="bg-white border-b border-gray-100 py-4 sticky top-16 md:top-20 z-30 backdrop-blur-sm bg-white/95">
          <div className="container-wide px-4 flex gap-2 overflow-x-auto pb-1">
            <span className="badge-blue font-medium cursor-pointer">All Products</span>
            {categories.map((cat: any) => (
              <span key={cat.id} className="badge bg-gray-100 text-gray-600 hover:bg-brand-50 hover:text-brand-500 cursor-pointer transition whitespace-nowrap">
                {cat.name}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Products grid */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          {products && products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product: any) => {
                const primaryImage = product.product_images?.find((img: any) => img.is_primary)?.image_url;
                return (
                  <Link key={product.id} href={`/products/${params.slug}/${product.slug}`} className="card card-hover group">
                    <div className="h-48 bg-gradient-to-br from-brand-50 to-blue-50 flex items-center justify-center">
                      {primaryImage ? (
                        <img src={primaryImage} alt={product.name} className="h-full w-full object-cover" />
                      ) : (
                        <Package size={48} className="text-brand-300" />
                      )}
                    </div>
                    <div className="p-5">
                      {product.product_brands?.name && (
                        <span className="text-xs font-medium text-accent-400 uppercase tracking-wider">{product.product_brands.name}</span>
                      )}
                      <h3 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-brand-500 transition">{product.name}</h3>
                      {product.product_categories?.name && (
                        <span className="badge-blue text-xs mb-2">{product.product_categories.name}</span>
                      )}
                      <p className="text-sm text-gray-600 line-clamp-2 mt-2">{product.short_description}</p>
                      <div className="mt-4 flex items-center gap-2 text-brand-500 text-sm font-medium">
                        View Details <ArrowRight size={14} />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <Package size={48} className="mx-auto text-brand-300 mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Products Coming Soon</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Our {div?.name} product catalogue is being uploaded. Contact our technical team for immediate assistance.
              </p>
              <Link href="/contact" className="btn-primary mt-6">Contact Technical Team</Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
