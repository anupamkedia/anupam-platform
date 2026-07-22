import Link from 'next/link';
import { SITE } from '@/lib/constants';
import { MapPin, Phone, Mail, ArrowRight, Shield, Award, Factory } from 'lucide-react';

const footerLinks = [
  {
    title: 'Products',
    links: [
      { label: 'Decorative Coatings', href: '/products/decorative' },
      { label: 'Industrial Protective', href: '/products/industrial' },
      { label: 'Marine & Defence', href: '/products/marine' },
      { label: 'Railway Coatings', href: '/products/railway' },
      { label: 'Specialty Coatings', href: '/products/specialty' },
      { label: 'Product Finder', href: '/products?finder=true' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Infrastructure', href: '/infrastructure' },
      { label: 'Approvals', href: '/approvals' },
      { label: 'Clients & Projects', href: '/clients' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Technical Library', href: '/technical-library' },
      { label: 'Paint Calculator', href: '/calculator' },
      { label: 'Blog', href: '/blog' },
      { label: 'Testimonials', href: '/testimonials' },
      { label: 'Find a Dealer', href: '/dealers' },
      { label: 'Become a Dealer', href: '/dealers' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-brand-500 text-white">
      {/* CTA strip */}
      <div className="bg-gradient-to-r from-accent-400 to-accent-500 py-8">
        <div className="container-wide px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-xl md:text-2xl font-bold">Ready to Discuss Your Project?</h3>
            <p className="text-white/80 mt-1">Get expert technical support and competitive quotes for your coating requirements.</p>
          </div>
          <div className="flex gap-3">
            <Link href="/contact" className="bg-white text-accent-400 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition">
              Request Quote
            </Link>
            <Link href="/technical-library" className="border-2 border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/10 transition">
              Download TDS
            </Link>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container-wide px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Company info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <div>
                <div className="text-xl font-bold">ANUPAM PAINTS</div>
                <div className="text-xs text-brand-200 tracking-wider">ANUPAM ENTERPRISES</div>
              </div>
            </div>
            <p className="text-brand-200 text-sm leading-relaxed mb-4">
              India&apos;s trusted manufacturer of decorative, industrial, marine, railway, and specialty coatings since 1972.
              ISO 9001 | ISO 14001 | ISO 45001 certified.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2 text-brand-200">
                <MapPin size={16} className="mt-0.5 shrink-0" />
                <div>
                  <div className="font-medium text-white">Head Office</div>
                  {SITE.headOffice}
                </div>
              </div>
              <div className="flex items-start gap-2 text-brand-200">
                <Factory size={16} className="mt-0.5 shrink-0" />
                <div>
                  <div className="font-medium text-white">Manufacturing</div>
                  {SITE.factory}
                </div>
              </div>
              <div className="flex items-center gap-2 text-brand-200">
                <Phone size={16} className="shrink-0" /> {SITE.phone}
              </div>
              <div className="flex items-center gap-2 text-brand-200">
                <Mail size={16} className="shrink-0" /> {SITE.email}
              </div>
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map((col) => (
            <div key={col.title}>
              <h4 className="font-semibold text-white mb-4">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-brand-200 text-sm hover:text-white transition flex items-center gap-1 group">
                      <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Certifications strip */}
        <div className="mt-12 pt-8 border-t border-brand-400/30 flex flex-wrap items-center gap-4 justify-center">
          {['ISO 9001', 'ISO 14001', 'ISO 45001', 'RDSO', 'Indian Navy', 'MES', 'EIL', 'WRAS', 'IGBC'].map((cert) => (
            <span key={cert} className="bg-white/10 text-brand-100 text-xs px-3 py-1.5 rounded-full flex items-center gap-1">
              <Shield size={12} /> {cert}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-brand-400/30 py-4 px-4">
        <div className="container-wide flex flex-col md:flex-row items-center justify-between gap-2 text-sm text-brand-300">
          <div>&copy; {new Date().getFullYear()} Anupam Enterprises. All rights reserved.</div>
          <div className="flex gap-4">
            <Link href="/privacy-policy" className="hover:text-white transition">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
