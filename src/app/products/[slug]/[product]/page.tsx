'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import { getProductImage } from '@/lib/productImages';
import { ChevronRight, Download, Package, Send, FlaskConical, Shield, CheckCircle, X, Droplets, Clock, Layers, Paintbrush, AlertTriangle, Info } from 'lucide-react';
import { useParams } from 'next/navigation';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

function TDSModal({ isOpen, onClose, productName }: { isOpen: boolean; onClose: () => void; productName: string }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', company: '' });
  const [status, setStatus] = useState<'idle'|'sending'|'done'>('idle');
  if (!isOpen) return null;
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setStatus('sending');
    try { await fetch('/api/enquiry', { method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, enquiry_type: 'TDS Download', message: `TDS requested for: ${productName}` }) }); } catch {}
    setStatus('done');
  };
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-md w-full p-6" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-800">Download TDS — {productName}</h3>
          <button onClick={onClose}><X size={20} className="text-gray-400" /></button>
        </div>
        {status === 'done' ? (
          <div className="text-center py-6"><CheckCircle className="mx-auto text-green-500 mb-3" size={48} />
            <h4 className="font-bold text-gray-800 mb-1">Request Received!</h4>
            <p className="text-sm text-gray-600">TDS will be sent to your email/WhatsApp shortly.</p>
            <button onClick={onClose} className="btn-outline mt-4 text-sm">Close</button></div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <p className="text-sm text-gray-500">Fill details to receive the TDS document.</p>
            <input required className="input-field" placeholder="Your Name *" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
            <input required type="tel" className="input-field" placeholder="Phone *" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
            <input type="email" className="input-field" placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
            <input className="input-field" placeholder="Company" value={form.company} onChange={e => setForm({...form, company: e.target.value})} />
            <button type="submit" disabled={status==='sending'} className="btn-primary w-full"><Download size={16} className="mr-2" /> {status==='sending' ? 'Sending...' : 'Get TDS'}</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function ProductDetailPage() {
  const params = useParams();
  const divSlug = params.slug as string;
  const prodSlug = params.product as string;
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showTDS, setShowTDS] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    supabase.from('products').select('*, product_divisions(name, slug), product_categories(name), product_brands(name, slug)')
      .eq('slug', prodSlug).single().then(r => { setProduct(r.data); setLoading(false); });
  }, [prodSlug]);

  if (loading) return <div className="section-padding text-center text-gray-400">Loading product...</div>;
  if (!product) return <div className="section-padding text-center"><h2 className="text-xl font-bold">Product Not Found</h2><Link href={`/products/${divSlug}`} className="btn-primary mt-4">Back</Link></div>;

  const imgUrl = getProductImage(product.code, product.slug);
  const features = product.features || [];
  const tds = product.tds_data || null;
  const gp = tds?.general_properties || {};
  const app = tds?.application || tds || {};
  // Support both nested and flat dilution structures
  const dilution = tds?.dilution || {};
  const flatDilution: Record<string,string> = {};
  if (tds?.dil_brush) flatDilution['Brush'] = tds.dil_brush;
  if (tds?.dil_roller) flatDilution['Roller'] = tds.dil_roller;
  if (tds?.dil_spray) flatDilution['Spray'] = tds.dil_spray;
  if (tds?.dil_smooth) flatDilution['Smooth'] = tds.dil_smooth;
  if (tds?.dilution_brush) flatDilution['Brush'] = tds.dilution_brush;
  if (tds?.dilution_roller) flatDilution['Roller'] = tds.dilution_roller;
  if (tds?.dilution_spray) flatDilution['Spray'] = tds.dilution_spray;
  if (tds?.dilution_smooth) flatDilution['Smooth Brush'] = tds.dilution_smooth;
  const finalDilution = Object.keys(dilution).length > 0 ? dilution : flatDilution;

  return (
    <>
      <TDSModal isOpen={showTDS} onClose={() => setShowTDS(false)} productName={product.name} />

      <section className="bg-brand-500 text-white py-5">
        <div className="container-wide px-4">
          <div className="flex items-center gap-2 text-brand-200 text-sm flex-wrap">
            <Link href="/products" className="hover:text-white">Products</Link><ChevronRight size={14} />
            <Link href={`/products/${divSlug}`} className="hover:text-white">{product.product_divisions?.name}</Link><ChevronRight size={14} />
            <span className="text-white">{product.name}</span>
          </div>
        </div>
      </section>

      {/* Product Header */}
      <section className="section-padding bg-white border-b">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 flex items-center justify-center min-h-[300px]">
              {imgUrl ? <img src={imgUrl} alt={product.name} className="max-h-72 object-contain" /> : <Package size={80} className="text-brand-200" />}
            </div>
            <div>
              {product.product_brands?.name && <img src={`/img/logos/${product.product_brands.slug}.${['asure','atop','amaje'].includes(product.product_brands.slug) ? 'png' : 'jpg'}`} alt="" className="h-10 mb-3" onError={(e: any) => e.target.style.display='none'} />}
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">{product.name}</h1>
              {tds?.type && <span className="badge-blue text-xs mb-3 inline-block">{tds.type}</span>}
              {product.code && <span className="badge bg-gray-100 text-gray-500 text-xs ml-2">{product.code}</span>}
              <p className="text-gray-600 mt-3 leading-relaxed text-sm">{product.description || product.short_description}</p>

              {/* Quick specs strip */}
              <div className="flex flex-wrap gap-3 mt-5">
                {(tds?.durability || product.warranty_years) && <div className="bg-green-50 text-green-700 px-3 py-1.5 rounded-lg text-sm font-medium">🛡️ {tds?.durability || product.warranty_years + ' yrs'}</div>}
                {(tds?.coverage || product.coverage_rate) && <div className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg text-sm font-medium">📏 {tds?.coverage || product.coverage_rate}</div>}
                {(tds?.coats || app?.coats) && <div className="bg-purple-50 text-purple-700 px-3 py-1.5 rounded-lg text-sm font-medium">🎨 {tds?.coats || app?.coats} Coats</div>}
                {(tds?.voc || product.voc_content) && <div className="bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-lg text-sm font-medium">🌿 VOC {tds?.voc || product.voc_content}</div>}
                {tds?.finish && <div className="bg-amber-50 text-amber-700 px-3 py-1.5 rounded-lg text-sm font-medium">✨ {tds.finish}</div>}
              </div>

              <div className="flex flex-wrap gap-3 mt-6">
                <Link href="/contact" className="btn-primary text-sm"><Send size={14} className="mr-2" /> Request Quote</Link>
                <Link href="/contact" className="btn-outline text-sm"><FlaskConical size={14} className="mr-2" /> Request Sample</Link>
                <button onClick={() => setShowTDS(true)} className="btn-outline text-sm"><Download size={14} className="mr-2" /> Download TDS</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TDS Tabs */}
      {tds && (
        <section className="section-padding bg-gray-50">
          <div className="container-wide">
            <div className="flex gap-1 mb-6 overflow-x-auto pb-2">
              {[{id:'overview',label:'Overview',icon:Info},{id:'application',label:'Application',icon:Paintbrush},{id:'properties',label:'Properties',icon:Shield},{id:'safety',label:'Safety & Packing',icon:AlertTriangle}].map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition ${activeTab === tab.id ? 'bg-brand-500 text-white shadow' : 'bg-white text-gray-600 hover:bg-brand-50'}`}>
                  <tab.icon size={16} /> {tab.label}
                </button>
              ))}
            </div>

            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {features.length > 0 && (
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><Shield size={18} className="text-green-500" /> Key Features</h3>
                    <ul className="space-y-2">{features.map((f: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700"><CheckCircle size={14} className="text-green-500 mt-0.5 shrink-0" /> {f}</li>
                    ))}</ul>
                  </div>
                )}
                {tds.benefits && (
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><Info size={18} className="text-brand-500" /> Product Benefits</h3>
                    <ul className="space-y-2">{tds.benefits.map((b: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700"><ChevronRight size={14} className="text-brand-500 mt-0.5 shrink-0" /> {b}</li>
                    ))}</ul>
                  </div>
                )}
                {(tds.primer || tds.putty || tds.recommended) && (
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h3 className="font-bold text-gray-800 mb-4">Recommended System</h3>
                    {(tds.primer || tds.recommended?.primer) && <div className="mb-3"><span className="text-xs text-gray-500 block">Recommended Primer</span><span className="text-sm font-medium text-gray-800">{tds.primer || tds.recommended?.primer}</span></div>}
                    {(tds.putty || tds.recommended?.putty) && <div className="mb-3"><span className="text-xs text-gray-500 block">Recommended Putty</span><span className="text-sm font-medium text-gray-800">{tds.putty || tds.recommended?.putty}</span></div>}
                    {tds.primer_ferrous && <div className="mb-3"><span className="text-xs text-gray-500 block">Primer (Ferrous Metal)</span><span className="text-sm font-medium text-gray-800">{tds.primer_ferrous}</span></div>}
                    {tds.primer_wood && <div><span className="text-xs text-gray-500 block">Primer (Wood)</span><span className="text-sm font-medium text-gray-800">{tds.primer_wood}</span></div>}
                  </div>
                )}
              </div>
            )}

            {/* Application Tab */}
            {activeTab === 'application' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {(tds?.drying || app?.drying_time) && <div className="bg-white rounded-xl p-5 shadow-sm text-center"><Clock className="mx-auto text-blue-500 mb-2" size={24} /><div className="text-xs text-gray-500">Drying Time</div><div className="font-bold text-gray-800">{tds?.drying || app?.drying_time}</div></div>}
                  {(tds?.overcoat || app?.overcoating_time) && <div className="bg-white rounded-xl p-5 shadow-sm text-center"><Layers className="mx-auto text-purple-500 mb-2" size={24} /><div className="text-xs text-gray-500">Overcoating Time</div><div className="font-bold text-gray-800">{tds?.overcoat || app?.overcoating_time}</div></div>}
                  {(tds?.coats || app?.coats) && <div className="bg-white rounded-xl p-5 shadow-sm text-center"><Paintbrush className="mx-auto text-orange-500 mb-2" size={24} /><div className="text-xs text-gray-500">Coats Required</div><div className="font-bold text-gray-800">{tds?.coats || app?.coats}</div></div>}
                  {(tds?.coverage || app?.coverage || product.coverage_rate) && <div className="bg-white rounded-xl p-5 shadow-sm text-center"><Droplets className="mx-auto text-green-500 mb-2" size={24} /><div className="text-xs text-gray-500">Coverage</div><div className="font-bold text-gray-800 text-sm">{tds?.coverage || app?.coverage || product.coverage_rate}</div></div>}
                </div>
                {Object.keys(finalDilution).length > 0 && (
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h3 className="font-bold text-gray-800 mb-4">Dilution Ratios</h3>
                    <div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="bg-gray-50"><th className="px-4 py-2 text-left font-medium text-gray-500">Method</th><th className="px-4 py-2 text-left font-medium text-gray-500">Dilution</th></tr></thead>
                    <tbody>{Object.entries(finalDilution).map(([method, ratio]) => (
                      <tr key={method} className="border-t border-gray-50"><td className="px-4 py-3 font-medium text-gray-800">{method}</td><td className="px-4 py-3 text-gray-600">{ratio as string}</td></tr>
                    ))}</tbody></table></div>
                  </div>
                )}
                {tds.surface_prep && (
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h3 className="font-bold text-gray-800 mb-3">Surface Preparation & Application</h3>
                    <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{tds.surface_prep}</div>
                  </div>
                )}
              </div>
            )}

            {/* Properties Tab */}
            {activeTab === 'properties' && Object.keys(gp).length > 0 && (
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-bold text-gray-800 mb-4">General Properties</h3>
                <div className="overflow-x-auto"><table className="w-full text-sm"><tbody>
                  {Object.entries(gp).map(([prop, val]) => (
                    <tr key={prop} className="border-t border-gray-50"><td className="px-4 py-3 font-medium text-gray-700 w-1/3">{prop}</td><td className="px-4 py-3 text-gray-800">{val as string}</td></tr>
                  ))}
                </tbody></table></div>
              </div>
            )}

            {/* Safety Tab */}
            {activeTab === 'safety' && (
              <div className="space-y-6">
                {tds.precautions && (
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><AlertTriangle size={18} className="text-amber-500" /> Precautions</h3>
                    <ul className="space-y-2">{tds.precautions.map((p: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700"><AlertTriangle size={12} className="text-amber-400 mt-1 shrink-0" /> {p}</li>
                    ))}</ul>
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {tds.safety && <div className="bg-white rounded-xl p-6 shadow-sm"><h3 className="font-bold text-gray-800 mb-2">Safety & Environment</h3><p className="text-sm text-gray-600">{tds.safety}</p></div>}
                  {tds.voc && <div className="bg-white rounded-xl p-6 shadow-sm"><h3 className="font-bold text-gray-800 mb-2">VOC Level</h3><p className="text-sm text-gray-600">{tds.voc}</p></div>}
                  {tds.packing && <div className="bg-white rounded-xl p-6 shadow-sm"><h3 className="font-bold text-gray-800 mb-2">Pack Sizes</h3>{Object.entries(tds.packing).map(([k,v]) => (<div key={k} className="mb-1"><span className="text-xs text-gray-500">{k}:</span><span className="text-sm text-gray-800 ml-2">{v as string}</span></div>))}</div>}
                  {tds.bases && <div className="bg-white rounded-xl p-6 shadow-sm"><h3 className="font-bold text-gray-800 mb-2">Base Information</h3><p className="text-sm text-gray-600">{tds.bases}</p></div>}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* No TDS fallback - show basic specs */}
      {!tds && (
        <section className="section-padding bg-gray-50">
          <div className="container-wide">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.length > 0 && (
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="font-bold text-gray-800 mb-3">Key Features</h3>
                  <ul className="space-y-2">{features.map((f: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-sm"><CheckCircle size={14} className="text-green-500 mt-0.5" /> {f}</li>
                  ))}</ul>
                </div>
              )}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-bold text-gray-800 mb-3">Specifications</h3>
                <div className="space-y-2 text-sm">
                  {product.application_method && <div><span className="text-gray-500">Application:</span> <span className="font-medium">{product.application_method}</span></div>}
                  {product.coverage_rate && <div><span className="text-gray-500">Coverage:</span> <span className="font-medium">{product.coverage_rate}</span></div>}
                  {(product.dft_min || product.dft_max) && <div><span className="text-gray-500">DFT:</span> <span className="font-medium">{product.dft_min}-{product.dft_max} microns</span></div>}
                  {product.warranty_years && <div><span className="text-gray-500">Warranty:</span> <span className="font-medium">{product.warranty_years} Years</span></div>}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
