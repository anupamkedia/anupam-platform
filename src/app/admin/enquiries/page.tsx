'use client';
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { MessageSquare, Search, Eye, Clock, CheckCircle, XCircle, ArrowRight, Phone, Mail, Building2 } from 'lucide-react';

type Enquiry = {
  id: string; name: string; company: string; phone: string; email: string;
  enquiry_type: string; message: string; source: string; status: string;
  notes: string; created_at: string;
};

const statusColors: Record<string, string> = {
  new: 'bg-blue-50 text-blue-700', contacted: 'bg-yellow-50 text-yellow-700',
  qualified: 'bg-purple-50 text-purple-700', converted: 'bg-green-50 text-green-700',
  closed: 'bg-gray-100 text-gray-500',
};

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [selected, setSelected] = useState<Enquiry | null>(null);
  const [notes, setNotes] = useState('');

  const loadEnquiries = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.from('enquiries').select('*').order('created_at', { ascending: false });
    setEnquiries(data || []);
    setLoading(false);
  }, []);

  useEffect(() => { loadEnquiries(); }, [loadEnquiries]);

  const updateStatus = async (id: string, status: string) => {
    await supabase.from('enquiries').update({ status }).eq('id', id);
    loadEnquiries();
    if (selected?.id === id) setSelected({ ...selected, status });
  };

  const saveNotes = async () => {
    if (!selected) return;
    await supabase.from('enquiries').update({ notes }).eq('id', selected.id);
    loadEnquiries();
  };

  const filtered = enquiries.filter(e => {
    if (search && !e.name.toLowerCase().includes(search.toLowerCase()) && !(e.company || '').toLowerCase().includes(search.toLowerCase())) return false;
    if (filterStatus && e.status !== filterStatus) return false;
    return true;
  });

  const statusCounts = { all: enquiries.length, new: enquiries.filter(e => e.status === 'new').length, contacted: enquiries.filter(e => e.status === 'contacted').length, qualified: enquiries.filter(e => e.status === 'qualified').length };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Enquiries</h1>
        <div className="flex gap-2">
          {Object.entries(statusCounts).map(([key, count]) => (
            <button key={key} onClick={() => setFilterStatus(key === 'all' ? '' : key)}
              className={`badge text-xs cursor-pointer ${!filterStatus && key === 'all' || filterStatus === key ? 'bg-brand-500 text-white' : 'bg-gray-100 text-gray-600'}`}>
              {key.charAt(0).toUpperCase() + key.slice(1)} ({count})
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-6">
        {/* List */}
        <div className={`${selected ? 'hidden lg:block lg:w-1/2' : 'w-full'}`}>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 mb-4">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input className="input-field !pl-9 !py-2" placeholder="Search by name or company..." value={search} onChange={e => setSearch(e.target.value)} />
            </div>
          </div>

          <div className="space-y-2">
            {loading ? (
              <div className="bg-white rounded-xl p-12 text-center text-gray-400">Loading...</div>
            ) : filtered.length === 0 ? (
              <div className="bg-white rounded-xl p-12 text-center">
                <MessageSquare className="mx-auto text-gray-300 mb-3" size={40} />
                <p className="text-gray-500">No enquiries yet.</p>
              </div>
            ) : filtered.map(enquiry => (
              <button key={enquiry.id} onClick={() => { setSelected(enquiry); setNotes(enquiry.notes || ''); }}
                className={`w-full text-left bg-white rounded-xl border p-4 hover:shadow-md transition ${selected?.id === enquiry.id ? 'border-brand-300 shadow-md' : 'border-gray-100'}`}>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-medium text-gray-800">{enquiry.name}</div>
                    {enquiry.company && <div className="text-sm text-gray-500">{enquiry.company}</div>}
                  </div>
                  <span className={`badge text-xs ${statusColors[enquiry.status] || 'bg-gray-100 text-gray-500'}`}>{enquiry.status}</span>
                </div>
                <div className="text-sm text-gray-600 mt-1 line-clamp-1">{enquiry.message}</div>
                <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                  <span>{enquiry.enquiry_type}</span>
                  <span>{new Date(enquiry.created_at).toLocaleDateString('en-IN')}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Detail panel */}
        {selected && (
          <div className="flex-1 lg:w-1/2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-800">{selected.name}</h2>
                <button onClick={() => setSelected(null)} className="lg:hidden p-2 text-gray-400 hover:bg-gray-100 rounded"><XCircle size={20} /></button>
              </div>
              <div className="space-y-3 mb-6">
                {selected.company && <div className="flex items-center gap-2 text-sm"><Building2 size={14} className="text-gray-400" /> {selected.company}</div>}
                <div className="flex items-center gap-2 text-sm"><Phone size={14} className="text-gray-400" /> <a href={`tel:${selected.phone}`} className="text-brand-500">{selected.phone}</a></div>
                {selected.email && <div className="flex items-center gap-2 text-sm"><Mail size={14} className="text-gray-400" /> <a href={`mailto:${selected.email}`} className="text-brand-500">{selected.email}</a></div>}
                <div className="flex items-center gap-2 text-sm"><Clock size={14} className="text-gray-400" /> {new Date(selected.created_at).toLocaleString('en-IN')}</div>
              </div>
              <div className="mb-4">
                <div className="text-sm font-medium text-gray-700 mb-1">Enquiry Type</div>
                <span className="badge-blue text-sm">{selected.enquiry_type}</span>
              </div>
              <div className="mb-6">
                <div className="text-sm font-medium text-gray-700 mb-1">Message</div>
                <p className="text-gray-600 bg-gray-50 p-3 rounded-lg text-sm leading-relaxed">{selected.message}</p>
              </div>

              {/* Status update */}
              <div className="mb-6">
                <div className="text-sm font-medium text-gray-700 mb-2">Update Status</div>
                <div className="flex flex-wrap gap-2">
                  {['new', 'contacted', 'qualified', 'converted', 'closed'].map(s => (
                    <button key={s} onClick={() => updateStatus(selected.id, s)}
                      className={`badge text-xs cursor-pointer transition ${selected.status === s ? statusColors[s] + ' ring-2 ring-offset-1 ring-brand-300' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}>
                      {s.charAt(0).toUpperCase() + s.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <div className="text-sm font-medium text-gray-700 mb-1">Internal Notes</div>
                <textarea className="input-field text-sm" rows={3} value={notes} onChange={e => setNotes(e.target.value)} placeholder="Add notes about this enquiry..." />
                <button onClick={saveNotes} className="btn-outline text-sm mt-2 !py-1.5">Save Notes</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
