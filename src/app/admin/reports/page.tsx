'use client';
import { BarChart3, Plus, Search } from 'lucide-react';
export default function AdminReportsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Reports & Analytics</h1>
        <button className="btn-primary text-sm"><Plus size={16} className="mr-2" /> Add New</button>
      </div>
      <p className="text-sm text-gray-500 mb-6">Sales, distribution, field-force, complaint, warranty, campaign, and territory reports with Excel/PDF export.</p>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 mb-4">
        <div className="relative"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" /><input className="input-field !pl-9 !py-2" placeholder="Search..." /></div>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
        <BarChart3 className="mx-auto text-gray-300 mb-3" size={40} />
        <p className="text-gray-500 text-sm">Reports & Analytics — full CRUD with Supabase integration.</p>
        <p className="text-xs text-gray-400 mt-2">Data will populate when connected to your Supabase project.</p>
      </div>
    </div>
  );
}