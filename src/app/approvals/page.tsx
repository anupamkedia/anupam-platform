'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Shield, Download } from 'lucide-react';
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

const categoryColors: Record<string, string> = {
  'ISO': 'bg-blue-50 text-blue-700 border-blue-200', 'Railway': 'bg-red-50 text-red-700 border-red-200',
  'Defence': 'bg-green-50 text-green-700 border-green-200', 'Infrastructure': 'bg-purple-50 text-purple-700 border-purple-200',
  'Energy': 'bg-amber-50 text-amber-700 border-amber-200', 'Green Building': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Potable Water': 'bg-cyan-50 text-cyan-700 border-cyan-200', 'Registration': 'bg-gray-50 text-gray-700 border-gray-200',
};

export default function ApprovalsPage() {
  const [approvals, setApprovals] = useState<any[]>([]);
  useEffect(() => { supabase.from('approvals').select('*').order('sort_order').then(r => setApprovals(r.data || [])); }, []);
  const categories = Array.from(new Set(approvals.map(a => a.category)));
  return (
    <>
      <section className="gradient-brand text-white py-16 md:py-24">
        <div className="container-wide px-4">
          <p className="text-brand-200 text-sm font-medium mb-2 tracking-wider uppercase">Approvals</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Approvals & Certifications</h1>
          <p className="text-lg text-brand-200 max-w-2xl">Trusted and approved by India&apos;s most demanding institutions — Railways, Defence, Energy, and Infrastructure.</p>
        </div>
      </section>
      <section className="section-padding bg-white">
        <div className="container-wide">
          {categories.map((cat) => (
            <div key={cat} className="mb-12 last:mb-0">
              <h2 className="text-2xl font-bold text-brand-500 mb-6 flex items-center gap-2"><Shield size={24} /> {cat}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {approvals.filter(a => a.category === cat).map((approval) => (
                  <div key={approval.id} className={`rounded-xl border p-5 ${categoryColors[cat] || 'bg-gray-50 text-gray-700 border-gray-200'}`}>
                    <h3 className="font-bold text-lg">{approval.name}</h3>
                    <p className="text-sm opacity-80 mt-1">{approval.description}</p>
                    {approval.reference_number && <p className="text-xs opacity-60 mt-2">Ref: {approval.reference_number}</p>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}