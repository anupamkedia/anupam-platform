'use client';
import { Users, Navigation, Target, BarChart3, MapPin, TrendingUp, AlertTriangle } from 'lucide-react';
export default function ManagerDashboard() {
  const stats = [
    { label: 'Team Members', value: '0', icon: Users, color: 'bg-indigo-500' },
    { label: 'Visits Today', value: '0', icon: Navigation, color: 'bg-blue-500' },
    { label: 'Open Leads', value: '0', icon: Target, color: 'bg-purple-500' },
    { label: 'Team Sales', value: '₹0', icon: BarChart3, color: 'bg-green-500' },
  ];
  return (<div>
    <h1 className="text-2xl font-bold text-gray-800 mb-6">Team Overview</h1>
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map(s => (
        <div key={s.label} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className={`w-9 h-9 rounded-lg ${s.color} text-white flex items-center justify-center mb-2`}><s.icon size={18} /></div>
          <div className="text-xl font-bold text-gray-800">{s.value}</div>
          <div className="text-xs text-gray-500">{s.label}</div>
        </div>))}
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><MapPin size={18} className="text-indigo-500" /> Team Live Location</h2>
        <div className="bg-indigo-50 rounded-xl p-8 text-center"><MapPin className="mx-auto text-indigo-300 mb-2" size={32} /><p className="text-sm text-indigo-600">Team location map will appear here</p></div>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><AlertTriangle size={18} className="text-amber-500" /> Pending Approvals</h2>
        <div className="text-center py-8"><p className="text-sm text-gray-500">Tour plans, expense claims, and quotations pending your approval.</p></div>
      </div>
    </div>
  </div>);
}