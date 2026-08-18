'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { SITE } from '@/lib/constants';
import { Menu, X, ChevronDown, Search, Phone, Mail } from 'lucide-react';

const megaMenu: Record<string, { cols: { title: string; items: { label: string; href: string }[] }[]; featured?: { label: string; desc: string; href: string } }> = {
  Products: {
    cols: [
      { title: 'Decorative', items: [
        { label: 'Interior Emulsions', href: '/products/decorative' },
        { label: 'Exterior Emulsions', href: '/products/decorative' },
        { label: 'Primers & Putty', href: '/products/decorative' },
        { label: 'Waterproofing', href: '/products/decorative' },
        { label: 'Enamels & Wood Finishes', href: '/products/decorative' },
        { label: 'Texture & Designer', href: '/products/decorative' },
      ]},
      { title: 'Industrial & Protective', items: [
        { label: 'Epoxy Coatings', href: '/products/industrial' },
        { label: 'Polyurethane Coatings', href: '/products/industrial' },
        { label: 'Zinc-Rich Primers', href: '/products/industrial' },
        { label: 'MIO & High-Build', href: '/products/industrial' },
        { label: 'Heat Resistant', href: '/products/industrial' },
        { label: 'Tank Linings', href: '/products/industrial' },
        { label: 'DTM Coatings', href: '/products/industrial' },
      ]},
      { title: 'Critical & Specialty', items: [
        { label: 'Railway (RDSO)', href: '/products/railway' },
        { label: 'Marine & Naval', href: '/products/marine' },
        { label: 'Fire Protection', href: '/products/specialty' },
        { label: 'Thermal Management', href: '/products/specialty' },
        { label: 'Potable Water', href: '/products/specialty' },
        { label: 'Industrial Flooring', href: '/products/specialty' },
        { label: 'Advanced Coatings', href: '/products/specialty' },
      ]},
    ],
    featured: { label: 'Find Anupam Equivalent', desc: 'Upload a competitor spec — we recommend our alternative.', href: '/find-equivalent' },
  },
  Solutions: {
    cols: [
      { title: 'By Problem', items: [
        { label: 'Corrosion Protection', href: '/solutions/structural-steel' },
        { label: 'Fire Protection', href: '/solutions/fire-protection' },
        { label: 'Waterproofing', href: '/solutions/real-estate' },
        { label: 'Chemical Resistance', href: '/solutions/oil-gas' },
        { label: 'Heat Resistance', href: '/solutions/power-cement' },
      ]},
      { title: 'By Asset', items: [
        { label: 'Structural Steel', href: '/solutions/structural-steel' },
        { label: 'Tanks & Vessels', href: '/solutions/tank-lining' },
        { label: 'Floors', href: '/solutions/industrial-flooring' },
        { label: 'Roofs', href: '/solutions/real-estate' },
        { label: 'Pipelines', href: '/solutions/oil-gas' },
        { label: 'Containers', href: '/solutions/containers' },
      ]},
      { title: 'By Industry', items: [
        { label: 'Railways', href: '/solutions/railway-coaches' },
        { label: 'Marine & Defence', href: '/solutions/marine-hull' },
        { label: 'Oil & Gas', href: '/solutions/oil-gas' },
        { label: 'Power & Cement', href: '/solutions/power-cement' },
        { label: 'Real Estate', href: '/solutions/real-estate' },
      ]},
    ],
  },
  'Technical Centre': {
    cols: [
      { title: 'Resources', items: [
        { label: 'Technical Library / TDS', href: '/technical-library' },
        { label: 'Approvals & Certificates', href: '/approvals' },
        { label: 'Coating System Selector', href: '/#solution-finder' },
        { label: 'Paint Calculator', href: '/calculator' },
        { label: 'Find Anupam Equivalent', href: '/find-equivalent' },
        { label: 'Downloads', href: '/downloads' },
      ]},
      { title: 'Innovation', items: [
        { label: 'Carbon Nano-Struct Technology', href: '/infrastructure' },
        { label: 'R&D Laboratory', href: '/infrastructure' },
        { label: 'Testing Capabilities', href: '/infrastructure' },
        { label: 'Custom Formulation', href: '/contact' },
      ]},
    ],
  },
  'Home Painting': {
    cols: [
      { title: 'Plan Your Home', items: [
        { label: 'Get Free Quote', href: '/home-painting' },
        { label: 'Colour Visualizer', href: '/color-visualizer' },
        { label: 'Digital Shade Card', href: '/shade-card' },
        { label: 'Paint Calculator', href: '/calculator' },
        { label: 'Find a Dealer', href: '/dealers' },
      ]},
      { title: 'Our Brands', items: [
        { label: 'Azura (Luxury)', href: '/products/decorative' },
        { label: 'Asure (Premium)', href: '/products/decorative' },
        { label: 'Anex (Mainstream)', href: '/products/decorative' },
        { label: 'Atop (Economy)', href: '/products/decorative' },
        { label: 'Arest (Waterproofing)', href: '/products/decorative' },
      ]},
    ],
  },
  Company: {
    cols: [
      { title: 'About', items: [
        { label: 'Our Story', href: '/about' },
        { label: 'Manufacturing', href: '/infrastructure' },
        { label: 'Leadership Team', href: '/about#leadership' },
        { label: 'Approvals & Certificates', href: '/approvals' },
      ]},
      { title: 'Partnerships', items: [
        { label: 'Clients & Projects', href: '/clients' },
        { label: 'Become a Dealer', href: '/contact' },
        { label: 'Careers', href: '/careers' },
        { label: 'Contact Us', href: '/contact' },
      ]},
    ],
  },
};

const navItems = [
  { label: 'Products', href: '/products', mega: 'Products' },
  { label: 'Solutions', href: '/solutions', mega: 'Solutions' },
  { label: 'Industries', href: '/industries' },
  { label: 'Home Painting', href: '/home-painting', mega: 'Home Painting' },
  { label: 'Technical Centre', href: '/technical-library', mega: 'Technical Centre' },
  { label: 'Company', href: '/about', mega: 'Company' },
  { label: 'Brands', href: '/brands' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Dealership', href: '/dealership' },
  { label: 'Blog', href: '/blog' },
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
      {/* Utility bar */}
      <div className="bg-[#080F1A] text-white/80 text-xs py-2 hidden md:block">
        <div className="container-wide flex justify-between items-center">
          <div className="flex items-center gap-6">
            <a href="tel:03322651204" className="hover:text-white transition flex items-center gap-1.5"><Phone size={11} /> 033-22651204 | +91-9831728605</a>
            <a href="mailto:care@anupampaints.com" className="hover:text-white transition flex items-center gap-1.5"><Mail size={11} /> care@anupampaints.com</a>
          </div>
          <div className="flex items-center gap-5 text-white/60">
            <Link href="/dealers" className="hover:text-white transition">Find a Dealer</Link>
            <span className="text-white/20">|</span>
            <Link href="/downloads" className="hover:text-white transition">Download Catalogue</Link>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <header className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${scrolled ? 'shadow-md' : 'border-b border-[var(--color-border)]'}`}>
        <div className="container-wide flex items-center justify-between h-[60px] md:h-[68px]">
          <Link href="/" className="shrink-0">
            <img src="/img/logos/anupam-paints-logo.png" alt="Anupam Paints" className="h-11 md:h-16 w-auto" />
          </Link>

          <nav className="hidden xl:flex items-center gap-0.5">
            {navItems.map((item) => (
              <div key={item.label} className="relative"
                onMouseEnter={() => item.mega && openMega(item.mega)}
                onMouseLeave={closeMega}>
                <Link href={item.href}
                  className={`flex items-center gap-1 px-3 py-2 text-[13px] font-medium transition ${activeMega === item.mega ? 'text-[var(--color-navy)]' : 'text-[var(--color-steel)] hover:text-[var(--color-navy)]'}`}>
                  {item.label}
                  {item.mega && <ChevronDown size={12} className={`transition-transform ${activeMega === item.mega ? 'rotate-180' : ''}`} />}
                </Link>

                {item.mega && activeMega === item.mega && megaMenu[item.mega] && (
                  <div className="absolute top-full left-0 pt-2 z-50" onMouseEnter={() => openMega(item.mega!)} onMouseLeave={closeMega}>
                    <div className="bg-white shadow-xl border border-[var(--color-border)] p-6" style={{borderRadius:'var(--radius-lg)', maxWidth: '90vw', minWidth: megaMenu[item.mega].cols.length > 2 ? '560px' : '360px'}}>
                      <div className={`grid gap-8 ${megaMenu[item.mega].cols.length > 2 ? 'grid-cols-3' : 'grid-cols-2'}`}>
                        {megaMenu[item.mega].cols.map((col, ci) => (
                          <div key={ci}>
                            <div className="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-steel)] mb-3">{col.title}</div>
                            <div className="space-y-0.5">
                              {col.items.map((sub) => (
                                <Link key={sub.label} href={sub.href} onClick={() => setActiveMega(null)}
                                  className="block text-[13px] py-1.5 text-[var(--color-steel)] hover:text-[var(--color-navy)] transition font-medium">{sub.label}</Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                      {megaMenu[item.mega].featured && (
                        <div className="mt-6 pt-5 border-t border-[var(--color-border)]">
                          <Link href={megaMenu[item.mega].featured!.href} onClick={() => setActiveMega(null)}
                            className="flex items-center justify-between group">
                            <div>
                              <div className="text-sm font-semibold text-[var(--color-navy)]">{megaMenu[item.mega].featured!.label}</div>
                              <div className="text-xs text-[var(--color-steel)]">{megaMenu[item.mega].featured!.desc}</div>
                            </div>
                            <ChevronDown size={14} className="-rotate-90 text-[var(--color-steel)] group-hover:text-[var(--color-navy)]" />
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/portals" className="hidden md:inline-flex text-[13px] font-medium text-[var(--color-steel)] hover:text-[var(--color-navy)] transition px-3 py-2">Login</Link>
            <Link href="/contact" className="hidden md:inline-flex bg-[var(--color-red)] text-white text-[13px] font-semibold px-5 py-2.5 hover:bg-[var(--color-red-hover)] transition" style={{borderRadius:'var(--radius-md)'}}>Request a Quote</Link>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="xl:hidden p-2 text-[var(--color-graphite)]" aria-label="Menu">
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="xl:hidden bg-white pb-safe border-t border-[var(--color-border)] max-h-[80vh] overflow-y-auto">
            {navItems.map((item) => (
              <Link key={item.label} href={item.href} onClick={() => setMobileOpen(false)}
                className="block px-6 py-3 text-[var(--color-graphite)] font-medium border-b border-[var(--color-border)] text-sm">{item.label}</Link>
            ))}
            <Link href="/industries" onClick={() => setMobileOpen(false)} className="block px-6 py-3 text-[var(--color-graphite)] font-medium border-b border-[var(--color-border)] text-sm">Industries</Link>
            <Link href="/find-equivalent" onClick={() => setMobileOpen(false)} className="block px-6 py-3 text-[var(--color-graphite)] font-medium border-b border-[var(--color-border)] text-sm">Find Anupam Equivalent</Link>
            <div className="p-4">
              <Link href="/contact" className="bg-[var(--color-red)] text-white font-semibold py-3 text-center block text-sm" style={{borderRadius:'var(--radius-md)'}} onClick={() => setMobileOpen(false)}>Request a Quote</Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
