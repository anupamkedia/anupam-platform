import Link from 'next/link';
import { SITE } from '@/lib/constants';
import { MapPin, Phone, Mail, ArrowRight, Factory } from 'lucide-react';

const footerLinks = [
  { title: 'Products', links: [
    { label: 'Decorative Coatings', href: '/products/decorative' },
    { label: 'Industrial Protective', href: '/products/industrial' },
    { label: 'Marine & Defence', href: '/products/marine' },
    { label: 'Railway Coatings', href: '/products/railway' },
    { label: 'Specialty Coatings', href: '/products/specialty' },
  ]},
  { title: 'Solutions', links: [
    { label: 'Structural Steel', href: '/solutions/structural-steel' },
    { label: 'Railways', href: '/solutions/railway-coaches' },
    { label: 'Marine & Navy', href: '/solutions/marine-hull' },
    { label: 'Oil & Gas', href: '/solutions/oil-gas' },
    { label: 'Fire Protection', href: '/solutions/fire-protection' },
    { label: 'Industrial Flooring', href: '/solutions/industrial-flooring' },
  ]},
  { title: 'Company', links: [
    { label: 'About Us', href: '/about' },
    { label: 'Manufacturing', href: '/infrastructure' },
    { label: 'Approvals', href: '/approvals' },
    { label: 'Clients', href: '/clients' },
    { label: 'Careers', href: '/careers' },
    { label: 'Contact', href: '/contact' },
  ]},
  { title: 'Resources', links: [
    { label: 'Technical Library', href: '/technical-library' },
    { label: 'Paint Calculator', href: '/calculator' },
    { label: 'Colour Visualizer', href: '/color-visualizer' },
    { label: 'Shade Card', href: '/shade-card' },
    { label: 'Home Painting', href: '/home-painting' },
    { label: 'Find a Dealer', href: '/dealers' },
  ]},
];

export default function Footer() {
  return (
    <footer>
      {/* Main footer */}
      <div className="bg-[var(--color-navy)] text-white/70">
        <div className="container-wide py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
            {/* Brand */}
            <div className="lg:col-span-2">
              <img src="/img/logos/anupam-paints-logo.png" alt="Anupam Paints" className="h-12 w-auto brightness-0 invert mb-4" />
              <p className="text-sm leading-relaxed mb-6 text-white/40">
                India&apos;s trusted manufacturer of decorative, industrial, marine, railway, and specialty coatings since 1972.
              </p>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2"><MapPin size={14} className="mt-1 shrink-0 text-white/30" /><span>{SITE.headOffice}</span></div>
                <div className="flex items-start gap-2"><Factory size={14} className="mt-1 shrink-0 text-white/30" /><span>{SITE.factory}</span></div>
                <div className="flex items-center gap-2"><Phone size={14} className="text-white/30" /><span>{SITE.phone} | +91-9831728605</span></div>
                <div className="flex items-center gap-2"><Mail size={14} className="text-white/30" /><a href={`mailto:${SITE.email}`} className="hover:text-white transition">{SITE.email}</a></div>
              </div>
              {/* Brand logos */}
              <div className="flex flex-wrap gap-2 mt-6">
                {['azura','asure','anex','atop','amaje','arest'].map(brand => (
                  <img key={brand} src={`/img/logos/${brand}-hd.png`}
                    alt={brand} className="h-8 w-auto opacity-70 hover:opacity-100 transition" />
                ))}
              </div>
            </div>
            {/* Link columns */}
            {footerLinks.map((col) => (
              <div key={col.title}>
                <h4 className="text-white font-semibold text-sm mb-4">{col.title}</h4>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}><Link href={link.href} className="text-sm hover:text-white transition">{link.label}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        {/* Certifications strip */}
        <div className="border-t border-white/10 py-4">
          <div className="container-wide flex flex-wrap justify-center gap-4 text-xs text-white/30">
            {['ISO 9001', 'ISO 14001', 'ISO 45001', 'RDSO', 'Indian Navy', 'MES', 'EIL', 'WRAS', 'IGBC', 'CMRL', 'AAI', 'HPCL'].map(c => (
              <span key={c}>{c}</span>
            ))}
          </div>
        </div>
        {/* Social */}
        <div className="border-t border-white/10 py-4">
          <div className="container-wide flex items-center justify-center gap-6">
            <a href="https://www.facebook.com/anupampaintsandcoatings" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition text-sm">Facebook</a>
            <a href="https://www.linkedin.com/company/anupam-paints-and-coatings/" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition text-sm">LinkedIn</a>
          </div>
        </div>
        {/* Copyright */}
        <div className="border-t border-white/10 py-4">
          <div className="container-wide flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-white/30">
            <span>&copy; {new Date().getFullYear()} Anupam Enterprises. All rights reserved.</span>
            <div className="flex gap-4">
              <Link href="/privacy-policy" className="hover:text-white/60 transition">Privacy</Link>
              <Link href="/terms" className="hover:text-white/60 transition">Terms</Link>
              <Link href="/portals" className="hover:text-white/60 transition">Portal Login</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
