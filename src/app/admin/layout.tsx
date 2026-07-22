'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Package, FileText, Image, Users, MessageSquare,
  Settings, ChevronLeft, ChevronRight, PenLine, Store, Megaphone,
  Shield, BarChart3, Bell, Menu, X, LogOut
} from 'lucide-react';

const sidebarItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Products', href: '/admin/products', icon: Package },
  { label: 'Pages & CMS', href: '/admin/pages', icon: FileText },
  { label: 'Media Library', href: '/admin/media', icon: Image },
  { label: 'Blog Posts', href: '/admin/blog', icon: PenLine },
  { label: 'Enquiries', href: '/admin/enquiries', icon: MessageSquare },
  { label: 'Dealers', href: '/admin/dealers', icon: Store },
  { label: 'Approvals', href: '/admin/approvals', icon: Shield },
  { label: 'Campaigns', href: '/admin/campaigns', icon: Megaphone },
  { label: 'Reports', href: '/admin/reports', icon: BarChart3 },
  { label: 'Users & Roles', href: '/admin/users', icon: Users },
  { label: 'Notifications', href: '/admin/notifications', icon: Bell },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 bg-brand-500 text-white transition-all duration-300 flex flex-col
        ${collapsed ? 'w-16' : 'w-64'} ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-brand-400/30">
          {!collapsed && <span className="font-bold text-lg">Admin Panel</span>}
          <button onClick={() => setCollapsed(!collapsed)} className="hidden lg:block p-1 hover:bg-brand-400/30 rounded">
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
          <button onClick={() => setMobileOpen(false)} className="lg:hidden p-1 hover:bg-brand-400/30 rounded">
            <X size={18} />
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 py-4 overflow-y-auto">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
            return (
              <Link key={item.href} href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 mx-2 rounded-lg text-sm transition mb-0.5
                  ${isActive ? 'bg-white/15 text-white font-medium' : 'text-brand-200 hover:bg-white/10 hover:text-white'}`}
                title={collapsed ? item.label : undefined}>
                <item.icon size={20} className="shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="p-4 border-t border-brand-400/30">
          <Link href="/" className="flex items-center gap-3 text-brand-200 hover:text-white text-sm transition">
            <LogOut size={18} />
            {!collapsed && <span>Back to Website</span>}
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <div className={`flex-1 transition-all duration-300 ${collapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
        {/* Top bar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-40">
          <button onClick={() => setMobileOpen(true)} className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
            <Menu size={20} />
          </button>
          <div className="text-sm text-gray-500">
            <span className="font-medium text-gray-800">Anupam Paints</span> — Administration
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-accent-400 rounded-full"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-brand-500 text-white flex items-center justify-center text-sm font-medium">A</div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 lg:p-6">{children}</main>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}
    </div>
  );
}
