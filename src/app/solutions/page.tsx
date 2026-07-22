'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import { ArrowRight } from 'lucide-react';
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

const defaultSolutions = [
  { slug: 'structural-steel', title: 'Structural Steel Coating Systems', industry: 'Infrastructure', icon: '🏗️', problem_statement: 'Anti-corrosion systems for steel structures — bridges, flyovers, buildings, industrial sheds.' },
  { slug: 'railway-systems', title: 'Railway Coach Coating Systems', industry: 'Railways', icon: '🚂', problem_statement: 'RDSO/ICF approved systems. FEVE coatings, EN 45545 HL3 compliant.' },
  { slug: 'marine-systems', title: 'Marine Coating Systems', industry: 'Marine', icon: '🚢', problem_statement: 'Anti-fouling, underwater, deck, and fire-retardant coatings. Indian Navy approved.' },
  { slug: 'industrial-flooring', title: 'Industrial Flooring Systems', industry: 'Industrial', icon: '🏭', problem_statement: 'Epoxy, PU, and polyaspartic flooring for warehouses, factories, and cleanrooms.' },
  { slug: 'roof-waterproofing', title: 'Roof Waterproofing & Cool Roof', industry: 'Construction', icon: '🏠', problem_statement: 'Elastomeric waterproofing and heat-reflective cool roof coatings.' },
  { slug: 'fire-protection', title: 'Fire Protection Systems', industry: 'Safety', icon: '🔥', problem_statement: 'Intumescent fire-retardant coatings for structural steel (up to 120-min rating).' },
  { slug: 'oil-gas', title: 'Oil & Gas Coating Systems', industry: 'Oil & Gas', icon: '⛽', problem_statement: 'Pipeline coatings, tank linings, offshore protection, chemical-resistant systems.' },
  { slug: 'potable-water', title: 'Potable Water Tank Systems', industry: 'Water', icon: '💧', problem_statement: 'WRAS-approved food-grade coatings for potable water storage tanks.' },
];

export default function SolutionsPage() {
  const [solutions, setSolutions] = useState<any[]>([]);
  useEffect(() => { supabase.from('solutions').select('*').order('sort_order').then(r => setSolutions(r.data && r.data.length > 0 ? r.data : defaultSolutions)); }, []);
  const display = solutions.length > 0 ? solutions : defaultSolutions;
  return (
    <>
      <section className="gradient-brand text-white py-16 md:py-24">
        <div className="container-wide px-4">
          <p className="text-brand-200 text-sm font-medium mb-2 tracking-wider uppercase">Solutions</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Coating Solutions by Industry</h1>
          <p className="text-lg text-brand-200 max-w-2xl">Pre-engineered coating systems with layer-by-layer specifications.</p>
        </div>
      </section>
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {display.map((sol: any) => (
              <Link key={sol.slug} href={`/solutions/${sol.slug}`} className="card card-hover group p-6">
                <div className="text-4xl mb-3">{sol.icon || '🔧'}</div>
                <span className="badge-blue text-xs mb-2 inline-block">{sol.industry}</span>
                <h3 className="text-lg font-bold text-gray-800 group-hover:text-brand-500 transition mb-2">{sol.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">{sol.problem_statement}</p>
                <span className="text-brand-500 text-sm font-medium flex items-center gap-1">View System <ArrowRight size={14} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}