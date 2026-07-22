'use client';
import { Target } from 'lucide-react';
export default function PainterLeadsPage() {
  return (<div>
    <h1 className="text-2xl font-bold text-gray-800 mb-2">Submit Lead</h1>
    <p className="text-sm text-gray-500 mb-6">Submit customer leads to earn extra points</p>
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
      <Target className="mx-auto text-gray-300 mb-3" size={40} />
      <p className="text-gray-500 text-sm">Submit Lead will connect to painter loyalty system.</p>
    </div>
  </div>);
}