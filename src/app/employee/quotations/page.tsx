'use client';
import { useState } from 'react';
import { FileText, Plus, Send, Download, Eye } from 'lucide-react';
export default function QuotationsPage() {
  const [showForm, setShowForm] = useState(false);
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Quotations</h1>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary text-sm"><Plus size={16} className="mr-2" /> New Quotation</button>
      </div>
      {showForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6 space-y-4">
          <h2 className="font-bold text-gray-800">Create Quotation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Customer Name *</label><input className="input-field" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Company</label><input className="input-field" /></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Phone</label><input className="input-field" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Email</label><input className="input-field" /></div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Products</label>
            <div className="bg-gray-50 rounded-xl p-4 text-center text-sm text-gray-500">
              Product line items with quantity, rate, and discount will be added here. Select products from the catalogue.
            </div>
          </div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Terms & Notes</label>
            <textarea className="input-field" rows={3} placeholder="Payment terms, delivery, validity..." /></div>
          <div className="flex gap-3">
            <button className="btn-primary text-sm"><Send size={14} className="mr-1" /> Send for Approval</button>
            <button className="btn-outline text-sm"><Download size={14} className="mr-1" /> Save as Draft</button>
            <button onClick={() => setShowForm(false)} className="btn-outline text-sm">Cancel</button>
          </div>
        </div>
      )}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <div className="text-center py-8"><FileText className="mx-auto text-gray-300 mb-2" size={32} /><p className="text-sm text-gray-500">No quotations created yet.</p></div>
      </div>
    </div>
  );
}
