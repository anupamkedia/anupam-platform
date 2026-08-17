'use client';
import Link from 'next/link';
import { QrCode, Coins, Gift, Star, Briefcase, GraduationCap } from 'lucide-react';
export default function PainterDashboard() {
  return (
    <div>
      <div className="mb-6"><h1 className="text-2xl font-bold text-gray-800">Welcome!</h1><p className="text-sm text-gray-500">Painter Dashboard</p></div>
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-5 mb-6 text-white">
        <div className="flex items-center justify-between">
          <div><div className="text-sm opacity-80">Your Points</div><div className="text-3xl font-bold">0</div><div className="text-xs opacity-60 mt-1">Bronze Tier</div></div>
          <Coins size={40} className="opacity-30" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-6">
        <Link href="/painter/scan" className="bg-white rounded-xl border border-gray-100 p-5 text-center hover:shadow-md transition">
          <QrCode className="mx-auto text-orange-500 mb-2" size={32} /><span className="text-sm font-medium text-gray-700">Scan QR Code</span>
        </Link>
        <Link href="/painter/rewards" className="bg-white rounded-xl border border-gray-100 p-5 text-center hover:shadow-md transition">
          <Gift className="mx-auto text-orange-500 mb-2" size={32} /><span className="text-sm font-medium text-gray-700">Redeem Rewards</span>
        </Link>
        <Link href="/painter/projects" className="bg-white rounded-xl border border-gray-100 p-5 text-center hover:shadow-md transition">
          <Briefcase className="mx-auto text-orange-500 mb-2" size={32} /><span className="text-sm font-medium text-gray-700">My Projects</span>
        </Link>
        <Link href="/painter/training" className="bg-white rounded-xl border border-gray-100 p-5 text-center hover:shadow-md transition">
          <GraduationCap className="mx-auto text-orange-500 mb-2" size={32} /><span className="text-sm font-medium text-gray-700">Training</span>
        </Link>
      </div>
    </div>
  );
}