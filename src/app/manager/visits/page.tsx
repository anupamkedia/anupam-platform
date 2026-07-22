'use client';
import { Navigation } from 'lucide-react';
export default function ManagerVisitsPage() {
  return (<div>
    <h1 className="text-2xl font-bold text-gray-800 mb-2">Visit Review</h1>
    <p className="text-sm text-gray-500 mb-6">Review and score team visit reports</p>
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
      <Navigation className="mx-auto text-gray-300 mb-3" size={40} />
      <p className="text-gray-500 text-sm">Visit Review with real-time team data from Supabase.</p>
    </div>
  </div>);
}