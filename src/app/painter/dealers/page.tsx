'use client';
import { MapPin } from 'lucide-react';
export default function PainterDealersPage() {
  return (<div>
    <h1 className="text-2xl font-bold text-gray-800 mb-2">Nearby Dealers</h1>
    <p className="text-sm text-gray-500 mb-6">Find authorised Anupam Paints dealers near you</p>
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
      <MapPin className="mx-auto text-gray-300 mb-3" size={40} />
      <p className="text-gray-500 text-sm">Nearby Dealers will connect to painter loyalty system.</p>
    </div>
  </div>);
}