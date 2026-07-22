'use client';
import { AlertCircle } from 'lucide-react';
export default function DealerComplaintsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Complaints</h1>
      <p className="text-sm text-gray-500 mb-6">Register and track product or service complaints</p>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
        <AlertCircle className="mx-auto text-gray-300 mb-3" size={40} />
        <p className="text-gray-500 text-sm">Complaints content will populate with live dealer data.</p>
        <p className="text-xs text-gray-400 mt-2">Full CRUD with Supabase integration.</p>
      </div>
    </div>
  );
}