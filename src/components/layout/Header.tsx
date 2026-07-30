'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { SITE } from '@/lib/constants';
import { Menu, X, ChevronDown, Search, Download, Phone, Mail, User } from 'lucide-react';

const megaMenu = {
  Products: {
    cols: [
      { title: 'Decorative', items: [
        { label: 'Interior Emulsions', href: '/products/decorative' },
        { label: 'Exterior Emulsions', href: '/products/decorative' },
        { label: 'Primers & Preparatory', href: '/products/decorative' },
        { label: 'Waterproofing', href: '/products/decorative' },
        { label: 'Enamels & Wood', href: '/products/decorative' },
        { label: 'Texture Finishes', href: '/products/decorative' },
      ]},
      { title: 'Industrial & Specialty', items: [
        { label: 'Industrial Protective', href: '/products/industrial' },
        { label: 'Marine & Defence', href: '/products/marine' },
        { label: 'Railway Coatings', href: '/products/railway' },
        { label: 'Specialty Coatings', href: '/products/specialty' },
        { label: 'Fire Protection', href: '/products/specialty' },
        { label: 'Industrial Flooring', href: '/products/specialty' },
      ]},
      { title: 'Tools', items: [
        { label: 'Product Finder', href: '/product-finder' },
        { label: 'Paint Calculator', href: '/calculator' },
        { label: 'Shade Card', href: '/shade-card' },
        { label: 'Colour Visualizer', href: '/color-visualizer' },
      ]},
    ],
  },
  Solutions: {
    cols: [
      { title: 'By Industry', items: [
        { label: 'Railways', href: '/solutions/railway-coaches' },
        { label: 'Marine & Navy', href: '/solutions/marine-hull' },
        { label: 'Oil & Gas', href: '/solutions/oil-gas' },
        { label: 'Real Estate', href: '/solutions/real-estate' },
        { label: 'Power & Cement', href: '/solutions/power-cement' },
      ]},
      { title: 'By Asset', items: [
        { label: 'Structural Steel', href: '/solutions/structural-steel' },
        { label: 'Tank Lining', href: '/solutions/tank-lining' },
        { label: 'Industrial Flooring', href: '/solutions/industrial-flooring' },
        { label: 'Containers', href: '/solutions/containers' },
        { label: 'Fire Protection', href: '/solutions/fire-protection' },
      ]},
    ],
  },
  Company: {
    cols: [
      { title: 'About', items: [
        { label: 'Our Story', href: '/about' },
        { label: 'Manufacturing', href: '/infrastructure' },
        { label: 'R&D & Quality', href: '/infrastructure' },
        { label: 'Approvals', href: '/approvals' },
        { label: 'Clients & Projects', href: '/clients' },
        { label: 'Careers', href: '/careers' },
      ]},
    ],
  },
};

const navItems = [
  { label: 'Products', href: '/products', mega: 'Products' },
  { label: 'Solutions', href: '/solutions', mega: 'Solutions' },
  { label: 'Industries', href: '/solutions' },
  { label: 'Home Painting', href: '/home-painting' },
  { label: 'Company', href: '/about', mega: 'Company' },
  { label: 'Contact', href: '/contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const [megaTimeout, setMegaTimeout] = useState<any>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const openMega = (key: string) => { if (megaTimeout) clearTimeout(megaTimeout); setActiveMega(key); };
  const closeMega = () => { const t = setTimeout(() => setActiveMega(null), 200); setMegaTimeout(t); };

  return (
    <>
      {/* Top bar */}
      <div className="bg-[var(--color-navy)] text-white/80 text-xs py-2 hidden md:block">
        <div className="container-wide flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5"><Phone size={12} /> {SITE.phone}</span>
            <span className="flex items-center gap-1.5"><Mail size={12} /> {SITE.email}</span>
          </div>
          <div className="flex items-center gap-5">
            <Link href="/technical-library" className="hover:text-white transition flex items-center gap-1"><Download size={12} /> Technical Library</Link>
            <Link href="/dealers" className="hover:text-white transition">Find a Dealer</Link>
            <Link href="/portals" className="hover:text-white transition flex items-center gap-1"><User size={12} /> Login</Link>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <header className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${scrolled ? 'shadow-md' : 'border-b border-[var(--color-border)]'}`}>
        <div className="container-wide flex items-center justify-between h-16 md:h-[72px]">
          <Link href="/" className="shrink-0">
            <img src="/img/logos/anupam-paints-logo.png" alt="Anupam Paints" className="h-10 md:h-12 w-auto" />
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div key={item.label} className="relative"
                onMouseEnter={() => item.mega && openMega(item.mega)}
                onMouseLeave={closeMega}>
                <Link href={item.href}
                  className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-[var(--color-graphite)] hover:text-[var(--color-navy)] transition">
                  {item.label}
                  {item.mega && <ChevronDown size={14} className={`transition-transform ${activeMega === item.mega ? 'rotate-180' : ''}`} />}
                </Link>

                {item.mega && activeMega === item.mega && (
                  <div className="absolute top-full left-0 pt-2 z-50" onMouseEnter={() => openMega(item.mega!)} onMouseLeave={closeMega}>
                    <div className="bg-white shadow-xl border border-[var(--color-border)] p-6 min-w-[480px]" style={{borderRadius: 'var(--radius-lg)'}}>
                      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                        {(megaMenu as any)[item.mega]?.cols.map((col: any, ci: number) => (
                          <div key={ci}>
                            <div className="text-label mb-3">{col.title}</div>
                            <div className="space-y-1">
                              {col.items.map((sub: any) => (
                                <Link key={sub.label} href={sub.href} className="block text-sm py-1.5 text-[var(--color-steel)] hover:text-[var(--color-navy)] transition font-medium">
                                  {sub.label}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/contact" className="hidden md:inline-flex btn-primary text-sm !py-2.5">Request Quote</Link>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 text-[var(--color-graphite)]" aria-label="Menu">
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-[var(--color-border)] max-h-[80vh] overflow-y-auto">
            {navItems.map((item) => (
              <div key={item.label}>
                <Link href={item.href} onClick={() => setMobileOpen(false)}
                  className="block px-6 py-3.5 text-[var(--color-graphite)] font-medium border-b border-[var(--color-border)] text-sm">
                  {item.label}
                </Link>
              </div>
            ))}
            <div className="p-4"><Link href="/contact" className="btn-primary w-full text-center block" onClick={() => setMobileOpen(false)}>Request Quote</Link></div>
          </div>
        )}
      </header>
    </>
  );
}
