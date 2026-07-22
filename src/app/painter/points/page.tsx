'use client';
import { Coins } from 'lucide-react';
export default function PainterPointsPage() {
  return (<div>
    <h1 className="text-2xl font-bold text-gray-800 mb-2">My Points</h1>
    <p className="text-sm text-gray-500 mb-6">Points history, pending approvals, and expiring points</p>
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
      <Coins className="mx-auto text-gray-300 mb-3" size={40} />
      <p className="text-gray-500 text-sm">My Points will connect to painter loyalty system.</p>
    </div>
  </div>);
}