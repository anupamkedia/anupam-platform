'use client';
import { useState } from 'react';
import { Search, ArrowRight, ArrowLeft, CheckCircle, Package } from 'lucide-react';
import Link from 'next/link';

const steps = [
  { key: 'surface', label: 'Surface Type', options: ['Mild Steel', 'Galvanised Steel', 'Aluminium', 'Concrete / Masonry', 'Wood', 'Roof', 'Floor', 'Tank Interior', 'Pipeline', 'Marine Hull', 'Railway Coach'] },
  { key: 'environment', label: 'Environment', options: ['Interior', 'Exterior', 'Coastal / Marine', 'Chemical / Industrial', 'Underwater / Immersion', 'High Temperature', 'Underground / Buried'] },
  { key: 'performance', label: 'Performance Need', options: ['Anti-Corrosion', 'Waterproofing', 'Fire Protection', 'Heat Reflection', 'Decorative Finish', 'Potable Water Safe', 'Anti-Skid', 'Chemical Resistance', 'Abrasion Resistance', 'UV Resistance'] },
  { key: 'industry', label: 'Industry', options: ['Residential', 'Commercial', 'Infrastructure', 'Railways', 'Marine / Shipbuilding', 'Oil & Gas', 'Power / Energy', 'Steel / Cement', 'Automotive / OEM', 'Defence', 'Warehousing / Logistics', 'Food Processing'] },
];

const recommendations: Record<string, { system: string; products: string[]; dft: string }> = {
  'Mild Steel-Exterior-Anti-Corrosion-Infrastructure': { system: 'Structural Steel Protection System', products: ['Epoxy Zinc-Rich Primer (75µ)', 'Epoxy MIO Intermediate (125µ)', 'Aliphatic PU Topcoat (50µ)'], dft: '250 microns' },
  'Mild Steel-Coastal / Marine-Anti-Corrosion-Marine / Shipbuilding': { system: 'Marine Hull Coating System', products: ['Inorganic Zinc Silicate (75µ)', 'High-Build Epoxy x2 (150µ)', '2K Anti-Fouling x2 (125µ)'], dft: '375 microns' },
  'Concrete / Masonry-Exterior-Waterproofing-Residential': { system: 'Exterior Waterproofing System', products: ['Azura Damp Arrestor Primer', 'Elastomeric Waterproof Coating x2', 'Azura Weather Shield Topcoat'], dft: 'As per spec' },
  'Floor-Interior-Abrasion Resistance-Warehousing / Logistics': { system: 'Industrial Flooring System', products: ['Epoxy Floor Primer', 'Self-Levelling Epoxy Coating x2', 'PU Clear Topcoat'], dft: '500+ microns' },
};

export default function ProductFinderPage() {
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [result, setResult] = useState<any>(null);

  const select = (key: string, value: string) => {
    const updated = { ...selections, [key]: value };
    setSelections(updated);
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      const lookupKey = `${updated.surface}-${updated.environment}-${updated.performance}-${updated.industry}`;
      const match = recommendations[lookupKey] || {
        system: 'Custom Coating System',
        products: ['Suitable primer for ' + (updated.surface || 'your surface'), 'Intermediate coat for ' + (updated.environment || 'your environment'), 'Topcoat for ' + (updated.performance || 'your requirement')],
        dft: 'To be specified by our technical team',
      };
      setResult(match);
    }
  };

  const reset = () => { setStep(0); setSelections({}); setResult(null); };

  return (
    <>
      <section className="gradient-brand text-white py-16 md:py-20">
        <div className="container-wide px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Product Finder</h1>
          <p className="text-brand-200">Answer 4 questions and we will recommend the right coating system.</p>
        </div>
      </section>
      <section className="section-padding bg-white">
        <div className="container-wide max-w-2xl">
          {!result ? (
            <div>
              {/* Progress */}
              <div className="flex gap-2 mb-8">
                {steps.map((s, i) => (
                  <div key={s.key} className={`flex-1 h-2 rounded-full ${i <= step ? 'bg-brand-500' : 'bg-gray-200'} transition-all`} />
                ))}
              </div>
              <div className="text-sm text-gray-500 mb-2">Step {step + 1} of {steps.length}</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">{steps[step].label}</h2>
              <div className="grid grid-cols-2 gap-3">
                {steps[step].options.map(opt => (
                  <button key={opt} onClick={() => select(steps[step].key, opt)}
                    className={`p-4 rounded-xl border-2 text-left text-sm font-medium transition hover:border-brand-400 hover:bg-brand-50 ${selections[steps[step].key] === opt ? 'border-brand-500 bg-brand-50 text-brand-500' : 'border-gray-200 text-gray-700'}`}>
                    {opt}
                  </button>
                ))}
              </div>
              {step > 0 && <button onClick={() => setStep(step - 1)} className="mt-6 text-sm text-gray-500 flex items-center gap-1 hover:text-brand-500"><ArrowLeft size={14} /> Back</button>}
            </div>
          ) : (
            <div>
              <div className="text-center mb-8">
                <CheckCircle className="mx-auto text-green-500 mb-3" size={48} />
                <h2 className="text-2xl font-bold text-gray-800">Recommended System</h2>
              </div>
              <div className="card p-6 mb-6">
                <h3 className="text-xl font-bold text-brand-500 mb-4">{result.system}</h3>
                <div className="space-y-2 mb-4">
                  {result.products.map((p: string, i: number) => (
                    <div key={i} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <div className="w-6 h-6 rounded-full bg-brand-500 text-white flex items-center justify-center text-xs font-bold">{i + 1}</div>
                      <span className="text-sm font-medium text-gray-800">{p}</span>
                    </div>
                  ))}
                </div>
                <div className="text-sm text-gray-600">Total System DFT: <strong>{result.dft}</strong></div>
                <div className="bg-brand-50 rounded-lg p-3 mt-4 text-sm text-brand-600">
                  Your selections: {Object.values(selections).join(' → ')}
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/contact" className="btn-primary">Request Detailed Specification</Link>
                <button onClick={reset} className="btn-outline">Try Again</button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
