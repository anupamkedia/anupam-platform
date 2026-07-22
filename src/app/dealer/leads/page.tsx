'use client';
import { useState } from 'react';
import { Target, Plus, Send, CheckCircle } from 'lucide-react';
export default function DealerLeadsPage() {
  const [showForm, setShowForm] = useState(false);
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Leads</h1>
        <button onClick={()=>setShowForm(!showForm)} className="btn-primary text-sm"><Plus size={16} className="mr-2"/>Submit Lead</button>
      </div>
      {showForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Customer Name *</label><input className="input-field"/></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label><input className="input-field"/></div>
          </div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Requirement</label><textarea className="input-field" rows={2} placeholder="What products does the customer need?"/></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Location / Address</label><input className="input-field"/></div>
          <div className="flex gap-3"><button className="btn-primary text-sm"><Send size={14} className="mr-2"/>Submit Lead</button><button onClick={()=>setShowForm(false)} className="btn-outline text-sm">Cancel</button></div>
        </div>
      )}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <h2 className="font-bold text-gray-800 mb-4">Your Leads</h2>
        <div className="text-center py-8"><Target className="mx-auto text-gray-300 mb-2" size={32}/><p className="text-sm text-gray-500">Submit customer leads to earn loyalty points. Leads assigned to you by the company will also appear here.</p></div>
      </div>
    </div>
  );
}
