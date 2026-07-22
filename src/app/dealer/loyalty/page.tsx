'use client';
import { Star } from 'lucide-react';
export default function DealerLoyaltyPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Loyalty & Rewards</h1>
      <p className="text-sm text-gray-500 mb-6">Points balance, tier status, and reward catalogue</p>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
        <Star className="mx-auto text-gray-300 mb-3" size={40} />
        <p className="text-gray-500 text-sm">Loyalty & Rewards content will populate with live dealer data.</p>
        <p className="text-xs text-gray-400 mt-2">Full CRUD with Supabase integration.</p>
      </div>
    </div>
  );
}