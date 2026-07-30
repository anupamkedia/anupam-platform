'use client';
import { useState } from 'react';
import { Receipt, Plus, Camera, Save } from 'lucide-react';
const categories = ['Local Travel', 'Fuel', 'Hotel', 'Food', 'Toll/Parking', 'Train/Flight', 'Samples', 'Promotional', 'Other'];
export default function ExpensesPage() {
  const [showForm, setShowForm] = useState(false);
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Expenses</h1>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary text-sm"><Plus size={16} className="mr-2" /> Add Expense</button>
      </div>
      {showForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Date</label><input type="date" className="input-field" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select className="input-field">{categories.map(c => <option key={c}>{c}</option>)}</select></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Amount (₹) *</label><input type="number" className="input-field" /></div>
          </div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Description</label><input className="input-field" placeholder="Brief description of expense" /></div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Receipt Photo</label>
            <button className="flex items-center gap-2 p-3 border-2 border-dashed border-gray-200 rounded-xl hover:border-brand-300 transition">
              <Camera size={18} className="text-gray-400" /><span className="text-sm text-gray-500">Upload Receipt</span>
            </button>
          </div>
          <div className="flex gap-3"><button className="btn-primary text-sm"><Save size={16} className="mr-2" /> Submit</button><button onClick={() => setShowForm(false)} className="btn-outline text-sm">Cancel</button></div>
        </div>
      )}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <div className="text-center py-8"><Receipt className="mx-auto text-gray-300 mb-2" size={32} /><p className="text-sm text-gray-500">No expenses submitted.</p></div>
      </div>
    </div>
  );
}
