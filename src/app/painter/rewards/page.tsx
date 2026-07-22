'use client';
import { Gift } from 'lucide-react';
export default function PainterRewardsPage() {
  return (<div>
    <h1 className="text-2xl font-bold text-gray-800 mb-2">Reward Catalogue</h1>
    <p className="text-sm text-gray-500 mb-6">Browse and redeem rewards with your loyalty points</p>
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
      <Gift className="mx-auto text-gray-300 mb-3" size={40} />
      <p className="text-gray-500 text-sm">Reward Catalogue will connect to painter loyalty system.</p>
    </div>
  </div>);
}