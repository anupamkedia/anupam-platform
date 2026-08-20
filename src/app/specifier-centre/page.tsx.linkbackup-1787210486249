'use client';
import Link from 'next/link';
import { FileText, Search, Shield, Download, Layers, Send, ArrowRight, Users, Building2, ClipboardList } from 'lucide-react';

const tools = [
  { icon: Layers, title: 'Coating System Selector', desc: 'Select your asset, substrate, and environment — get a complete coating system recommendation with DFT and products.', href: '/#solution-finder', cta: 'Build a System' },
  { icon: Search, title: 'Product Finder', desc: 'Search our complete product catalogue by chemistry, application, substrate, or industry.', href: '/technical-library', cta: 'Search Products' },
  { icon: Shield, title: 'Approval Finder', desc: 'Find Anupam products approved by RDSO, Indian Navy, MES, EIL, AAI, CMRL, HPCL, WRAS and other bodies.', href: '/approvals', cta: 'Find Approvals' },
  { icon: FileText, title: 'TDS Library', desc: 'Access Technical Data Sheets for every product in our range. Request specific documents.', href: '/technical-library', cta: 'Browse TDS' },
  { icon: ClipboardList, title: 'Find Anupam Equivalent', desc: 'Specify a competitor product — we recommend our technically reviewed alternative.', href: '/find-equivalent', cta: 'Find Equivalent' },
  { icon: Download, title: 'Specification Downloads', desc: 'Method statements, application specifications, system documents, and compliance statements.', href: '/technical-library', cta: 'Download Specs' },
];

const audiences = [
  { title: 'Architects & Designers', desc: 'Shade resources, product specifications, inspirational references, and sample requests.', items: ['Shade Card', 'Colour Visualizer', 'Product Specifications', 'Sample Request'] },
  { title: 'Coating Consultants', desc: 'System specifications, DFT data, test reports, approval certificates, and BOQ support.', items: ['System Selector', 'TDS Library', 'Test Reports', 'BOQ Clauses'] },
  { title: 'EPC Engineers', desc: 'Product equivalency, tender support, compliance documentation, and technical presentations.', items: ['Find Equivalent', 'Tender Desk', 'Compliance Docs', 'Site Inspection'] },
  { title: 'Government Engineers', desc: 'Vendor credentials, approvals, product specifications, and institutional documentation.', items: ['Approvals', 'Vendor Credentials', 'Product Specs', 'Contact PSU Desk'] },
];

export default function SpecifierCentrePage() {
  return (
    <>
      <section className="relative text-white overflow-hidden">
        <img src="/img/app/industrial/ind-highbuild.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[var(--color-navy)]/75" />
        <div className="py-16 md:py-24 relative z-10">
        <div className="container-wide max-w-3xl">
          <div className="w-12 h-[2px] bg-[var(--color-red)] mb-6" />
          <h1 className="text-page-title text-white mb-4">Specifier Centre</h1>
          <p className="text-white/50 leading-relaxed">Technical resources for architects, consultants, EPC engineers, and specifiers. Find coating systems, access technical documents, check approvals, and request specification support.</p>
        </div>
      </div></section>

      <section className="section-padding" style={{background: 'var(--color-warm-white)'}}>
        <div className="container-wide">
          <h2 className="text-section-heading mb-8">Specification Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tools.map(tool => (
              <Link key={tool.title} href={tool.href} className="card card-hover p-6 group">
                <tool.icon size={24} className="text-[var(--color-navy)] mb-3 group-hover:text-[var(--color-red)] transition" />
                <h3 className="font-semibold text-[var(--color-navy)] mb-2">{tool.title}</h3>
                <p className="text-sm text-[var(--color-steel)] leading-relaxed mb-4">{tool.desc}</p>
                <span className="text-sm font-semibold text-[var(--color-red)] inline-flex items-center gap-1 group-hover:gap-2 transition-all">{tool.cta} <ArrowRight size={14} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-wide">
          <h2 className="text-section-heading mb-8">Resources By Role</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {audiences.map(aud => (
              <div key={aud.title} className="card p-6">
                <h3 className="font-semibold text-[var(--color-navy)] mb-2">{aud.title}</h3>
                <p className="text-sm text-[var(--color-steel)] mb-4">{aud.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {aud.items.map(item => <span key={item} className="text-xs px-2.5 py-1 bg-gray-100 text-[var(--color-graphite)]" style={{borderRadius:'var(--radius-sm)'}}>{item}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[var(--color-navy)]">
        <div className="container-wide text-center max-w-2xl">
          <h2 className="text-section-heading text-white mb-3">Need Specification Assistance?</h2>
          <p className="text-white/40 mb-8">Our technical team will prepare a detailed coating specification for your project — including system selection, DFT, surface preparation, and compliance documentation.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="bg-[var(--color-red)] text-white font-semibold px-6 py-3 hover:opacity-90 transition" style={{borderRadius:'var(--radius-md)'}}>Request Specification Assistance</Link>
            <Link href="/find-equivalent" className="border border-white/20 text-white font-semibold px-6 py-3 hover:bg-white/10 transition" style={{borderRadius:'var(--radius-md)'}}>Find Product Equivalent</Link>
          </div>
        </div>
      </section>
    </>
  );
}
