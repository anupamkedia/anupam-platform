'use client';
import { useState } from 'react';
import { Target, Plus, Search, Phone, Building2, Calendar, DollarSign, ChevronRight } from 'lucide-react';

const stages = ['New', 'Contacted', 'Meeting Done', 'Sample Sent', 'Trial', 'Quotation', 'Negotiation', 'Order Expected', 'Won', 'Lost'];
const stageColors: Record<string, string> = {
  New: 'bg-blue-100 text-blue-700', Contacted: 'bg-yellow-100 text-yellow-700', 'Meeting Done': 'bg-purple-100 text-purple-700',
  'Sample Sent': 'bg-cyan-100 text-cyan-700', Trial: 'bg-indigo-100 text-indigo-700', Quotation: 'bg-orange-100 text-orange-700',
  Negotiation: 'bg-pink-100 text-pink-700', 'Order Expected': 'bg-green-100 text-green-700', Won: 'bg-green-500 text-white', Lost: 'bg-gray-100 text-gray-500',
};

export default function LeadsPage() {
  const [showForm, setShowForm] = useState(false);
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Leads & Opportunities</h1>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary text-sm"><Plus size={16} className="mr-2" /> New Lead</button>
      </div>
      {showForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Contact Name *</label><input className="input-field" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Company</label><input className="input-field" /></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label><input className="input-field" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Email</label><input className="input-field" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Lead Type</label>
              <select className="input-field"><option>Decorative</option><option>Industrial</option><option>Project</option><option>Institutional</option><option>Export</option></select></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Estimated Value (₹)</label><input type="number" className="input-field" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Expected Closure</label><input type="date" className="input-field" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
              <select className="input-field"><option>Hot</option><option>Warm</option><option>Cold</option></select></div>
          </div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Products Required</label><textarea className="input-field" rows={2} placeholder="List products and quantities" /></div>
          <div className="flex gap-3"><button className="btn-primary text-sm">Save Lead</button><button onClick={() => setShowForm(false)} className="btn-outline text-sm">Cancel</button></div>
        </div>
      )}
      {/* Pipeline */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
          {stages.map(s => (<span key={s} className={`badge text-xs whitespace-nowrap ${stageColors[s] || 'bg-gray-100'}`}>{s}</span>))}
        </div>
        <div className="text-center py-8"><Target className="mx-auto text-gray-300 mb-2" size={32} /><p className="text-sm text-gray-500">No leads yet. Add your first lead above.</p></div>
      </div>
    </div>
  );
}
