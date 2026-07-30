'use client';
import { useState } from 'react';
import { AlertCircle, Plus, Send, CheckCircle } from 'lucide-react';
export default function DealerComplaintsPage() {
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Complaints</h1>
        <button onClick={()=>setShowForm(!showForm)} className="btn-primary text-sm"><Plus size={16} className="mr-2"/>New Complaint</button>
      </div>
      {showForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6 space-y-4">
          {submitted ? (
            <div className="text-center py-6"><CheckCircle className="mx-auto text-green-500 mb-3" size={40}/><p className="font-medium text-gray-800">Complaint submitted. Our team will respond within 24 hours.</p>
              <button onClick={()=>{setSubmitted(false);setShowForm(false);}} className="btn-outline mt-4 text-sm">Close</button></div>
          ) : (<>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label><input className="input-field"/></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Batch Number</label><input className="input-field"/></div>
            </div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select className="input-field"><option>Product Quality</option><option>Shade Mismatch</option><option>Coverage Issue</option><option>Packaging Damage</option><option>Transport Damage</option><option>Technical Support</option></select></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Description *</label><textarea className="input-field" rows={3} placeholder="Describe the issue in detail..."/></div>
            <div className="flex gap-3"><button onClick={()=>setSubmitted(true)} className="btn-primary text-sm"><Send size={14} className="mr-2"/>Submit</button><button onClick={()=>setShowForm(false)} className="btn-outline text-sm">Cancel</button></div>
          </>)}
        </div>
      )}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <h2 className="font-bold text-gray-800 mb-4">Complaint History</h2>
        <div className="text-center py-8"><AlertCircle className="mx-auto text-gray-300 mb-2" size={32}/><p className="text-sm text-gray-500">No complaints filed. Your complaint tickets and their resolution status will appear here.</p></div>
      </div>
    </div>
  );
}
