import { notFound } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Layers, ArrowRight, Download, Phone, ChevronRight } from 'lucide-react';

type Props = { params: { slug: string } };

const defaultSolutions: Record<string, any> = {
  'structural-steel': { title: 'Structural Steel Coating Systems', industry: 'Infrastructure', icon: '🏗️',
    problem: 'Steel structures in industrial, commercial, and infrastructure projects face severe corrosion from atmospheric exposure, chemical fumes, marine spray, and thermal cycling. A properly specified multi-coat protection system is essential to achieve the design life.',
    layers: [
      { type: 'Surface Prep', product: 'Sa 2½ abrasive blasting per ISO 8501-1', dft: '—', coats: '—', notes: 'Remove mill scale, rust, and contaminants. Surface profile 40-75 microns.' },
      { type: 'Primer', product: 'Anupam Epoxy Zinc-Rich Primer', dft: '75 microns', coats: '1', notes: 'Cathodic protection. Min 85% zinc in dry film.' },
      { type: 'Intermediate', product: 'Anupam Epoxy MIO Intermediate', dft: '125 microns', coats: '1', notes: 'Micaceous iron oxide for barrier protection and intercoat adhesion.' },
      { type: 'Topcoat', product: 'Anupam Aliphatic PU Topcoat', dft: '50 microns', coats: '1', notes: 'UV-resistant, gloss retention, colour stability. Any RAL/BS shade.' },
    ],
    totalDft: '250 microns', method: 'Airless spray (preferred), brush/roller for touch-up', performance: '15-20 year service life in C3-C4 environment (ISO 12944)', standards: 'ISO 12944, IS 15489, ASTM D3359, ASTM B117' },
  'railway-systems': { title: 'Railway Coach Coating Systems', industry: 'Railways', icon: '🚂',
    problem: 'Railway coaches require coating systems that comply with RDSO/ICF specifications, meet EN 45545 HL3 fire and smoke standards, and withstand extreme weather, UV exposure, and mechanical abrasion during service.',
    layers: [
      { type: 'Surface Prep', product: 'Sa 2½ blast cleaning / power tool cleaning ST3', dft: '—', coats: '—', notes: 'Per ICF specification. Remove all mill scale and rust.' },
      { type: 'Primer', product: 'Anupam Epoxy Zinc Phosphate Primer (RDSO Approved)', dft: '40 microns', coats: '1', notes: 'Anti-corrosive primer complying with ICF specification.' },
      { type: 'Intermediate', product: 'Anupam Epoxy High-Build Coat', dft: '100 microns', coats: '1', notes: 'High-build epoxy for barrier protection.' },
      { type: 'Topcoat', product: 'Anupam FEVE Fluoropolymer Topcoat', dft: '40 microns', coats: '1', notes: 'EN 45545 HL3 compliant. Superior gloss and colour retention.' },
    ],
    totalDft: '180 microns', method: 'Airless spray', performance: '10-12 year service life between repaints', standards: 'RDSO Spec, ICF Spec, EN 45545-2 HL3, IS 15489' },
  'marine-systems': { title: 'Marine Coating Systems', industry: 'Marine', icon: '🚢',
    problem: 'Naval and commercial vessels face the most aggressive corrosion environments — seawater immersion, cathodic disbondment, fouling, and mechanical damage. Indian Navy approved systems are mandatory.',
    layers: [
      { type: 'Surface Prep', product: 'Sa 2½ blast cleaning', dft: '—', coats: '—', notes: 'Minimum surface profile 50-75 microns.' },
      { type: 'Primer', product: 'Anupam Inorganic Zinc Silicate Primer', dft: '75 microns', coats: '1', notes: 'Self-curing zinc silicate. Indian Navy approved.' },
      { type: 'Tie Coat', product: 'Anupam Epoxy Mist Coat', dft: '25 microns', coats: '1', notes: 'Compatibility coat between zinc silicate and epoxy.' },
      { type: 'Anti-Corrosion', product: 'Anupam High-Build Epoxy', dft: '150 microns', coats: '2', notes: 'Barrier coat for underwater and splash zone.' },
      { type: 'Anti-Fouling', product: 'Anupam 2K Silicone-Epoxy Anti-Fouling', dft: '125 microns', coats: '2', notes: 'Biocide-free silicone hybrid. Reduces fuel consumption.' },
    ],
    totalDft: '375 microns', method: 'Airless spray, brush for small areas', performance: '5-year dry-docking interval', standards: 'Indian Navy DQAN, IMO PSPC, ASTM B117' },
};

export default async function SolutionDetailPage({ params }: Props) {
  const { data: dbSolution } = await supabase.from('solutions').select('*, solution_layers(*, products(name))').eq('slug', params.slug).single();
  const fallback = defaultSolutions[params.slug];

  if (!dbSolution && !fallback) notFound();

  const solution = dbSolution || fallback;
  const layers = dbSolution?.solution_layers || fallback?.layers || [];

  return (
    <>
      <section className="gradient-brand text-white py-16 md:py-24">
        <div className="container-wide px-4">
          <div className="flex items-center gap-2 text-brand-200 text-sm mb-4">
            <Link href="/solutions" className="hover:text-white transition">Solutions</Link>
            <ChevronRight size={14} />
            <span>{solution.industry}</span>
          </div>
          <div className="text-4xl mb-4">{solution.icon || '🔧'}</div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{solution.title}</h1>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-wide max-w-4xl">
          {/* Problem statement */}
          <div className="mb-10">
            <h2 className="text-xl font-bold text-brand-500 mb-3">Application Challenge</h2>
            <p className="text-gray-700 leading-relaxed">{solution.problem || solution.problem_statement}</p>
          </div>

          {/* Coating system table */}
          <div className="mb-10">
            <h2 className="text-xl font-bold text-brand-500 mb-4 flex items-center gap-2"><Layers size={20} /> Recommended Coating System</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-brand-500 text-white text-left">
                    <th className="px-4 py-3 font-medium">Layer</th>
                    <th className="px-4 py-3 font-medium">Product</th>
                    <th className="px-4 py-3 font-medium">DFT</th>
                    <th className="px-4 py-3 font-medium">Coats</th>
                    <th className="px-4 py-3 font-medium hidden md:table-cell">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {layers.map((layer: any, i: number) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 font-medium text-gray-800">{layer.type || layer.layer_type}</td>
                      <td className="px-4 py-3 text-brand-500 font-medium">{layer.product || layer.product_name || layer.products?.name}</td>
                      <td className="px-4 py-3 text-gray-700">{layer.dft}</td>
                      <td className="px-4 py-3 text-gray-700">{layer.coats}</td>
                      <td className="px-4 py-3 text-gray-500 text-xs hidden md:table-cell">{layer.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* System details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="card p-5">
              <h3 className="font-bold text-gray-800 mb-3">System Specifications</h3>
              <div className="space-y-2 text-sm">
                <div><span className="text-gray-500">Total System DFT:</span> <strong>{solution.totalDft || solution.total_dft}</strong></div>
                <div><span className="text-gray-500">Application Method:</span> <strong>{solution.method || solution.application_method}</strong></div>
                <div><span className="text-gray-500">Expected Performance:</span> <strong>{solution.performance || solution.expected_performance}</strong></div>
              </div>
            </div>
            <div className="card p-5">
              <h3 className="font-bold text-gray-800 mb-3">Applicable Standards</h3>
              <p className="text-sm text-gray-700">{solution.standards}</p>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <Link href="/contact" className="btn-primary"><Phone size={16} className="mr-2" /> Request Technical Consultation</Link>
            <Link href="/contact" className="btn-outline"><Download size={16} className="mr-2" /> Download System Specification PDF</Link>
          </div>
        </div>
      </section>
    </>
  );
}
