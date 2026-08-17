'use client';
import { Gift, Target, Calendar, TrendingUp } from 'lucide-react';
export default function DealerSchemesPage() {
  const schemes = [
    { name: 'Monsoon Bonanza 2026', type: 'Purchase Target', target: '₹5,00,000', achieved: '₹0', reward: 'Foreign Tour', period: 'Jul-Sep 2026', status: 'active' },
    { name: 'New Product Push', type: 'Product Mix', target: '50 units Azura range', achieved: '0 units', reward: '5000 bonus points', period: 'Jul 2026', status: 'active' },
    { name: 'Early Payment Bonus', type: 'Payment', target: 'Payment within 15 days', achieved: '—', reward: '2% extra discount', period: 'Ongoing', status: 'active' },
  ];
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Schemes & Campaigns</h1>
      <p className="text-sm text-gray-500 mb-6">Active schemes, targets, and your progress</p>
      <div className="space-y-4">
        {schemes.map((s, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-start justify-between mb-3">
              <div><h3 className="font-bold text-gray-800">{s.name}</h3><span className="badge bg-green-50 text-green-700 text-xs mt-1">{s.status}</span></div>
              <Gift className="text-green-500" size={24}/>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              <div><span className="text-gray-500">Type:</span><br/><strong>{s.type}</strong></div>
              <div><span className="text-gray-500">Target:</span><br/><strong>{s.target}</strong></div>
              <div><span className="text-gray-500">Achieved:</span><br/><strong className="text-brand-500">{s.achieved}</strong></div>
              <div><span className="text-gray-500">Reward:</span><br/><strong className="text-green-600">{s.reward}</strong></div>
            </div>
            <div className="mt-3 bg-gray-100 rounded-full h-2"><div className="bg-green-500 rounded-full h-2" style={{width:'0%'}}/></div>
            <div className="text-xs text-gray-400 mt-2"><Calendar size={12} className="inline mr-1"/>{s.period}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
