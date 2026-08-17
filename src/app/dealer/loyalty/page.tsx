'use client';
import { Star, Gift, TrendingUp, Clock } from 'lucide-react';
export default function DealerLoyaltyPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Loyalty & Rewards</h1>
      <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-6 mb-6 text-white">
        <div className="flex items-center justify-between">
          <div><div className="text-sm opacity-80">Current Tier</div><div className="text-3xl font-bold">Silver</div><div className="text-sm opacity-60 mt-1">0 points · 500 points to Gold</div></div>
          <Star size={48} className="opacity-30"/>
        </div>
        <div className="mt-4 bg-white/20 rounded-full h-2"><div className="bg-white rounded-full h-2" style={{width:'0%'}}/></div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[{label:'Available Points',value:'0',icon:Star,color:'bg-green-500'},{label:'Pending',value:'0',icon:Clock,color:'bg-yellow-500'},{label:'Redeemed',value:'0',icon:Gift,color:'bg-purple-500'},{label:'Lifetime',value:'0',icon:TrendingUp,color:'bg-blue-500'}].map(s=>(
          <div key={s.label} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className={`w-9 h-9 rounded-lg ${s.color} text-white flex items-center justify-center mb-2`}><s.icon size={18}/></div>
            <div className="text-xl font-bold text-gray-800">{s.value}</div>
            <div className="text-xs text-gray-500">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <h2 className="font-bold text-gray-800 mb-4">How to Earn Points</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {['Purchases — 1 point per ₹100','Growth over previous quarter — bonus 500 pts','Focus product purchases — 2x points','Timely payments — 200 pts per invoice','Painter enrolment — 100 pts each','Customer warranty registration — 50 pts','Display compliance — 300 pts/quarter','Campaign participation — varies'].map((item,i)=>(
            <div key={i} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg text-sm"><Star size={14} className="text-yellow-500 shrink-0"/>{item}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
