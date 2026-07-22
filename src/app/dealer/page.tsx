'use client';
import Link from 'next/link';
import { Package, ShoppingCart, FileText, Gift, Star, AlertCircle, Shield, TrendingUp, DollarSign, Clock } from 'lucide-react';
export default function DealerDashboard() {
  const stats = [
    { label: 'Monthly Purchase', value: '₹0', icon: ShoppingCart, color: 'bg-green-500' },
    { label: 'Outstanding', value: '₹0', icon: DollarSign, color: 'bg-amber-500' },
    { label: 'Loyalty Points', value: '0', icon: Star, color: 'bg-purple-500' },
    { label: 'Open Complaints', value: '0', icon: AlertCircle, color: 'bg-red-500' },
  ];
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Welcome Back!</h1>
        <p className="text-sm text-gray-500">Dealer Dashboard — Anupam Paints</p>
      </div>
      {/* Loyalty tier banner */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-5 mb-6 text-white flex items-center justify-between">
        <div><div className="text-sm opacity-80">Your Tier</div><div className="text-2xl font-bold">Silver</div><div className="text-xs opacity-60 mt-1">250 more points to reach Gold</div></div>
        <Star size={40} className="opacity-30" />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map(s => (
          <div key={s.label} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className={`w-9 h-9 rounded-lg ${s.color} text-white flex items-center justify-center mb-2`}><s.icon size={18} /></div>
            <div className="text-xl font-bold text-gray-800">{s.value}</div>
            <div className="text-xs text-gray-500">{s.label}</div>
          </div>))}
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[{ label: 'Browse Catalogue', href: '/dealer/catalogue', icon: Package },
          { label: 'Place Order', href: '/dealer/orders', icon: ShoppingCart },
          { label: 'View Schemes', href: '/dealer/schemes', icon: Gift },
          { label: 'Register Warranty', href: '/dealer/warranty', icon: Shield },
        ].map(a => (
          <Link key={a.label} href={a.href} className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition text-center">
            <a.icon className="mx-auto text-green-600 mb-2" size={24} /><span className="text-sm font-medium text-gray-700">{a.label}</span>
          </Link>))}
      </div>
    </div>
  );
}
