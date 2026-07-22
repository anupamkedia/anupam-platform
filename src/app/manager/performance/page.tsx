'use client';
import { BarChart3 } from 'lucide-react';
export default function ManagerPerformancePage() {
  return (<div>
    <h1 className="text-2xl font-bold text-gray-800 mb-2">Sales Performance</h1>
    <p className="text-sm text-gray-500 mb-6">Individual and team sales vs targets</p>
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
      <BarChart3 className="mx-auto text-gray-300 mb-3" size={40} />
      <p className="text-gray-500 text-sm">Sales Performance with real-time team data from Supabase.</p>
    </div>
  </div>);
}