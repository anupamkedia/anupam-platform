'use client';
import Link from 'next/link';
import { Store, Paintbrush, Users, Briefcase, BarChart3, Settings, Shield } from 'lucide-react';

const portals = [
  { name: 'Dealer Portal', desc: 'Order products, view statements, schemes, loyalty points, and training.', href: '/dealer', icon: Store, color: 'from-green-500 to-green-700' },
  { name: 'Painter Portal', desc: 'Scan codes, earn points, redeem rewards, register projects.', href: '/painter', icon: Paintbrush, color: 'from-orange-500 to-orange-600' },
  { name: 'Customer Portal', desc: 'Register warranty, check product authenticity, file complaints.', href: '/customer', icon: Users, color: 'from-purple-500 to-purple-700' },
  { name: 'Employee SFA', desc: 'Attendance, visits, leads, tour plans, quotations, expenses.', href: '/employee', icon: Briefcase, color: 'from-blue-500 to-blue-700' },
  { name: 'Manager Dashboard', desc: 'Team performance, visit review, pipeline, expense approvals.', href: '/manager', icon: BarChart3, color: 'from-indigo-500 to-indigo-700' },
  { name: 'Admin Panel', desc: 'Full website and business management control.', href: '/admin', icon: Settings, color: 'from-gray-600 to-gray-800' },
];

export default function PortalsPage() {
  return (
    <>
      <section className="gradient-brand text-white py-16 md:py-24">
        <div className="container-wide px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Login to Your Portal</h1>
          <p className="text-lg text-brand-200 max-w-2xl">Access your dedicated dashboard based on your role.</p>
        </div>
      </section>
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portals.map((portal) => (
              <Link key={portal.name} href={portal.href} className="card card-hover group p-6">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${portal.color} flex items-center justify-center mb-4 group-hover:scale-110 transition`}>
                  <portal.icon className="text-white" size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-brand-500 transition">{portal.name}</h3>
                <p className="text-sm text-gray-600">{portal.desc}</p>
                <div className="mt-4 flex items-center gap-2">
                  <Shield size={14} className="text-brand-400" />
                  <span className="text-sm text-brand-500 font-medium">Login to Access</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
