'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, MapPin, Calendar, Users, Target, DollarSign, BarChart3, Receipt, Menu, X, LogOut, ClipboardList, Navigation, FileText } from 'lucide-react';

const navItems = [
  { label: 'Dashboard', href: '/employee', icon: LayoutDashboard },
  { label: 'Attendance', href: '/employee/attendance', icon: MapPin },
  { label: 'Tour Plan', href: '/employee/tour-plan', icon: Calendar },
  { label: 'Visits', href: '/employee/visits', icon: Navigation },
  { label: 'Leads', href: '/employee/leads', icon: Target },
  { label: 'Quotations', href: '/employee/quotations', icon: FileText },
  { label: 'Tasks', href: '/employee/tasks', icon: ClipboardList },
  { label: 'Expenses', href: '/employee/expenses', icon: Receipt },
  { label: 'Sales', href: '/employee/sales', icon: BarChart3 },
  { label: 'Collections', href: '/employee/collections', icon: DollarSign },
];

export default function EmployeeLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-brand-500 text-white h-14 flex items-center justify-between px-4 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <button onClick={() => setMobileOpen(true)} className="lg:hidden p-1"><Menu size={20} /></button>
          <span className="font-bold text-sm">Anupam SFA</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-brand-200 hidden sm:block">Employee Portal</span>
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm">E</div>
        </div>
      </header>
      <div className="flex">
        <aside className="hidden lg:block w-56 bg-white border-r border-gray-200 min-h-[calc(100vh-56px)] sticky top-14">
          <nav className="py-3">
            {navItems.map(item => {
              const isActive = pathname === item.href;
              return (<Link key={item.href} href={item.href}
                className={`flex items-center gap-3 px-4 py-2 text-sm transition ${isActive ? 'bg-brand-50 text-brand-500 font-medium border-r-2 border-brand-500' : 'text-gray-600 hover:bg-gray-50'}`}>
                <item.icon size={18} /> {item.label}
              </Link>);
            })}
            <div className="border-t border-gray-100 mt-3 pt-3">
              <Link href="/" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-400 hover:text-gray-600"><LogOut size={18} /> Back to Site</Link>
            </div>
          </nav>
        </aside>
        <main className="flex-1 p-4 lg:p-6">{children}</main>
      </div>
      {mobileOpen && (<>
        <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setMobileOpen(false)} />
        <div className="fixed inset-y-0 left-0 w-64 bg-white z-50 shadow-xl">
          <div className="h-14 bg-brand-500 flex items-center justify-between px-4">
            <span className="text-white font-bold">Anupam SFA</span>
            <button onClick={() => setMobileOpen(false)} className="text-white"><X size={20} /></button>
          </div>
          <nav className="py-3">{navItems.map(item => (
            <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-4 py-2.5 text-sm ${pathname === item.href ? 'bg-brand-50 text-brand-500 font-medium' : 'text-gray-600'}`}>
              <item.icon size={18} /> {item.label}
            </Link>))}</nav>
        </div>
      </>)}
    </div>
  );
}
