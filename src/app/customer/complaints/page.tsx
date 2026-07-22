'use client';
import { useState } from 'react';
import { AlertCircle, Send, CheckCircle, Camera } from 'lucide-react';

export default function CustomerComplaintsPage() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', product_name: '', batch_number: '', invoice_number: '', purchase_date: '', category: '', severity: 'medium', description: '' });
  const [status, setStatus] = useState<'idle' | 'saving' | 'done' | 'error'>('idle');
  const [complaintNumber, setComplaintNumber] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('saving');
    try {
      // Generate complaint number
      const cn = 'CMP-' + Date.now().toString(36).toUpperCase();
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, phone: form.phone, email: form.email, company: '', enquiry_type: 'Complaint', message: `[${form.category}] ${form.product_name} (Batch: ${form.batch_number}) - ${form.description}` }),
      });
      if (res.ok) { setComplaintNumber(cn); setStatus('done'); }
      else setStatus('error');
    } catch { setStatus('error'); }
  };

  if (status === 'done') {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center max-w-lg mx-auto mt-8">
        <CheckCircle className="mx-auto text-green-500 mb-3" size={48} />
        <h2 className="text-xl font-bold text-gray-800 mb-2">Complaint Registered</h2>
        <p className="text-gray-600 mb-1">Your complaint number:</p>
        <p className="text-2xl font-mono font-bold text-brand-500 mb-4">{complaintNumber}</p>
        <p className="text-sm text-gray-500">Our technical team will contact you within 24 hours.</p>
        <button onClick={() => { setStatus('idle'); setForm({ name: '', phone: '', email: '', product_name: '', batch_number: '', invoice_number: '', purchase_date: '', category: '', severity: 'medium', description: '' }); }} className="btn-outline mt-4">Submit Another</button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Register Complaint</h1>
      <p className="text-sm text-gray-500 mb-6">Report a product or service issue. Our technical team will investigate and resolve it.</p>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Your Name *</label><input required className="input-field" value={form.name} onChange={e => setForm({...form, name: e.target.value})} /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label><input required type="tel" className="input-field" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} /></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label><input required className="input-field" value={form.product_name} onChange={e => setForm({...form, product_name: e.target.value})} /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Batch Number</label><input className="input-field" value={form.batch_number} onChange={e => setForm({...form, batch_number: e.target.value})} /></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Invoice Number</label><input className="input-field" value={form.invoice_number} onChange={e => setForm({...form, invoice_number: e.target.value})} /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Purchase Date</label><input type="date" className="input-field" value={form.purchase_date} onChange={e => setForm({...form, purchase_date: e.target.value})} /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Severity</label>
              <select className="input-field" value={form.severity} onChange={e => setForm({...form, severity: e.target.value})}><option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option><option value="critical">Critical</option></select></div>
          </div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
            <select required className="input-field" value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
              <option value="">Select complaint type</option><option>Product Quality</option><option>Shade Mismatch</option><option>Application Issue</option><option>Coverage Issue</option><option>Packaging Damage</option><option>Transport Damage</option><option>Warranty Claim</option><option>Technical Support</option><option>Other</option>
            </select></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
            <textarea required rows={4} className="input-field" value={form.description} onChange={e => setForm({...form, description: e.target.value})} placeholder="Describe the issue in detail — what happened, when, where, and how..." /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-2">Photos of the Issue</label>
            <button type="button" className="flex items-center gap-2 p-3 border-2 border-dashed border-gray-200 rounded-xl hover:border-brand-300"><Camera size={18} className="text-gray-400" /><span className="text-sm text-gray-500">Upload Photos</span></button></div>
          <button type="submit" disabled={status === 'saving'} className="btn-primary disabled:opacity-50">
            <Send size={16} className="mr-2" /> {status === 'saving' ? 'Submitting...' : 'Submit Complaint'}
          </button>
        </form>
      </div>
    </div>
  );
}
