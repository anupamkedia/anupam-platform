'use client';
import Link from 'next/link';
import { MapPin, Navigation, Target, ClipboardList, Receipt, BarChart3, TrendingUp, CheckCircle, Clock, AlertCircle } from 'lucide-react';

export default function EmployeeDashboard() {
  const today = new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  const quickStats = [
    { label: 'Visits Today', value: '0', target: '5', icon: Navigation, color: 'bg-blue-500' },
    { label: 'Open Leads', value: '0', target: '—', icon: Target, color: 'bg-purple-500' },
    { label: 'Pending Tasks', value: '0', target: '—', icon: ClipboardList, color: 'bg-amber-500' },
    { label: 'Monthly Sales', value: '₹0', target: '₹0', icon: BarChart3, color: 'bg-green-500' },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Good Morning!</h1>
        <p className="text-sm text-gray-500">{today}</p>
      </div>

      {/* Attendance status */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center">
              <MapPin size={20} />
            </div>
            <div>
              <div className="text-sm font-medium text-gray-800">Not Checked In</div>
              <div className="text-xs text-gray-400">Mark your attendance to start the day</div>
            </div>
          </div>
          <Link href="/employee/attendance" className="btn-primary text-sm !px-4 !py-2">
            Check In
          </Link>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {quickStats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-9 h-9 rounded-lg ${stat.color} text-white flex items-center justify-center`}>
                <stat.icon size={18} />
              </div>
              {stat.target !== '—' && (
                <span className="text-xs text-gray-400">Target: {stat.target}</span>
              )}
            </div>
            <div className="text-xl font-bold text-gray-800">{stat.value}</div>
            <div className="text-xs text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Log Dealer Visit', href: '/employee/visits', icon: Navigation, color: 'text-blue-500 bg-blue-50' },
          { label: 'Add New Lead', href: '/employee/leads', icon: Target, color: 'text-purple-500 bg-purple-50' },
          { label: 'Submit Expense', href: '/employee/expenses', icon: Receipt, color: 'text-amber-500 bg-amber-50' },
          { label: 'View Sales', href: '/employee/sales', icon: BarChart3, color: 'text-green-500 bg-green-50' },
        ].map((action) => (
          <Link key={action.label} href={action.href}
            className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition flex flex-col items-center text-center gap-2">
            <div className={`w-10 h-10 rounded-lg ${action.color} flex items-center justify-center`}>
              <action.icon size={20} />
            </div>
            <span className="text-sm font-medium text-gray-700">{action.label}</span>
          </Link>
        ))}
      </div>

      {/* Today's plan & recent activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Clock size={18} className="text-brand-500" /> Today&apos;s Tour Plan
          </h2>
          <div className="text-center py-8">
            <ClipboardList className="mx-auto text-gray-300 mb-2" size={32} />
            <p className="text-sm text-gray-500">No visits planned for today.</p>
            <Link href="/employee/visits" className="text-brand-500 text-sm font-medium mt-2 inline-block">Create Tour Plan</Link>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <AlertCircle size={18} className="text-amber-500" /> Pending Follow-ups
          </h2>
          <div className="text-center py-8">
            <CheckCircle className="mx-auto text-gray-300 mb-2" size={32} />
            <p className="text-sm text-gray-500">No pending follow-ups.</p>
            <p className="text-xs text-gray-400 mt-1">Follow-ups from dealer and project visits will appear here.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
