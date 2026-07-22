'use client';
import { FileText } from 'lucide-react';
export default function ManagerReportsPage() {
  return (<div>
    <h1 className="text-2xl font-bold text-gray-800 mb-2">Reports</h1>
    <p className="text-sm text-gray-500 mb-6">Territory reports, coverage analysis, and downloads</p>
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
      <FileText className="mx-auto text-gray-300 mb-3" size={40} />
      <p className="text-gray-500 text-sm">Reports with real-time team data from Supabase.</p>
    </div>
  </div>);
}