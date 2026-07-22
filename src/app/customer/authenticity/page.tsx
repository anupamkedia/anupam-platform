'use client';
import { QrCode } from 'lucide-react';
export default function CustomerAuthenticityPage() {
  return (<div>
    <h1 className="text-2xl font-bold text-gray-800 mb-2">Verify Product</h1>
    <p className="text-sm text-gray-500 mb-6">Scan QR or enter batch number to verify authenticity</p>
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
      <QrCode className="mx-auto text-gray-300 mb-3" size={40} />
      <p className="text-gray-500 text-sm">Verify Product features connected to warranty and complaint systems.</p>
    </div>
  </div>);
}