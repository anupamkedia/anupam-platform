'use client';
import { Gift, Star, ShoppingBag } from 'lucide-react';
const rewards = [
  { name: 'Tool Kit', points: 200, category: 'Tools', available: true },
  { name: 'Safety Goggles', points: 100, category: 'Safety', available: true },
  { name: 'Measuring Tape Set', points: 150, category: 'Tools', available: true },
  { name: 'Mobile Phone', points: 5000, category: 'Electronics', available: true },
  { name: 'Amazon Gift Card ₹500', points: 500, category: 'Vouchers', available: true },
  { name: 'Domestic Tour (2 nights)', points: 15000, category: 'Tours', available: true },
  { name: 'UPI Cash Transfer ₹200', points: 200, category: 'Cash', available: true },
  { name: 'Anupam Training Certificate', points: 300, category: 'Recognition', available: true },
];
export default function PainterRewardsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Reward Catalogue</h1>
      <p className="text-sm text-gray-500 mb-6">Redeem your loyalty points for rewards</p>
      <div className="bg-orange-50 rounded-xl p-4 mb-6 flex items-center justify-between">
        <div><span className="text-sm text-orange-700">Your Balance:</span><span className="text-lg font-bold text-orange-600 ml-2">0 Points</span></div>
        <Star className="text-orange-400" size={24}/>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {rewards.map((r, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center shrink-0"><Gift className="text-orange-500" size={24}/></div>
            <div className="flex-1">
              <div className="font-medium text-gray-800">{r.name}</div>
              <div className="text-xs text-gray-400">{r.category}</div>
            </div>
            <div className="text-right">
              <div className="text-sm font-bold text-orange-600">{r.points} pts</div>
              <button className="text-xs text-orange-500 font-medium hover:underline">Redeem</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
