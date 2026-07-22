'use client';
import { Target } from 'lucide-react';
export default function ManagerPipelinePage() {
  return (<div>
    <h1 className="text-2xl font-bold text-gray-800 mb-2">Project Pipeline</h1>
    <p className="text-sm text-gray-500 mb-6">View all team leads and project opportunities</p>
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
      <Target className="mx-auto text-gray-300 mb-3" size={40} />
      <p className="text-gray-500 text-sm">Project Pipeline with real-time team data from Supabase.</p>
    </div>
  </div>);
}