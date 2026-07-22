'use client';
import { ShoppingBag } from 'lucide-react';
export default function CustomerPurchasesPage() {
  return (<div>
    <h1 className="text-2xl font-bold text-gray-800 mb-2">Purchase History</h1>
    <p className="text-sm text-gray-500 mb-6">View your purchase history</p>
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
      <ShoppingBag className="mx-auto text-gray-300 mb-3" size={40} />
      <p className="text-gray-500 text-sm">Purchase History features connected to warranty and complaint systems.</p>
    </div>
  </div>);
}