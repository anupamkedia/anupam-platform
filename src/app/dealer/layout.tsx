'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Package, ShoppingCart, FileText, Gift, Star, AlertCircle, Shield, Target, GraduationCap, Store, Menu, X, LogOut } from 'lucide-react';
const navItems = [
  { label: 'Dashboard', href: '/dealer', icon: LayoutDashboard },
  { label: 'Catalogue', href: '/dealer/catalogue', icon: Package },
  { label: 'Orders', href: '/dealer/orders', icon: ShoppingCart },
  { label: 'Statements', href: '/dealer/statements', icon: FileText },
  { label: 'Schemes', href: '/dealer/schemes', icon: Gift },
  { label: 'Loyalty', href: '/dealer/loyalty', icon: Star },
  { label: 'Complaints', href: '/dealer/complaints', icon: AlertCircle },
  { label: 'Warranty', href: '/dealer/warranty', icon: Shield },
  { label: 'Leads', href: '/dealer/leads', icon: Target },
  { label: 'Training', href: '/dealer/training', icon: GraduationCap },
];
export default function DealerLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-green-700 text-white h-14 flex items-center justify-between px-4 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <button onClick={() => setMobileOpen(true)} className="lg:hidden p-1"><Menu size={20} /></button>
          <Store size={20} /><span className="font-bold text-sm">Dealer Portal</span>
        </div>
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm">D</div>
      </header>
      <div className="flex">
        <aside className="hidden lg:block w-56 bg-white border-r border-gray-200 min-h-[calc(100vh-56px)] sticky top-14">
          <nav className="py-3">{navItems.map(item => (
            <Link key={item.href} href={item.href}
              className={`flex items-center gap-3 px-4 py-2 text-sm transition ${pathname === item.href ? 'bg-green-50 text-green-700 font-medium border-r-2 border-green-600' : 'text-gray-600 hover:bg-gray-50'}`}>
              <item.icon size={18} /> {item.label}
            </Link>))}
            <div className="border-t border-gray-100 mt-3 pt-3"><Link href="/" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-400 hover:text-gray-600"><LogOut size={18} /> Back to Site</Link></div>
          </nav>
        </aside>
        <main className="flex-1 p-4 lg:p-6">{children}</main>
      </div>
      {mobileOpen && (<>
        <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setMobileOpen(false)} />
        <div className="fixed inset-y-0 left-0 w-64 bg-white z-50 shadow-xl">
          <div className="h-14 bg-green-700 flex items-center justify-between px-4"><span className="text-white font-bold">Dealer Portal</span><button onClick={() => setMobileOpen(false)} className="text-white"><X size={20} /></button></div>
          <nav className="py-3">{navItems.map(item => (
            <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-4 py-2.5 text-sm ${pathname === item.href ? 'bg-green-50 text-green-700 font-medium' : 'text-gray-600'}`}>
              <item.icon size={18} /> {item.label}
            </Link>))}</nav>
        </div></>)}
    </div>
  );
}
