'use client';
import { BarChart3, TrendingUp, Target, DollarSign } from 'lucide-react';
export default function SalesPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Sales Dashboard</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Monthly Target', value: '₹0', icon: Target, color: 'bg-blue-500' },
          { label: 'Achievement', value: '₹0', icon: TrendingUp, color: 'bg-green-500' },
          { label: 'Collection', value: '₹0', icon: DollarSign, color: 'bg-amber-500' },
          { label: 'Outstanding', value: '₹0', icon: BarChart3, color: 'bg-red-500' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className={`w-9 h-9 rounded-lg ${s.color} text-white flex items-center justify-center mb-2`}><s.icon size={18} /></div>
            <div className="text-xl font-bold text-gray-800">{s.value}</div>
            <div className="text-xs text-gray-500">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <h2 className="font-bold text-gray-800 mb-4">Sales Performance</h2>
        <div className="text-center py-8"><BarChart3 className="mx-auto text-gray-300 mb-2" size={40} /><p className="text-sm text-gray-500">Sales data will appear once orders are recorded.</p></div>
      </div>
    </div>
  );
}
