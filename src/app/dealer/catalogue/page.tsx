'use client';
import { Package } from 'lucide-react';
export default function DealerCataloguePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Product Catalogue</h1>
      <p className="text-sm text-gray-500 mb-6">Browse products with dealer pricing and pack availability</p>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
        <Package className="mx-auto text-gray-300 mb-3" size={40} />
        <p className="text-gray-500 text-sm">Product Catalogue content will populate with live dealer data.</p>
        <p className="text-xs text-gray-400 mt-2">Full CRUD with Supabase integration.</p>
      </div>
    </div>
  );
}