'use client';
import Link from 'next/link';
import { Store, Paintbrush, Users, Briefcase, BarChart3, Settings } from 'lucide-react';

const portals = [
  { name: 'Dealer Portal', desc: 'Orders, catalogue, statements, schemes, loyalty, complaints, warranty, training.', href: '/dealer', icon: Store },
  { name: 'Painter Portal', desc: 'Scan codes, earn points, redeem rewards, register projects, training.', href: '/painter', icon: Paintbrush },
  { name: 'Customer Portal', desc: 'Warranty registration, product authenticity, complaints, purchase history.', href: '/customer', icon: Users },
  { name: 'Employee SFA', desc: 'GPS attendance, visits, leads, tour plans, quotations, expenses.', href: '/employee', icon: Briefcase },
  { name: 'Manager Dashboard', desc: 'Team performance, visit review, pipeline, approvals, reports.', href: '/manager', icon: BarChart3 },
  { name: 'Admin Panel', desc: 'Products, enquiries, blog, media, dealers, settings, reports.', href: '/admin', icon: Settings },
];

export default function PortalsPage() {
  return (
    <>
      <section className="bg-[var(--color-navy)] text-white py-16 md:py-24">
        <div className="container-wide">
          <div className="section-divider !bg-[var(--color-red)] !mb-6" />
          <h1 className="text-page-title text-white mb-3">Portal Login</h1>
          <p className="text-white/50 max-w-xl">Access your dedicated dashboard based on your role.</p>
        </div>
      </section>
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portals.map((portal) => (
              <Link key={portal.name} href={portal.href} className="card card-hover p-6 group">
                <portal.icon size={28} className="text-[var(--color-navy)] mb-4 group-hover:text-[var(--color-red)] transition" />
                <h3 className="text-card-heading text-[var(--color-navy)] mb-2">{portal.name}</h3>
                <p className="text-caption leading-relaxed">{portal.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
