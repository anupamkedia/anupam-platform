'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, QrCode, Coins, Gift, Briefcase, Megaphone, GraduationCap, Target, MapPin, Menu, X, LogOut, Paintbrush } from 'lucide-react';
const navItems = [
  { label: 'Dashboard', href: '/painter', icon: LayoutDashboard },
  { label: 'Scan QR', href: '/painter/scan', icon: QrCode },
  { label: 'My Points', href: '/painter/points', icon: Coins },
  { label: 'Rewards', href: '/painter/rewards', icon: Gift },
  { label: 'My Projects', href: '/painter/projects', icon: Briefcase },
  { label: 'Schemes', href: '/painter/schemes', icon: Megaphone },
  { label: 'Training', href: '/painter/training', icon: GraduationCap },
  { label: 'Submit Lead', href: '/painter/leads', icon: Target },
  { label: 'Near Me', href: '/painter/dealers', icon: MapPin },
];
export default function PainterLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-orange-600 text-white h-14 flex items-center justify-between px-4 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <button onClick={() => setMobileOpen(true)} className="lg:hidden p-1"><Menu size={20} /></button>
          <Paintbrush size={20} /><span className="font-bold text-sm">Painter Portal</span>
        </div>
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm">P</div>
      </header>
      <div className="flex">
        <aside className="hidden lg:block w-56 bg-white border-r border-gray-200 min-h-[calc(100vh-56px)] sticky top-14">
          <nav className="py-3">{navItems.map(item => (
            <Link key={item.href} href={item.href}
              className={`flex items-center gap-3 px-4 py-2 text-sm transition ${pathname === item.href ? 'bg-orange-50 text-orange-600 font-medium border-r-2 border-orange-500' : 'text-gray-600 hover:bg-gray-50'}`}>
              <item.icon size={18} /> {item.label}
            </Link>))}
            <div className="border-t border-gray-100 mt-3 pt-3"><Link href="/" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-400"><LogOut size={18} /> Back</Link></div>
          </nav>
        </aside>
        <main className="flex-1 p-4 lg:p-6">{children}</main>
      </div>
      {mobileOpen && (<>
        <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setMobileOpen(false)} />
        <div className="fixed inset-y-0 left-0 w-64 bg-white z-50 shadow-xl">
          <div className="h-14 bg-orange-600 flex items-center justify-between px-4"><span className="text-white font-bold">Painter Portal</span><button onClick={() => setMobileOpen(false)} className="text-white"><X size={20} /></button></div>
          <nav className="py-3">{navItems.map(item => (
            <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-4 py-2.5 text-sm ${pathname === item.href ? 'bg-orange-50 text-orange-600 font-medium' : 'text-gray-600'}`}>
              <item.icon size={18} /> {item.label}
            </Link>))}</nav>
        </div></>)}
    </div>
  );
}