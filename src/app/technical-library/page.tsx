import { Metadata } from 'next';
import { FileText, Download, Search, Shield, BookOpen, Palette } from 'lucide-react';

export const metadata: Metadata = { title: 'Technical Library', description: 'Download TDS, MSDS, product brochures, application guides, and system specifications from Anupam Paints.' };

const docCategories = [
  { icon: FileText, title: 'Technical Data Sheets (TDS)', desc: 'Product specifications, coverage, DFT, application methods, and standards compliance.', count: '500+', gated: true },
  { icon: Shield, title: 'Material Safety Data Sheets (MSDS)', desc: 'Safety handling, storage, and regulatory compliance information.', count: '500+', gated: false },
  { icon: BookOpen, title: 'Product Brochures', desc: 'Division-wise and brand-wise product catalogues with features and benefits.', count: '25+', gated: false },
  { icon: Palette, title: 'Shade Cards', desc: 'Digital shade cards for all decorative product lines.', count: '10+', gated: false },
  { icon: FileText, title: 'System Specifications', desc: 'Layer-by-layer coating system specs for common applications.', count: '15+', gated: true },
  { icon: FileText, title: 'Application Guides', desc: 'Surface preparation and application methodology documents.', count: '20+', gated: false },
];

export default function TechnicalLibraryPage() {
  return (
    <>
      <section className="gradient-brand text-white py-16 md:py-24">
        <div className="container-wide px-4">
          <p className="text-brand-200 text-sm font-medium mb-2 tracking-wider uppercase">Resources</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Technical Library</h1>
          <p className="text-lg text-brand-200 max-w-2xl">Download TDS, MSDS, brochures, shade cards, and system specifications.</p>
        </div>
      </section>
      <section className="bg-white py-8 border-b border-gray-100">
        <div className="container-wide px-4 max-w-2xl mx-auto">
          <div className="flex gap-3">
            <input type="text" placeholder="Search by product name, code, or keyword..." className="input-field flex-1" />
            <button className="btn-primary"><Search size={18} /></button>
          </div>
        </div>
      </section>
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {docCategories.map((cat, i) => (
              <div key={i} className="card p-6 hover:border-brand-200 transition">
                <cat.icon className="text-brand-500 mb-3" size={28} />
                <h3 className="text-lg font-bold text-gray-800 mb-1">{cat.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{cat.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="badge-blue text-xs">{cat.count} documents</span>
                  {cat.gated && <span className="text-xs text-orange-500 font-medium">Requires registration</span>}
                </div>
                <button className="btn-outline w-full mt-4 text-sm !py-2">
                  <Download size={14} className="mr-1" /> Browse & Download
                </button>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center bg-brand-50 rounded-2xl p-8">
            <p className="text-gray-600 mb-4">
              TDS downloads require a brief registration (name, company, phone). This helps our technical team follow up if you need support.
            </p>
            <p className="text-sm text-gray-500">All documents will be available once the product database is populated in the admin panel.</p>
          </div>
        </div>
      </section>
    </>
  );
}
