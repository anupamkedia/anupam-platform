'use client';
import { useState } from 'react';
import { Palette, Search, Copy, Check } from 'lucide-react';

const shadeGroups = [
  { name: 'Whites & Off-Whites', shades: [
    { name: 'Arctic White', code: 'AW-001', hex: '#FFFFFF' }, { name: 'Pearl White', code: 'AW-002', hex: '#F5F0E8' },
    { name: 'Ivory Cream', code: 'AW-003', hex: '#FFFFF0' }, { name: 'Moon Glow', code: 'AW-004', hex: '#F8F4E3' },
    { name: 'Swiss Coffee', code: 'AW-005', hex: '#F2E8D5' }, { name: 'Linen White', code: 'AW-006', hex: '#FAF0E6' },
  ]},
  { name: 'Yellows & Golds', shades: [
    { name: 'Sunflower', code: 'YG-001', hex: '#FFD700' }, { name: 'Butter Cream', code: 'YG-002', hex: '#FFFDD0' },
    { name: 'Golden Sand', code: 'YG-003', hex: '#ECD540' }, { name: 'Marigold', code: 'YG-004', hex: '#EAA221' },
    { name: 'Honey Dew', code: 'YG-005', hex: '#F0E68C' }, { name: 'Tuscan Sun', code: 'YG-006', hex: '#FFD97D' },
  ]},
  { name: 'Reds & Pinks', shades: [
    { name: 'Royal Red', code: 'RP-001', hex: '#C0392B' }, { name: 'Terracotta', code: 'RP-002', hex: '#E2725B' },
    { name: 'Rose Blush', code: 'RP-003', hex: '#F4C2C2' }, { name: 'Coral Reef', code: 'RP-004', hex: '#FF7F50' },
    { name: 'Burgundy', code: 'RP-005', hex: '#800020' }, { name: 'Peach', code: 'RP-006', hex: '#FFCBA4' },
  ]},
  { name: 'Blues', shades: [
    { name: 'Royal Blue', code: 'BL-001', hex: '#1B3A5C' }, { name: 'Sky Blue', code: 'BL-002', hex: '#87CEEB' },
    { name: 'Navy', code: 'BL-003', hex: '#000080' }, { name: 'Cerulean', code: 'BL-004', hex: '#007BA7' },
    { name: 'Powder Blue', code: 'BL-005', hex: '#B0E0E6' }, { name: 'Teal', code: 'BL-006', hex: '#008080' },
  ]},
  { name: 'Greens', shades: [
    { name: 'Forest Green', code: 'GN-001', hex: '#228B22' }, { name: 'Sage', code: 'GN-002', hex: '#BCB88A' },
    { name: 'Mint', code: 'GN-003', hex: '#98FB98' }, { name: 'Olive', code: 'GN-004', hex: '#808000' },
    { name: 'Emerald', code: 'GN-005', hex: '#50C878' }, { name: 'Sea Green', code: 'GN-006', hex: '#2E8B57' },
  ]},
  { name: 'Greys & Neutrals', shades: [
    { name: 'Platinum Grey', code: 'GR-001', hex: '#E5E4E2' }, { name: 'Charcoal', code: 'GR-002', hex: '#36454F' },
    { name: 'Dove Grey', code: 'GR-003', hex: '#B0AFA8' }, { name: 'Silver Mist', code: 'GR-004', hex: '#C0C0C0' },
    { name: 'Slate', code: 'GR-005', hex: '#708090' }, { name: 'Pebble', code: 'GR-006', hex: '#D3CBC1' },
  ]},
];

export default function ShadeCardPage() {
  const [search, setSearch] = useState('');
  const [copied, setCopied] = useState('');
  const allShades = shadeGroups.flatMap(g => g.shades.map(s => ({ ...s, group: g.name })));
  const filtered = search ? allShades.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.code.toLowerCase().includes(search.toLowerCase())) : null;

  const copyCode = (code: string) => { navigator.clipboard.writeText(code); setCopied(code); setTimeout(() => setCopied(''), 2000); };

  return (
    <>
      <section className="gradient-brand text-white py-16 md:py-20">
        <div className="container-wide px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Shade Card</h1>
          <p className="text-brand-200">Explore our decorative shade collection. Click any shade to copy its code.</p>
        </div>
      </section>
      <section className="bg-white py-6 border-b border-gray-100 sticky top-16 md:top-20 z-30 backdrop-blur-sm bg-white/95">
        <div className="container-wide px-4 max-w-xl mx-auto">
          <div className="relative"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input className="input-field !pl-9" placeholder="Search shade name or code..." value={search} onChange={e => setSearch(e.target.value)} /></div>
        </div>
      </section>
      <section className="section-padding bg-white">
        <div className="container-wide">
          {filtered ? (
            <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-3">
              {filtered.map(s => (
                <button key={s.code} onClick={() => copyCode(s.code)} className="group">
                  <div className="aspect-square rounded-xl shadow-sm border border-gray-100 mb-1 group-hover:scale-105 transition" style={{ backgroundColor: s.hex }} />
                  <div className="text-xs font-medium text-gray-800 truncate">{s.name}</div>
                  <div className="text-xs text-gray-400 flex items-center gap-1">{s.code} {copied === s.code && <Check size={10} className="text-green-500" />}</div>
                </button>
              ))}
            </div>
          ) : shadeGroups.map(group => (
            <div key={group.name} className="mb-10 last:mb-0">
              <h2 className="text-xl font-bold text-brand-500 mb-4 flex items-center gap-2"><Palette size={20} /> {group.name}</h2>
              <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-3">
                {group.shades.map(s => (
                  <button key={s.code} onClick={() => copyCode(s.code)} className="group text-left">
                    <div className="aspect-square rounded-xl shadow-sm border border-gray-100 mb-1 group-hover:scale-105 transition" style={{ backgroundColor: s.hex }} />
                    <div className="text-xs font-medium text-gray-800 truncate">{s.name}</div>
                    <div className="text-xs text-gray-400 flex items-center gap-1">{s.code} {copied === s.code && <Check size={10} className="text-green-500" />}</div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
