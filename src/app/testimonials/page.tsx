'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Star, Quote, MessageSquare } from 'lucide-react';
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  useEffect(() => { supabase.from('testimonials').select('*').order('sort_order').then(r => setTestimonials(r.data || [])); }, []);
  return (
    <>
      <section className="gradient-brand text-white py-16 md:py-24">
        <div className="container-wide px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">What Our Clients Say</h1>
          <p className="text-lg text-brand-200 max-w-2xl">Feedback from industrial clients, government institutions, dealers, and contractors.</p>
        </div>
      </section>
      <section className="section-padding bg-white">
        <div className="container-wide">
          {testimonials.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((t: any) => (
                <div key={t.id} className="card p-6">
                  <Quote className="text-brand-200 mb-3" size={24} />
                  <p className="text-gray-700 leading-relaxed mb-4">{t.feedback}</p>
                  <div className="flex items-center gap-1 mb-3">{Array.from({length:5}).map((_,i) => (<Star key={i} size={14} className={i < t.rating ? 'text-yellow-400 fill-current' : 'text-gray-200'} />))}</div>
                  <div className="border-t pt-3"><div className="font-semibold text-gray-800">{t.name}</div><div className="text-sm text-gray-500">{t.designation}{t.company ? `, ${t.company}` : ''}</div></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16"><MessageSquare className="mx-auto text-brand-300 mb-4" size={48} /><h3 className="text-xl font-bold text-gray-800 mb-2">Testimonials Coming Soon</h3></div>
          )}
        </div>
      </section>
    </>
  );
}