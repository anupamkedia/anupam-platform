'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import { Package, MessageSquare, Store, FileText, TrendingUp, Eye, AlertCircle } from 'lucide-react';
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export default function AdminDashboard() {
  const [stats, setStats] = useState({ products: 0, enquiries: 0, dealers: 0, posts: 0 });
  useEffect(() => {
    Promise.all([
      supabase.from('products').select('id', { count: 'exact', head: true }),
      supabase.from('enquiries').select('id', { count: 'exact', head: true }).eq('status', 'new'),
      supabase.from('dealers').select('id', { count: 'exact', head: true }),
      supabase.from('blog_posts').select('id', { count: 'exact', head: true }),
    ]).then(([p, e, d, b]) => setStats({ products: p.count||0, enquiries: e.count||0, dealers: d.count||0, posts: b.count||0 }));
  }, []);
  const statCards = [
    { label: 'Total Products', value: stats.products, icon: Package, color: 'bg-blue-500', href: '/admin/products' },
    { label: 'New Enquiries', value: stats.enquiries, icon: MessageSquare, color: 'bg-red-500', href: '/admin/enquiries' },
    { label: 'Active Dealers', value: stats.dealers, icon: Store, color: 'bg-green-500', href: '/admin/dealers' },
    { label: 'Blog Posts', value: stats.posts, icon: FileText, color: 'bg-purple-500', href: '/admin/blog' },
  ];
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map(s => (
          <Link key={s.label} href={s.href} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition group">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg ${s.color} text-white flex items-center justify-center`}><s.icon size={20} /></div>
              <TrendingUp size={16} className="text-gray-300 group-hover:text-green-500 transition" />
            </div>
            <div className="text-2xl font-bold text-gray-800">{s.value}</div>
            <div className="text-sm text-gray-500">{s.label}</div>
          </Link>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-bold text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            {[{ label: 'Add Product', href: '/admin/products' },{ label: 'New Blog Post', href: '/admin/blog' },{ label: 'View Enquiries', href: '/admin/enquiries' },{ label: 'Manage Dealers', href: '/admin/dealers' },{ label: 'Media Library', href: '/admin/media' },{ label: 'Site Settings', href: '/admin/settings' }].map(a => (
              <Link key={a.label} href={a.href} className="flex items-center gap-2 p-3 rounded-lg border border-gray-100 hover:bg-brand-50 hover:border-brand-200 transition text-sm font-medium text-gray-700">
                <Eye size={16} className="text-brand-500" />{a.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-bold text-gray-800 mb-4">Platform Summary</h2>
          <p className="text-sm text-gray-500">All portals are operational. Add products, dealers, and content to build out the platform.</p>
        </div>
      </div>
    </div>
  );
}