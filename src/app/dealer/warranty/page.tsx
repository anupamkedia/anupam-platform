'use client';
import { useState } from 'react';
import { Shield, Plus, CheckCircle, Search } from 'lucide-react';
export default function DealerWarrantyPage() {
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Warranty Registration</h1>
        <button onClick={()=>setShowForm(!showForm)} className="btn-primary text-sm"><Plus size={16} className="mr-2"/>Register Warranty</button>
      </div>
      {showForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6 space-y-4">
          {submitted ? (
            <div className="text-center py-6"><CheckCircle className="mx-auto text-green-500 mb-3" size={40}/><p className="font-medium text-gray-800">Warranty registered successfully!</p><p className="text-sm text-gray-500 mt-1">Registration number will be shared with the customer.</p>
              <button onClick={()=>{setSubmitted(false);setShowForm(false);}} className="btn-outline mt-4 text-sm">Close</button></div>
          ) : (<>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Customer Name *</label><input className="input-field"/></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Customer Phone *</label><input className="input-field"/></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Product *</label><input className="input-field" placeholder="Product name"/></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Batch Number</label><input className="input-field"/></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Area (sq.ft)</label><input type="number" className="input-field"/></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Coats Applied</label><input type="number" className="input-field" defaultValue={2}/></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Application Date</label><input type="date" className="input-field"/></div>
            </div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Painter / Contractor Name</label><input className="input-field"/></div>
            <div className="flex gap-3"><button onClick={()=>setSubmitted(true)} className="btn-primary text-sm"><Shield size={14} className="mr-2"/>Register</button><button onClick={()=>setShowForm(false)} className="btn-outline text-sm">Cancel</button></div>
          </>)}
        </div>
      )}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <h2 className="font-bold text-gray-800 mb-4">Registered Warranties</h2>
        <div className="text-center py-8"><Shield className="mx-auto text-gray-300 mb-2" size={32}/><p className="text-sm text-gray-500">No warranties registered yet. Warranties registered by you for customers will appear here.</p></div>
      </div>
    </div>
  );
}
