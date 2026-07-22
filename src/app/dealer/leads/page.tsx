'use client';
import { Target } from 'lucide-react';
export default function DealerLeadsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Leads</h1>
      <p className="text-sm text-gray-500 mb-6">Submit and manage customer leads</p>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
        <Target className="mx-auto text-gray-300 mb-3" size={40} />
        <p className="text-gray-500 text-sm">Leads content will populate with live dealer data.</p>
        <p className="text-xs text-gray-400 mt-2">Full CRUD with Supabase integration.</p>
      </div>
    </div>
  );
}