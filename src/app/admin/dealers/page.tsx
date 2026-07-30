'use client';
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { Store, Plus, Search, Edit2, Trash2, X, Save, MapPin, Phone, Mail, Eye, EyeOff } from 'lucide-react';

type Dealer = {
  id: string; dealer_code: string; firm_name: string; contact_person: string;
  phone: string; email: string; gst_number: string; address: string;
  city: string; state: string; pin_code: string; loyalty_tier: string;
  status: string; created_at: string;
};

const tierColors: Record<string, string> = {
  silver: 'bg-gray-100 text-gray-700', gold: 'bg-yellow-50 text-yellow-700',
  platinum: 'bg-blue-50 text-blue-700', diamond: 'bg-purple-50 text-purple-700',
};

export default function AdminDealersPage() {
  const [dealers, setDealers] = useState<Dealer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [form, setForm] = useState<Partial<Dealer>>({});
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.from('dealers').select('*').order('firm_name');
    setDealers(data || []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const openEditor = (dealer?: Dealer) => {
    setEditing(true);
    if (dealer) { setIsNew(false); setForm({ ...dealer }); }
    else { setIsNew(true); setForm({ firm_name: '', contact_person: '', phone: '', email: '', city: '', state: '', gst_number: '', status: 'active', loyalty_tier: 'silver' }); }
  };

  const handleSave = async () => {
    setSaving(true);
    const payload: any = { ...form };
    delete payload.id;
    if (!payload.dealer_code && isNew) payload.dealer_code = 'D' + Date.now().toString(36).toUpperCase();

    let error;
    if (isNew) error = (await supabase.from('dealers').insert(payload)).error;
    else error = (await supabase.from('dealers').update(payload).eq('id', form.id)).error;

    setSaving(false);
    if (error) { alert('Error: ' + error.message); return; }
    setEditing(false); load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Remove this dealer?')) return;
    await supabase.from('dealers').delete().eq('id', id);
    load();
  };

  const filtered = dealers.filter(d => !search || d.firm_name.toLowerCase().includes(search.toLowerCase()) || (d.city || '').toLowerCase().includes(search.toLowerCase()));

  if (editing) {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">{isNew ? 'Add Dealer' : 'Edit Dealer'}</h1>
          <button onClick={() => setEditing(false)} className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg"><X size={20} /></button>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Firm Name *</label>
              <input className="input-field" value={form.firm_name || ''} onChange={e => setForm({ ...form, firm_name: e.target.value })} /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Contact Person</label>
              <input className="input-field" value={form.contact_person || ''} onChange={e => setForm({ ...form, contact_person: e.target.value })} /></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
              <input className="input-field" value={form.phone || ''} onChange={e => setForm({ ...form, phone: e.target.value })} /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input className="input-field" value={form.email || ''} onChange={e => setForm({ ...form, email: e.target.value })} /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">GST Number</label>
              <input className="input-field" value={form.gst_number || ''} onChange={e => setForm({ ...form, gst_number: e.target.value })} /></div>
          </div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <input className="input-field" value={form.address || ''} onChange={e => setForm({ ...form, address: e.target.value })} /></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input className="input-field" value={form.city || ''} onChange={e => setForm({ ...form, city: e.target.value })} /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">State</label>
              <input className="input-field" value={form.state || ''} onChange={e => setForm({ ...form, state: e.target.value })} /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">PIN Code</label>
              <input className="input-field" value={form.pin_code || ''} onChange={e => setForm({ ...form, pin_code: e.target.value })} /></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select className="input-field" value={form.status || 'active'} onChange={e => setForm({ ...form, status: e.target.value })}>
                <option value="active">Active</option><option value="inactive">Inactive</option><option value="suspended">Suspended</option>
              </select></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Loyalty Tier</label>
              <select className="input-field" value={form.loyalty_tier || 'silver'} onChange={e => setForm({ ...form, loyalty_tier: e.target.value })}>
                <option value="silver">Silver</option><option value="gold">Gold</option><option value="platinum">Platinum</option><option value="diamond">Diamond</option>
              </select></div>
          </div>
          <div className="flex gap-3 pt-4 border-t">
            <button onClick={handleSave} disabled={saving || !form.firm_name} className="btn-primary disabled:opacity-50">
              <Save size={16} className="mr-2" /> {saving ? 'Saving...' : isNew ? 'Add Dealer' : 'Update Dealer'}
            </button>
            <button onClick={() => setEditing(false)} className="btn-outline">Cancel</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dealers ({dealers.length})</h1>
        <button onClick={() => openEditor()} className="btn-primary text-sm"><Plus size={16} className="mr-2" /> Add Dealer</button>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 mb-4">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input className="input-field !pl-9 !py-2" placeholder="Search by name or city..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? <div className="p-12 text-center text-gray-400">Loading...</div>
        : filtered.length === 0 ? (
          <div className="p-12 text-center"><Store className="mx-auto text-gray-300 mb-3" size={40} /><p className="text-gray-500">No dealers registered yet.</p></div>
        ) : (
          <div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="bg-gray-50 text-left">
            <th className="px-4 py-3 font-medium text-gray-500">Dealer</th>
            <th className="px-4 py-3 font-medium text-gray-500 hidden md:table-cell">Location</th>
            <th className="px-4 py-3 font-medium text-gray-500 hidden lg:table-cell">Phone</th>
            <th className="px-4 py-3 font-medium text-gray-500">Tier</th>
            <th className="px-4 py-3 font-medium text-gray-500 text-right">Actions</th>
          </tr></thead><tbody className="divide-y divide-gray-100">
            {filtered.map(d => (
              <tr key={d.id} className="hover:bg-gray-50"><td className="px-4 py-3">
                <div className="font-medium text-gray-800">{d.firm_name}</div>
                <div className="text-xs text-gray-400">{d.contact_person} · {d.dealer_code}</div>
              </td><td className="px-4 py-3 hidden md:table-cell text-gray-600 text-sm">{[d.city, d.state].filter(Boolean).join(', ')}</td>
              <td className="px-4 py-3 hidden lg:table-cell text-gray-600">{d.phone}</td>
              <td className="px-4 py-3"><span className={`badge text-xs capitalize ${tierColors[d.loyalty_tier] || 'bg-gray-100'}`}>{d.loyalty_tier}</span></td>
              <td className="px-4 py-3 text-right"><div className="flex items-center justify-end gap-1">
                <button onClick={() => openEditor(d)} className="p-2 text-gray-500 hover:text-brand-500 hover:bg-brand-50 rounded-lg"><Edit2 size={16} /></button>
                <button onClick={() => handleDelete(d.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={16} /></button>
              </div></td></tr>
            ))}
          </tbody></table></div>
        )}
      </div>
    </div>
  );
}
