'use client';
import { Megaphone } from 'lucide-react';
export default function PainterSchemesPage() {
  return (<div>
    <h1 className="text-2xl font-bold text-gray-800 mb-2">Schemes</h1>
    <p className="text-sm text-gray-500 mb-6">Active schemes and campaigns with your progress</p>
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
      <Megaphone className="mx-auto text-gray-300 mb-3" size={40} />
      <p className="text-gray-500 text-sm">Schemes will connect to painter loyalty system.</p>
    </div>
  </div>);
}