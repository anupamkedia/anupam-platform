'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { ShoppingCart, Plus, Search, Package, Send, X, CheckCircle, Trash2 } from 'lucide-react';
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export default function DealerOrdersPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [cart, setCart] = useState<{product: any, qty: number}[]>([]);
  const [search, setSearch] = useState('');
  const [showCatalogue, setShowCatalogue] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    supabase.from('products').select('id, name, code, pack_sizes, product_divisions(name), product_brands(name)').eq('is_active', true).order('name').then(r => setProducts(r.data || []));
  }, []);

  const filtered = products.filter(p => !search || p.name.toLowerCase().includes(search.toLowerCase()) || (p.code||'').toLowerCase().includes(search.toLowerCase()));
  const addToCart = (product: any) => {
    if (cart.find(c => c.product.id === product.id)) return;
    setCart([...cart, { product, qty: 1 }]);
  };
  const updateQty = (id: string, qty: number) => setCart(cart.map(c => c.product.id === id ? {...c, qty} : c));
  const removeFromCart = (id: string) => setCart(cart.filter(c => c.product.id !== id));

  const submitOrder = async () => {
    // TODO: Save to dealer_orders table with auth user
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setCart([]); }, 3000);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Place Order</h1>
        <button onClick={() => setShowCatalogue(!showCatalogue)} className="btn-primary text-sm"><Plus size={16} className="mr-2" /> Add Products</button>
      </div>

      {submitted && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 flex items-center gap-3">
          <CheckCircle className="text-green-500" size={24} />
          <div><div className="font-medium text-green-800">Order Submitted!</div><div className="text-sm text-green-600">Your order has been sent for processing. You will receive confirmation shortly.</div></div>
        </div>
      )}

      {showCatalogue && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-gray-800">Select Products</h2>
            <button onClick={() => setShowCatalogue(false)}><X size={20} className="text-gray-400" /></button>
          </div>
          <div className="relative mb-3">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input className="input-field !pl-9 !py-2" placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div className="max-h-60 overflow-y-auto divide-y divide-gray-50">
            {filtered.slice(0, 20).map(p => (
              <div key={p.id} className="flex items-center justify-between py-2 px-1 hover:bg-gray-50">
                <div>
                  <div className="text-sm font-medium text-gray-800">{p.name}</div>
                  <div className="text-xs text-gray-400">{p.code} · {p.product_divisions?.name} · {p.product_brands?.name}</div>
                </div>
                <button onClick={() => addToCart(p)} disabled={!!cart.find(c => c.product.id === p.id)}
                  className={`text-xs px-3 py-1 rounded-lg ${cart.find(c => c.product.id === p.id) ? 'bg-green-50 text-green-600' : 'bg-brand-50 text-brand-500 hover:bg-brand-100'}`}>
                  {cart.find(c => c.product.id === p.id) ? '✓ Added' : '+ Add'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100"><h2 className="font-bold text-gray-800">Order Cart ({cart.length} items)</h2></div>
        {cart.length === 0 ? (
          <div className="p-8 text-center"><ShoppingCart className="mx-auto text-gray-300 mb-2" size={32} /><p className="text-sm text-gray-500">Click &quot;Add Products&quot; to start building your order.</p></div>
        ) : (
          <>
            <div className="divide-y divide-gray-50">
              {cart.map(item => (
                <div key={item.product.id} className="p-4 flex items-center gap-4">
                  <Package className="text-brand-400 shrink-0" size={20} />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-800">{item.product.name}</div>
                    <div className="text-xs text-gray-400">{item.product.code}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-xs text-gray-500">Qty:</label>
                    <input type="number" min={1} value={item.qty} onChange={e => updateQty(item.product.id, Number(e.target.value))} className="w-16 input-field !py-1 text-center text-sm" />
                  </div>
                  <button onClick={() => removeFromCart(item.product.id)} className="p-1 text-gray-400 hover:text-red-500"><Trash2 size={16} /></button>
                </div>
              ))}
            </div>
            <div className="p-4 bg-gray-50 border-t flex justify-between items-center">
              <div className="text-sm text-gray-600">{cart.length} products · {cart.reduce((a,c) => a + c.qty, 0)} total quantity</div>
              <button onClick={submitOrder} className="btn-primary text-sm"><Send size={14} className="mr-2" /> Submit Order</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
