'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Package, Search, Filter } from 'lucide-react';
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export default function DealerCataloguePage() {
  const [products, setProducts] = useState<any[]>([]);
  const [divisions, setDivisions] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [filterDiv, setFilterDiv] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from('products').select('id, name, code, short_description, pack_sizes, coverage_rate, product_divisions(name), product_categories(name), product_brands(name)').eq('is_active', true).order('name').then(r => { setProducts(r.data || []); setLoading(false); });
    supabase.from('product_divisions').select('id, name').order('sort_order').then(r => setDivisions(r.data || []));
  }, []);

  const filtered = products.filter(p => {
    if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !(p.code||'').toLowerCase().includes(search.toLowerCase())) return false;
    if (filterDiv && p.product_divisions?.name !== filterDiv) return false;
    return true;
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Product Catalogue</h1>
      <p className="text-sm text-gray-500 mb-6">Browse all available products with dealer pricing</p>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 mb-4 flex gap-3">
        <div className="flex-1 relative"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input className="input-field !pl-9 !py-2" placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} /></div>
        <select className="input-field !w-auto !py-2" value={filterDiv} onChange={e => setFilterDiv(e.target.value)}>
          <option value="">All Divisions</option>
          {divisions.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
        </select>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? <div className="p-8 text-center text-gray-400">Loading catalogue...</div> : (
          <div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="bg-gray-50 text-left">
            <th className="px-4 py-3 font-medium text-gray-500">Product</th>
            <th className="px-4 py-3 font-medium text-gray-500 hidden md:table-cell">Division</th>
            <th className="px-4 py-3 font-medium text-gray-500 hidden lg:table-cell">Brand</th>
            <th className="px-4 py-3 font-medium text-gray-500 hidden lg:table-cell">Pack Sizes</th>
            <th className="px-4 py-3 font-medium text-gray-500 hidden md:table-cell">Coverage</th>
          </tr></thead><tbody className="divide-y divide-gray-50">
            {filtered.map(p => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="px-4 py-3"><div className="font-medium text-gray-800">{p.name}</div><div className="text-xs text-gray-400">{p.code} · {p.product_categories?.name}</div></td>
                <td className="px-4 py-3 hidden md:table-cell text-gray-600 text-xs">{p.product_divisions?.name}</td>
                <td className="px-4 py-3 hidden lg:table-cell text-gray-600 text-xs">{p.product_brands?.name}</td>
                <td className="px-4 py-3 hidden lg:table-cell text-gray-500 text-xs">{(p.pack_sizes||[]).join(', ')}</td>
                <td className="px-4 py-3 hidden md:table-cell text-gray-500 text-xs">{p.coverage_rate}</td>
              </tr>
            ))}
          </tbody></table></div>
        )}
        <div className="px-4 py-3 bg-gray-50 text-sm text-gray-500 border-t">{filtered.length} products</div>
      </div>
    </div>
  );
}
