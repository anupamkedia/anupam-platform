'use client';
import { CHAIRMAN_MESSAGE, REAL_TIMELINE, CORE_VALUES, TEAM, VISION, MISSION, SITE } from '@/lib/constants';
import { Target, Eye, Award, Users } from 'lucide-react';

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative text-white overflow-hidden">
        <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-brand-500/85" />
        <div className="container-wide px-4 py-20 md:py-28 relative z-10">
          <p className="text-brand-200 text-sm font-medium mb-2 tracking-wider uppercase">About Us</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">The Odyssey of Anupam Paints</h1>
          <p className="text-xl text-brand-200 max-w-2xl">Charting the Spectrum of Success Since 1972</p>
        </div>
      </section>

      {/* Chairman's Message */}
      <section className="section-padding bg-gray-50">
        <div className="container-wide max-w-4xl">
          <h2 className="text-3xl font-bold text-brand-500 mb-8">Chairman&apos;s Message</h2>
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="md:flex gap-8">
              <div className="md:w-48 shrink-0 mb-6 md:mb-0">
                <div className="w-40 h-48 bg-gradient-to-br from-brand-100 to-brand-200 rounded-xl mx-auto flex items-center justify-center">
                  <Users size={48} className="text-brand-400" />
                </div>
                <div className="text-center mt-3">
                  <div className="font-bold text-gray-800">{CHAIRMAN_MESSAGE.name}</div>
                  <div className="text-sm text-brand-500">{CHAIRMAN_MESSAGE.title}</div>
                </div>
              </div>
              <div>
                <p className="text-lg font-medium text-gray-800 mb-4">{CHAIRMAN_MESSAGE.greeting}</p>
                {CHAIRMAN_MESSAGE.message.split('\n\n').map((para, i) => (
                  <p key={i} className="text-gray-600 leading-relaxed mb-4">{para}</p>
                ))}
                <p className="text-gray-500 italic mt-6">{CHAIRMAN_MESSAGE.signoff}</p>
                <p className="font-bold text-brand-500 text-lg">{CHAIRMAN_MESSAGE.name}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-gradient-to-br from-brand-50 to-blue-50 rounded-2xl p-8">
              <div className="w-12 h-12 rounded-xl bg-brand-500 text-white flex items-center justify-center mb-4"><Target size={24} /></div>
              <h3 className="text-2xl font-bold text-brand-500 mb-4">Our Mission</h3>
              <p className="text-gray-700 leading-relaxed">{MISSION}</p>
            </div>
            <div className="bg-gradient-to-br from-brand-50 to-blue-50 rounded-2xl p-8">
              <div className="w-12 h-12 rounded-xl bg-brand-500 text-white flex items-center justify-center mb-4"><Eye size={24} /></div>
              <h3 className="text-2xl font-bold text-brand-500 mb-4">Our Vision</h3>
              <p className="text-gray-700 leading-relaxed">{VISION}</p>
            </div>
          </div>

          {/* Core Values */}
          <h2 className="section-title text-center mb-8">Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {CORE_VALUES.map((val, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-xl p-5 hover:shadow-lg hover:border-brand-200 transition text-center">
                <Award className="mx-auto text-brand-500 mb-3" size={28} />
                <h3 className="font-bold text-gray-800 mb-2">{val.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-gradient-to-b from-brand-500 to-brand-700 text-white">
        <div className="container-wide">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Journey</h2>
          <div className="max-w-3xl mx-auto space-y-8">
            {REAL_TIMELINE.map((item, i) => (
              <div key={i} className="flex gap-6">
                <div className="shrink-0 w-20 text-right">
                  <span className="text-yellow-300 font-bold text-lg">{item.year}</span>
                </div>
                <div className="relative pl-6 border-l-2 border-yellow-300/30 pb-4">
                  <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-yellow-300 border-2 border-brand-500" />
                  <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                  <p className="text-brand-200 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <h2 className="section-title text-center mb-10">Our Leadership Team</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {TEAM.map((member, i) => (
              <div key={i} className="text-center group">
                <div className="w-28 h-28 mx-auto rounded-full bg-gradient-to-br from-brand-100 to-blue-100 flex items-center justify-center mb-3 group-hover:shadow-lg transition overflow-hidden">
                  <Users size={36} className="text-brand-400" />
                </div>
                <h3 className="font-bold text-gray-800 text-sm">{member.name}</h3>
                <p className="text-xs text-brand-500">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Carbon Nano-Struct */}
      <section className="section-padding gradient-light">
        <div className="container-wide text-center max-w-3xl">
          <div className="bg-brand-500 text-white rounded-2xl p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Carbon Nano-Struct Technology</h2>
            <p className="text-brand-200 text-lg leading-relaxed">Our paints are enhanced with Carbon Nano-Struct Technology — for coatings that Outperform and Outlast. This proprietary technology delivers superior adhesion, chemical resistance, and durability across all product ranges.</p>
          </div>
        </div>
      </section>
    </>
  );
}
