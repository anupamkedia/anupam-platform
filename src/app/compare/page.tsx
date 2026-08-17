'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Plus, X, ArrowRight } from 'lucide-react';
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export default function ComparePage() {
  const [products, setProducts] = useState<any[]>([]);
  const [selected, setSelected] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => { supabase.from('products').select('*,product_divisions(name),product_brands(name)').eq('is_active',true).order('name').then(r=>setProducts(r.data||[])); },[]);

  const filtered = products.filter(p => search && p.name.toLowerCase().includes(search.toLowerCase()) && !selected.find(s=>s.id===p.id));
  const addProduct = (p:any) => { if(selected.length<4){setSelected([...selected,p]);setSearch('');setShowPicker(false);} };
  const removeProduct = (id:string) => setSelected(selected.filter(s=>s.id!==id));

  const fields = [
    {label:'Division',get:(p:any)=>p.product_divisions?.name||'-'},
    {label:'Brand',get:(p:any)=>p.product_brands?.name||'-'},
    {label:'Coverage',get:(p:any)=>p.coverage_rate||p.tds_data?.coverage||'-'},
    {label:'Warranty',get:(p:any)=>p.warranty_years?p.warranty_years+' years':'-'},
    {label:'Application',get:(p:any)=>p.application_method||p.tds_data?.application||'Brush/Roller/Spray'},
    {label:'Finish',get:(p:any)=>p.tds_data?.finish||'-'},
    {label:'Durability',get:(p:any)=>p.tds_data?.durability||'-'},
    {label:'VOC',get:(p:any)=>p.tds_data?.voc||p.voc_content||'-'},
    {label:'Drying Time',get:(p:any)=>p.tds_data?.drying||'-'},
    {label:'Overcoating',get:(p:any)=>p.tds_data?.overcoat||'-'},
    {label:'Coats',get:(p:any)=>p.tds_data?.coats||'-'},
    {label:'Dilution (Brush)',get:(p:any)=>p.tds_data?.dil_brush||'-'},
    {label:'Dilution (Spray)',get:(p:any)=>p.tds_data?.dil_spray||'-'},
  ];

  return (
    <>
      <section className="relative text-white overflow-hidden">
        <img src="/img/heroes/hero-compare.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[var(--color-navy)]/75" />
        <div className="py-16 md:py-24 relative z-10">
        <div className="container-wide"><div className="w-12 h-[2px] bg-[var(--color-red)] mb-6" />
          <h1 className="text-page-title text-white mb-4">Compare Products</h1>
          <p className="text-white/50 max-w-xl">Select 2-4 Anupam products to compare specifications side by side.</p>
        </div>
      </div>
      </section>
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="flex gap-3 mb-8 flex-wrap">
            {selected.map(p=>(
              <div key={p.id} className="card px-4 py-2 flex items-center gap-2">
                <span className="text-sm font-semibold text-[var(--color-navy)]">{p.name}</span>
                <button onClick={()=>removeProduct(p.id)}><X size={14} className="text-[var(--color-steel)]" /></button>
              </div>
            ))}
            {selected.length<4 && (
              <div className="relative">
                <button onClick={()=>setShowPicker(!showPicker)} className="card px-4 py-2 flex items-center gap-2 hover:border-[var(--color-navy)] transition">
                  <Plus size={14} className="text-[var(--color-navy)]" /><span className="text-sm text-[var(--color-steel)]">Add Product</span>
                </button>
                {showPicker && (
                  <div className="absolute top-full left-0 mt-1 bg-white shadow-xl border border-[var(--color-border)] w-80 z-50 p-3" style={{borderRadius:'var(--radius-lg)'}}>
                    <input className="input-field mb-2" placeholder="Search products..." value={search} onChange={e=>setSearch(e.target.value)} autoFocus />
                    <div className="max-h-60 overflow-y-auto space-y-1">
                      {filtered.slice(0,10).map(p=>(
                        <button key={p.id} onClick={()=>addProduct(p)} className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-50 text-[var(--color-graphite)]">{p.name}</button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          {selected.length>=2 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-[var(--color-border)]">
                  <th className="text-left py-3 px-4 text-xs font-semibold uppercase tracking-wider text-[var(--color-steel)]">Specification</th>
                  {selected.map(p=><th key={p.id} className="text-left py-3 px-4 font-semibold text-[var(--color-navy)]">{p.name}</th>)}
                </tr></thead>
                <tbody>
                  {fields.map(f=>(
                    <tr key={f.label} className="border-b border-gray-50">
                      <td className="py-3 px-4 text-xs font-semibold text-[var(--color-steel)] uppercase tracking-wider">{f.label}</td>
                      {selected.map(p=><td key={p.id} className="py-3 px-4 text-[var(--color-graphite)]">{f.get(p)}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-16 text-[var(--color-steel)]">
              <p className="text-lg mb-2">Select at least 2 products to compare</p>
              <p className="text-sm">Click "Add Product" and search by name</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
