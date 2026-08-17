'use client';
import { Palette, Plus, Search } from 'lucide-react';
export default function AdminPaintersPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Painter Management</h1>
        <button className="btn-primary text-sm"><Plus size={16} className="mr-2" /> Add New</button>
      </div>
      <p className="text-sm text-gray-500 mb-6">Manage painter registrations, loyalty points, scan verifications, fraud detection, and reward fulfilment.</p>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 mb-4">
        <div className="relative"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" /><input className="input-field !pl-9 !py-2" placeholder="Search..." /></div>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
        <Palette className="mx-auto text-gray-300 mb-3" size={40} />
        <p className="text-gray-500 text-sm">Painter Management — full CRUD with Supabase integration.</p>
        <p className="text-xs text-gray-400 mt-2">Data will populate when connected to your Supabase project.</p>
      </div>
    </div>
  );
}