'use client';
import { useState } from 'react';
import { Calculator, ArrowRight } from 'lucide-react';

export default function CalculatorPage() {
  const [calcType, setCalcType] = useState<'wall' | 'industrial' | 'roof'>('wall');
  const [inputs, setInputs] = useState({ length: '', width: '', height: '', doors: '1', windows: '2', area: '', dft: '', solids: '', coats: '2' });
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    if (calcType === 'wall') {
      const l = parseFloat(inputs.length) || 0;
      const w = parseFloat(inputs.width) || 0;
      const h = parseFloat(inputs.height) || 0;
      const doors = parseInt(inputs.doors) || 0;
      const windows = parseInt(inputs.windows) || 0;
      const wallArea = 2 * (l + w) * h;
      const deductions = doors * 2.1 + windows * 1.2;
      const paintableArea = wallArea - deductions;
      const coats = parseInt(inputs.coats) || 2;
      const coveragePerLitre = 12; // sq.m per litre per coat
      const litresNeeded = (paintableArea * coats) / coveragePerLitre;
      const primerLitres = paintableArea / 10;
      setResult({ paintableArea: paintableArea.toFixed(1), litresNeeded: Math.ceil(litresNeeded), primerLitres: Math.ceil(primerLitres), coats });
    } else if (calcType === 'industrial') {
      const area = parseFloat(inputs.area) || 0;
      const dft = parseFloat(inputs.dft) || 0;
      const solids = parseFloat(inputs.solids) || 50;
      const lossFactor = 1.3;
      const litres = (area * dft * lossFactor) / (solids * 10);
      setResult({ area, dft, litresNeeded: Math.ceil(litres), lossFactor: '30%' });
    } else {
      const area = parseFloat(inputs.area) || 0;
      const coats = parseInt(inputs.coats) || 2;
      const coverage = 3; // sq.m/litre/coat for roof coatings
      const litres = (area * coats) / coverage;
      setResult({ area, litresNeeded: Math.ceil(litres), coats });
    }
  };

  return (
    <>
      <section className="gradient-brand text-white py-16 md:py-24">
        <div className="container-wide px-4">
          <p className="text-brand-200 text-sm font-medium mb-2 tracking-wider uppercase">Tools</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Paint Calculator</h1>
          <p className="text-lg text-brand-200 max-w-2xl">Calculate the quantity of paint needed for your project.</p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-wide max-w-3xl">
          {/* Calculator type selector */}
          <div className="flex gap-2 mb-8">
            {([['wall', 'Wall Paint'], ['industrial', 'Industrial Coating'], ['roof', 'Roof Coating']] as const).map(([key, label]) => (
              <button key={key} onClick={() => { setCalcType(key); setResult(null); }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${calcType === key ? 'bg-brand-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                {label}
              </button>
            ))}
          </div>

          <div className="card p-8">
            {calcType === 'wall' && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-brand-500 mb-4">Wall Paint Quantity Calculator</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Room Length (m)</label>
                    <input type="number" className="input-field" value={inputs.length} onChange={e => setInputs({...inputs, length: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Room Width (m)</label>
                    <input type="number" className="input-field" value={inputs.width} onChange={e => setInputs({...inputs, width: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Height (m)</label>
                    <input type="number" className="input-field" value={inputs.height} onChange={e => setInputs({...inputs, height: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">No. of Doors</label>
                    <input type="number" className="input-field" value={inputs.doors} onChange={e => setInputs({...inputs, doors: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">No. of Windows</label>
                    <input type="number" className="input-field" value={inputs.windows} onChange={e => setInputs({...inputs, windows: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">No. of Coats</label>
                    <input type="number" className="input-field" value={inputs.coats} onChange={e => setInputs({...inputs, coats: e.target.value})} />
                  </div>
                </div>
              </div>
            )}
            {calcType === 'industrial' && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-brand-500 mb-4">Industrial Coating Consumption Calculator</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Surface Area (sq.m)</label>
                    <input type="number" className="input-field" value={inputs.area} onChange={e => setInputs({...inputs, area: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Target DFT (microns)</label>
                    <input type="number" className="input-field" value={inputs.dft} onChange={e => setInputs({...inputs, dft: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Volume Solids (%)</label>
                    <input type="number" className="input-field" value={inputs.solids} onChange={e => setInputs({...inputs, solids: e.target.value})} placeholder="e.g. 50" />
                  </div>
                </div>
              </div>
            )}
            {calcType === 'roof' && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-brand-500 mb-4">Roof Coating Consumption Calculator</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Roof Area (sq.m)</label>
                    <input type="number" className="input-field" value={inputs.area} onChange={e => setInputs({...inputs, area: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">No. of Coats</label>
                    <input type="number" className="input-field" value={inputs.coats} onChange={e => setInputs({...inputs, coats: e.target.value})} />
                  </div>
                </div>
              </div>
            )}

            <button onClick={calculate} className="btn-primary mt-6">
              <Calculator size={18} className="mr-2" /> Calculate
            </button>

            {result && (
              <div className="mt-6 p-6 bg-brand-50 rounded-xl border border-brand-100">
                <h3 className="font-bold text-brand-500 mb-3">Result</h3>
                {result.paintableArea && <p className="text-gray-700">Paintable Area: <strong>{result.paintableArea} sq.m</strong></p>}
                {result.area && <p className="text-gray-700">Surface Area: <strong>{result.area} sq.m</strong></p>}
                {result.dft && <p className="text-gray-700">Target DFT: <strong>{result.dft} microns</strong></p>}
                <p className="text-gray-700">Coats: <strong>{result.coats}</strong></p>
                <p className="text-xl font-bold text-brand-500 mt-3">Paint Required: ~{result.litresNeeded} Litres</p>
                {result.primerLitres && <p className="text-gray-700">Primer Required: ~{result.primerLitres} Litres</p>}
                {result.lossFactor && <p className="text-sm text-gray-500 mt-2">* Includes {result.lossFactor} loss factor for spray application</p>}
                <p className="text-xs text-gray-400 mt-3">Note: This is an approximate calculation. Actual consumption may vary based on surface condition, application method, and product used. Contact our technical team for accurate specifications.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
