'use client';
import { useState } from 'react';
import { Shield, CheckCircle, Search, Upload, Camera } from 'lucide-react';

export default function CustomerWarrantyPage() {
  const [tab, setTab] = useState<'register' | 'check'>('register');
  const [form, setForm] = useState({ product_name: '', customer_name: '', phone: '', email: '', dealer_name: '', painter_name: '', batch_number: '', surface_type: '', area_sqft: '', coats: '2', application_date: '' });
  const [regNumber, setRegNumber] = useState('');
  const [lookupNumber, setLookupNumber] = useState('');
  const [lookupResult, setLookupResult] = useState<any>(null);
  const [status, setStatus] = useState<'idle' | 'saving' | 'done' | 'error'>('idle');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('saving');
    try {
      const res = await fetch('/api/warranty', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, product_id: null }),
      });
      const data = await res.json();
      if (res.ok) { setRegNumber(data.registration_number); setStatus('done'); }
      else { setStatus('error'); }
    } catch { setStatus('error'); }
  };

  const handleLookup = async () => {
    if (!lookupNumber) return;
    const res = await fetch(`/api/warranty?registration_number=${lookupNumber}`);
    const data = await res.json();
    setLookupResult(res.ok ? data : { error: 'Not found' });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Warranty</h1>
      <div className="flex gap-2 mb-6">
        <button onClick={() => setTab('register')} className={`px-4 py-2 rounded-lg text-sm font-medium ${tab === 'register' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600'}`}>Register Warranty</button>
        <button onClick={() => setTab('check')} className={`px-4 py-2 rounded-lg text-sm font-medium ${tab === 'check' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600'}`}>Check Status</button>
      </div>

      {tab === 'register' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          {status === 'done' ? (
            <div className="text-center py-8">
              <CheckCircle className="mx-auto text-green-500 mb-3" size={48} />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Warranty Registered!</h3>
              <p className="text-gray-600 mb-1">Registration Number:</p>
              <p className="text-2xl font-mono font-bold text-purple-600 mb-4">{regNumber}</p>
              <p className="text-sm text-gray-500">Save this number. Your warranty certificate will be generated after inspection.</p>
              <button onClick={() => { setStatus('idle'); setForm({ product_name: '', customer_name: '', phone: '', email: '', dealer_name: '', painter_name: '', batch_number: '', surface_type: '', area_sqft: '', coats: '2', application_date: '' }); }} className="btn-outline mt-4">Register Another</button>
            </div>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
                  <input required className="input-field" value={form.product_name} onChange={e => setForm({...form, product_name: e.target.value})} /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Batch Number</label>
                  <input className="input-field" value={form.batch_number} onChange={e => setForm({...form, batch_number: e.target.value})} /></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Customer Name *</label>
                  <input required className="input-field" value={form.customer_name} onChange={e => setForm({...form, customer_name: e.target.value})} /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                  <input required type="tel" className="input-field" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} /></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Dealer Name</label>
                  <input className="input-field" value={form.dealer_name} onChange={e => setForm({...form, dealer_name: e.target.value})} /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Painter / Contractor</label>
                  <input className="input-field" value={form.painter_name} onChange={e => setForm({...form, painter_name: e.target.value})} /></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Surface Type</label>
                  <select className="input-field" value={form.surface_type} onChange={e => setForm({...form, surface_type: e.target.value})}>
                    <option value="">Select</option><option>Interior Wall</option><option>Exterior Wall</option><option>Roof</option><option>Steel Structure</option><option>Floor</option>
                  </select></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Area (sq.ft)</label>
                  <input type="number" className="input-field" value={form.area_sqft} onChange={e => setForm({...form, area_sqft: e.target.value})} /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Number of Coats</label>
                  <input type="number" className="input-field" value={form.coats} onChange={e => setForm({...form, coats: e.target.value})} /></div>
              </div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Application Date</label>
                <input type="date" className="input-field max-w-xs" value={form.application_date} onChange={e => setForm({...form, application_date: e.target.value})} /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-2">Site Photos</label>
                <div className="flex gap-3">
                  <button type="button" className="flex items-center gap-2 p-3 border-2 border-dashed border-gray-200 rounded-xl hover:border-purple-300"><Camera size={18} className="text-gray-400" /><span className="text-sm text-gray-500">Upload Photos</span></button>
                </div></div>
              <button type="submit" disabled={status === 'saving'} className="btn-primary disabled:opacity-50">
                <Shield size={16} className="mr-2" /> {status === 'saving' ? 'Registering...' : 'Register Warranty'}
              </button>
              {status === 'error' && <p className="text-red-500 text-sm">Something went wrong. Please try again.</p>}
            </form>
          )}
        </div>
      )}

      {tab === 'check' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-bold text-gray-800 mb-4">Check Warranty Status</h3>
          <div className="flex gap-3 mb-6">
            <input className="input-field flex-1 font-mono" placeholder="Enter Registration Number" value={lookupNumber} onChange={e => setLookupNumber(e.target.value.toUpperCase())} />
            <button onClick={handleLookup} className="btn-primary"><Search size={16} className="mr-2" /> Check</button>
          </div>
          {lookupResult && (
            lookupResult.error ? (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700">Warranty not found. Please check the registration number.</div>
            ) : (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <h4 className="font-bold text-green-800 mb-2">Warranty Found</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div><span className="text-gray-500">Registration:</span> <strong>{lookupResult.registration_number}</strong></div>
                  <div><span className="text-gray-500">Status:</span> <strong className="capitalize">{lookupResult.status}</strong></div>
                  <div><span className="text-gray-500">Product:</span> <strong>{lookupResult.products?.name || lookupResult.product_id}</strong></div>
                  <div><span className="text-gray-500">Warranty:</span> <strong>{lookupResult.warranty_years} years</strong></div>
                  <div><span className="text-gray-500">Start:</span> <strong>{lookupResult.warranty_start}</strong></div>
                  <div><span className="text-gray-500">End:</span> <strong>{lookupResult.warranty_end}</strong></div>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
