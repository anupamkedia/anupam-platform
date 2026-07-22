'use client';
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { Package, Plus, Search, Edit2, Trash2, X, Save, ChevronDown, Eye, EyeOff, Star } from 'lucide-react';

type Product = {
  id: string; name: string; slug: string; code: string; short_description: string;
  description: string; features: string[]; usage_areas: string; surface_prep: string;
  application_method: string; dft_min: number | null; dft_max: number | null;
  coverage_rate: string; pack_sizes: string[]; voc_content: string; standards: string[];
  warranty_years: number | null; is_featured: boolean; is_active: boolean;
  division_id: string; category_id: string; brand_id: string;
  product_divisions?: { name: string }; product_categories?: { name: string }; product_brands?: { name: string };
};

type Division = { id: string; name: string; slug: string };
type Category = { id: string; name: string; division_id: string };
type Brand = { id: string; name: string };

const emptyProduct = {
  name: '', slug: '', code: '', short_description: '', description: '',
  features: [] as string[], usage_areas: '', surface_prep: '', application_method: '',
  dft_min: null as number | null, dft_max: null as number | null, coverage_rate: '',
  pack_sizes: [] as string[], voc_content: '', standards: [] as string[],
  warranty_years: null as number | null, is_featured: false, is_active: true,
  division_id: '', category_id: '', brand_id: '',
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [divisions, setDivisions] = useState<Division[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterDiv, setFilterDiv] = useState('');
  const [editing, setEditing] = useState<Product | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [form, setForm] = useState(emptyProduct);
  const [saving, setSaving] = useState(false);
  const [featuresText, setFeaturesText] = useState('');
  const [packSizesText, setPackSizesText] = useState('');
  const [standardsText, setStandardsText] = useState('');

  const loadData = useCallback(async () => {
    setLoading(true);
    const [prodRes, divRes, catRes, brandRes] = await Promise.all([
      supabase.from('products').select('*, product_divisions(name), product_categories(name), product_brands(name)').order('sort_order'),
      supabase.from('product_divisions').select('id, name, slug').order('sort_order'),
      supabase.from('product_categories').select('id, name, division_id').order('sort_order'),
      supabase.from('product_brands').select('id, name').order('sort_order'),
    ]);
    setProducts(prodRes.data || []);
    setDivisions(divRes.data || []);
    setCategories(catRes.data || []);
    setBrands(brandRes.data || []);
    setLoading(false);
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const openEditor = (product?: Product) => {
    if (product) {
      setEditing(product);
      setIsNew(false);
      setForm({ ...product, features: product.features || [], pack_sizes: product.pack_sizes || [], standards: product.standards || [] });
      setFeaturesText((product.features || []).join('\n'));
      setPackSizesText((product.pack_sizes || []).join(', '));
      setStandardsText((product.standards || []).join(', '));
    } else {
      setEditing(null);
      setIsNew(true);
      setForm({ ...emptyProduct });
      setFeaturesText(''); setPackSizesText(''); setStandardsText('');
    }
  };

  const closeEditor = () => { setEditing(null); setIsNew(false); };

  const autoSlug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  const handleSave = async () => {
    setSaving(true);
    const payload = {
      ...form,
      slug: form.slug || autoSlug(form.name),
      features: featuresText.split('\n').map(f => f.trim()).filter(Boolean),
      pack_sizes: packSizesText.split(',').map(p => p.trim()).filter(Boolean),
      standards: standardsText.split(',').map(s => s.trim()).filter(Boolean),
    };
    delete (payload as any).product_divisions;
    delete (payload as any).product_categories;
    delete (payload as any).product_brands;
    delete (payload as any).id;

    let error;
    if (isNew) {
      const res = await supabase.from('products').insert(payload);
      error = res.error;
    } else if (editing) {
      const res = await supabase.from('products').update(payload).eq('id', editing.id);
      error = res.error;
    }
    setSaving(false);
    if (error) { alert('Error: ' + error.message); return; }
    closeEditor();
    loadData();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this product?')) return;
    await supabase.from('products').delete().eq('id', id);
    loadData();
  };

  const toggleActive = async (id: string, current: boolean) => {
    await supabase.from('products').update({ is_active: !current }).eq('id', id);
    loadData();
  };

  const filtered = products.filter(p => {
    if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !(p.code || '').toLowerCase().includes(search.toLowerCase())) return false;
    if (filterDiv && p.division_id !== filterDiv) return false;
    return true;
  });

  const filteredCategories = categories.filter(c => c.division_id === form.division_id);

  if (editing !== null || isNew) {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">{isNew ? 'Add Product' : 'Edit Product'}</h1>
          <button onClick={closeEditor} className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg"><X size={20} /></button>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
              <input className="input-field" value={form.name} onChange={e => setForm({ ...form, name: e.target.value, slug: autoSlug(e.target.value) })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Code</label>
              <input className="input-field" value={form.code || ''} onChange={e => setForm({ ...form, code: e.target.value })} />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Division *</label>
              <select className="input-field" value={form.division_id} onChange={e => setForm({ ...form, division_id: e.target.value, category_id: '' })}>
                <option value="">Select Division</option>
                {divisions.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select className="input-field" value={form.category_id} onChange={e => setForm({ ...form, category_id: e.target.value })}>
                <option value="">Select Category</option>
                {filteredCategories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
              <select className="input-field" value={form.brand_id} onChange={e => setForm({ ...form, brand_id: e.target.value })}>
                <option value="">Select Brand</option>
                {brands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
            <input className="input-field" value={form.short_description || ''} onChange={e => setForm({ ...form, short_description: e.target.value })} placeholder="One-line product description" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Description</label>
            <textarea className="input-field" rows={4} value={form.description || ''} onChange={e => setForm({ ...form, description: e.target.value })} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Features (one per line)</label>
            <textarea className="input-field" rows={4} value={featuresText} onChange={e => setFeaturesText(e.target.value)} placeholder="Excellent adhesion&#10;High chemical resistance&#10;Low VOC content" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Application Method</label>
              <input className="input-field" value={form.application_method || ''} onChange={e => setForm({ ...form, application_method: e.target.value })} placeholder="Airless spray, brush, roller" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">DFT Min (microns)</label>
              <input type="number" className="input-field" value={form.dft_min ?? ''} onChange={e => setForm({ ...form, dft_min: e.target.value ? Number(e.target.value) : null })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">DFT Max (microns)</label>
              <input type="number" className="input-field" value={form.dft_max ?? ''} onChange={e => setForm({ ...form, dft_max: e.target.value ? Number(e.target.value) : null })} />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Coverage Rate</label>
              <input className="input-field" value={form.coverage_rate || ''} onChange={e => setForm({ ...form, coverage_rate: e.target.value })} placeholder="12 sq.m/litre/coat" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">VOC Content</label>
              <input className="input-field" value={form.voc_content || ''} onChange={e => setForm({ ...form, voc_content: e.target.value })} placeholder="Low VOC / <50 g/L" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Warranty (years)</label>
              <input type="number" className="input-field" value={form.warranty_years ?? ''} onChange={e => setForm({ ...form, warranty_years: e.target.value ? Number(e.target.value) : null })} />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pack Sizes (comma-separated)</label>
              <input className="input-field" value={packSizesText} onChange={e => setPackSizesText(e.target.value)} placeholder="1L, 4L, 10L, 20L" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Standards (comma-separated)</label>
              <input className="input-field" value={standardsText} onChange={e => setStandardsText(e.target.value)} placeholder="IS 15489, ASTM D3359, ISO 12944" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Surface Preparation</label>
            <input className="input-field" value={form.surface_prep || ''} onChange={e => setForm({ ...form, surface_prep: e.target.value })} placeholder="Sa 2½ blast cleaning / wire brushing / sanding" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Usage Areas</label>
            <input className="input-field" value={form.usage_areas || ''} onChange={e => setForm({ ...form, usage_areas: e.target.value })} placeholder="Steel structures, pipelines, storage tanks" />
          </div>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.is_active} onChange={e => setForm({ ...form, is_active: e.target.checked })} className="w-4 h-4 rounded" />
              <span className="text-sm text-gray-700">Active (visible on website)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.is_featured} onChange={e => setForm({ ...form, is_featured: e.target.checked })} className="w-4 h-4 rounded" />
              <span className="text-sm text-gray-700">Featured Product</span>
            </label>
          </div>
          <div className="flex gap-3 pt-4 border-t">
            <button onClick={handleSave} disabled={saving || !form.name || !form.division_id}
              className="btn-primary disabled:opacity-50">
              <Save size={16} className="mr-2" /> {saving ? 'Saving...' : isNew ? 'Create Product' : 'Update Product'}
            </button>
            <button onClick={closeEditor} className="btn-outline">Cancel</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Products</h1>
        <button onClick={() => openEditor()} className="btn-primary text-sm">
          <Plus size={16} className="mr-2" /> Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6 flex flex-col md:flex-row gap-3">
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input className="input-field !pl-9" placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select className="input-field !w-auto" value={filterDiv} onChange={e => setFilterDiv(e.target.value)}>
          <option value="">All Divisions</option>
          {divisions.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
        </select>
      </div>

      {/* Product list */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-400">Loading products...</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center">
            <Package className="mx-auto text-gray-300 mb-3" size={40} />
            <p className="text-gray-500">{products.length === 0 ? 'No products yet. Click "Add Product" to create your first product.' : 'No products match your search.'}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-4 py-3 font-medium text-gray-500">Product</th>
                  <th className="px-4 py-3 font-medium text-gray-500 hidden md:table-cell">Division</th>
                  <th className="px-4 py-3 font-medium text-gray-500 hidden lg:table-cell">Brand</th>
                  <th className="px-4 py-3 font-medium text-gray-500 hidden lg:table-cell">Code</th>
                  <th className="px-4 py-3 font-medium text-gray-500 text-center">Status</th>
                  <th className="px-4 py-3 font-medium text-gray-500 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map(product => (
                  <tr key={product.id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-800">{product.name}</div>
                      <div className="text-xs text-gray-400">{product.short_description}</div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell text-gray-600">{product.product_divisions?.name || '—'}</td>
                    <td className="px-4 py-3 hidden lg:table-cell text-gray-600">{product.product_brands?.name || '—'}</td>
                    <td className="px-4 py-3 hidden lg:table-cell text-gray-500 font-mono text-xs">{product.code || '—'}</td>
                    <td className="px-4 py-3 text-center">
                      <button onClick={() => toggleActive(product.id, product.is_active)}
                        className={`badge text-xs ${product.is_active ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                        {product.is_active ? <><Eye size={12} className="mr-1" /> Live</> : <><EyeOff size={12} className="mr-1" /> Draft</>}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => openEditor(product)} className="p-2 text-gray-500 hover:text-brand-500 hover:bg-brand-50 rounded-lg transition" title="Edit">
                          <Edit2 size={16} />
                        </button>
                        <button onClick={() => handleDelete(product.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition" title="Delete">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="px-4 py-3 bg-gray-50 text-sm text-gray-500 border-t">
          {filtered.length} product{filtered.length !== 1 ? 's' : ''} {search || filterDiv ? '(filtered)' : 'total'}
        </div>
      </div>
    </div>
  );
}
