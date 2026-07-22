'use client';
import { Coins, TrendingUp, Clock, CheckCircle, ArrowUp, ArrowDown } from 'lucide-react';
export default function PainterPointsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">My Points</h1>
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 mb-6 text-white">
        <div className="text-sm opacity-80">Available Balance</div>
        <div className="text-4xl font-bold">0 Points</div>
        <div className="text-sm opacity-60 mt-1">Bronze Tier · Earn 100 more for Silver</div>
      </div>
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[{label:'Pending',value:'0',icon:Clock,color:'text-yellow-500'},{label:'Approved',value:'0',icon:CheckCircle,color:'text-green-500'},{label:'Lifetime',value:'0',icon:TrendingUp,color:'text-blue-500'}].map(s=>(
          <div key={s.label} className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 text-center">
            <s.icon className={`mx-auto mb-1 ${s.color}`} size={20}/><div className="text-lg font-bold text-gray-800">{s.value}</div><div className="text-xs text-gray-500">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <h2 className="font-bold text-gray-800 mb-4">Points History</h2>
        <div className="text-center py-8"><Coins className="mx-auto text-gray-300 mb-2" size={32}/><p className="text-sm text-gray-500">Scan product codes or register projects to start earning points.</p></div>
      </div>
    </div>
  );
}
