'use client';
import { Users } from 'lucide-react';
export default function ManagerTeamPage() {
  return (<div>
    <h1 className="text-2xl font-bold text-gray-800 mb-2">Team Activity</h1>
    <p className="text-sm text-gray-500 mb-6">Team attendance, location, and daily activity overview</p>
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
      <Users className="mx-auto text-gray-300 mb-3" size={40} />
      <p className="text-gray-500 text-sm">Team Activity with real-time team data from Supabase.</p>
    </div>
  </div>);
}