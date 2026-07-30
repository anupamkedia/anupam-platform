'use client';
import Link from 'next/link';
import { Shield, AlertCircle, ShoppingBag, QrCode } from 'lucide-react';
export default function CustomerDashboard() {
  return (<div>
    <h1 className="text-2xl font-bold text-gray-800 mb-6">Customer Dashboard</h1>
    <div className="grid grid-cols-2 gap-4">
      {[{ label: 'My Warranties', href: '/customer/warranty', icon: Shield, color: 'text-purple-500' },
        { label: 'Complaints', href: '/customer/complaints', icon: AlertCircle, color: 'text-red-500' },
        { label: 'Purchases', href: '/customer/purchases', icon: ShoppingBag, color: 'text-green-500' },
        { label: 'Verify Product', href: '/customer/authenticity', icon: QrCode, color: 'text-blue-500' },
      ].map(a => (
        <Link key={a.label} href={a.href} className="bg-white rounded-xl border border-gray-100 p-5 text-center hover:shadow-md transition">
          <a.icon className={`mx-auto mb-2 ${a.color}`} size={28} /><span className="text-sm font-medium text-gray-700">{a.label}</span>
        </Link>))}
    </div>
  </div>);
}