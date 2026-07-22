'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { NAV_ITEMS, SITE } from '@/lib/constants';
import { Menu, X, ChevronDown, Phone, Mail } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [dropdownTimeout, setDropdownTimeout] = useState<any>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const openDropdown = (label: string) => {
    if (dropdownTimeout) clearTimeout(dropdownTimeout);
    setActiveDropdown(label);
  };
  const closeDropdown = () => {
    const timeout = setTimeout(() => setActiveDropdown(null), 200);
    setDropdownTimeout(timeout);
  };

  return (
    <>
      <div className="bg-brand-500 text-white text-sm py-2 px-4 hidden md:block">
        <div className="container-wide flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1"><Phone size={14} /> {SITE.phone}</span>
            <span className="flex items-center gap-1"><Mail size={14} /> {SITE.email}</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/dealers" className="hover:text-brand-100 transition">Find a Dealer</Link>
            <span className="text-brand-300">|</span>
            <Link href="/technical-library" className="hover:text-brand-100 transition">Technical Library</Link>
          </div>
        </div>
      </div>
      <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white shadow-sm'}`}>
        <div className="container-wide flex items-center justify-between h-16 md:h-20 px-4">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <img src="/img/logos/anupam-paints-logo.png" alt="Anupam Paints" className="h-10 md:h-14 w-auto" />
          </Link>
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1">
            {NAV_ITEMS.map((item) => (
              <div key={item.label} className="relative"
                onMouseEnter={() => item.children && openDropdown(item.label)}
                onMouseLeave={closeDropdown}>
                <Link href={item.href}
                  className="flex items-center gap-1 px-2.5 xl:px-3 py-2 text-sm font-medium text-gray-700 hover:text-brand-500 transition rounded-lg hover:bg-brand-50">
                  {item.label}
                  {item.children && <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === item.label ? 'rotate-180' : ''}`} />}
                </Link>
                {item.children && activeDropdown === item.label && (
                  <div className="absolute top-full left-0 w-64 pt-0 z-50"
                    onMouseEnter={() => openDropdown(item.label)}
                    onMouseLeave={closeDropdown}>
                    <div className="bg-white rounded-xl shadow-2xl border border-gray-100 py-2 mt-0">
                      {item.children.map((child) => (
                        <Link key={child.label} href={child.href}
                          className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-brand-50 hover:text-brand-500 transition">
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/contact" className="hidden md:inline-flex btn-accent text-sm !px-4 !py-2">Request Quote</Link>
            <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg" aria-label="Toggle menu">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        {isOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 shadow-xl max-h-[80vh] overflow-y-auto">
            {NAV_ITEMS.map((item) => (
              <div key={item.label}>
                <Link href={item.href} onClick={() => { if (!item.children) setIsOpen(false); }}
                  className="block px-6 py-3 text-gray-700 font-medium hover:bg-brand-50 hover:text-brand-500 border-b border-gray-50">
                  {item.label}
                </Link>
                {item.children?.map((child) => (
                  <Link key={child.label} href={child.href} onClick={() => setIsOpen(false)}
                    className="block px-10 py-2.5 text-sm text-gray-600 hover:bg-brand-50 hover:text-brand-500">
                    {child.label}
                  </Link>
                ))}
              </div>
            ))}
            <div className="p-4 border-t border-gray-100">
              <Link href="/contact" className="btn-accent w-full text-center block" onClick={() => setIsOpen(false)}>Request Quote</Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
