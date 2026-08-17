'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Search, Shield, Download } from 'lucide-react';
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

const orgs = ['All','Indian Railways','RDSO','ICF','CLW','DMW','Indian Navy','DQAN','MES','EIL','AAI','CMRL','HPCL','WRAS','BHEL','ISO','IGBC'];

export default function ApprovalFinderPage() {
  const [approvals, setApprovals] = useState<any[]>([]);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  useEffect(() => { supabase.from('approvals').select('*').order('sort_order').then(r => setApprovals(r.data || [])); }, []);
  const filtered = approvals.filter(a => (filter === 'All' || a.name?.includes(filter) || a.category?.includes(filter)) && (search === '' || a.name?.toLowerCase().includes(search.toLowerCase())));
  return (
    <>
      <section className="relative text-white overflow-hidden">
        <img src="/img/heroes/hero-approvals.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[var(--color-navy)]/75" />
        <div className="py-16 md:py-24 relative z-10">
        <div className="container-wide">
          <div className="w-12 h-[2px] bg-[var(--color-red)] mb-6" />
          <h1 className="text-page-title text-white mb-4">Approval Finder</h1>
          <p className="text-white/50 max-w-xl mb-8">Search Anupam products by approval body, industry, or specification.</p>
          <div className="relative max-w-md"><Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" /><input className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 text-white placeholder-white/40 outline-none" style={{borderRadius:'var(--radius-md)'}} placeholder="Search approvals..." value={search} onChange={e=>setSearch(e.target.value)} /></div>
        </div>
      </div></section>
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="flex gap-2 overflow-x-auto pb-4 mb-6">{orgs.map(o=><button key={o} onClick={()=>setFilter(o)} className={`whitespace-nowrap text-sm px-3 py-1.5 transition ${filter===o?'bg-[var(--color-navy)] text-white':'bg-gray-100 text-[var(--color-steel)]'}`} style={{borderRadius:'var(--radius-sm)'}}>{o}</button>)}</div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {filtered.map(a=>(
              <div key={a.id} className="card p-5"><div className="flex items-center gap-3"><Shield size={20} className="text-[var(--color-navy)] shrink-0" /><div><div className="font-semibold text-sm text-[var(--color-navy)]">{a.name}</div><div className="text-xs text-[var(--color-steel)]">{a.category}</div></div></div></div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
