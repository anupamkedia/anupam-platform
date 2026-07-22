'use client';
import { CHAIRMAN_MESSAGE, REAL_TIMELINE, CORE_VALUES, VISION, MISSION, TEAM, SITE } from '@/lib/constants';
import { Award, Users, Target, Heart, ChevronRight, Quote, Building2 } from 'lucide-react';

export default function AboutPage() {
  return (
    <>
      <section className="gradient-brand text-white py-16 md:py-24">
        <div className="container-wide px-4">
          <p className="text-brand-200 text-sm font-medium mb-2 tracking-wider uppercase">About Us</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Colouring Success Stories<br />Since 1972</h1>
          <p className="text-lg text-brand-200 max-w-2xl">From a humble garage in Kolkata to one of India&apos;s most trusted coating manufacturers — our 50-year journey of innovation, quality, and trust.</p>
        </div>
      </section>

      {/* Chairman's Message */}
      <section className="section-padding bg-white">
        <div className="container-wide max-w-4xl">
          <div className="bg-gradient-to-br from-brand-50 to-blue-50 rounded-2xl p-8 md:p-12">
            <Quote className="text-brand-300 mb-4" size={40} />
            <div className="text-gray-700 leading-relaxed space-y-4">
              {CHAIRMAN_MESSAGE.message.split('\n\n').map((para, i) => (
                <p key={i} className="text-base">{para}</p>
              ))}
            </div>
            <div className="mt-8 flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-brand-500 flex items-center justify-center text-white text-xl font-bold">MK</div>
              <div>
                <div className="font-bold text-gray-800 text-lg">{CHAIRMAN_MESSAGE.name}</div>
                <div className="text-brand-500 text-sm">{CHAIRMAN_MESSAGE.title}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section-padding gradient-light">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="card p-8">
              <div className="w-12 h-12 rounded-xl bg-brand-500 text-white flex items-center justify-center mb-4"><Target size={24} /></div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">{VISION}</p>
            </div>
            <div className="card p-8">
              <div className="w-12 h-12 rounded-xl bg-accent-400 text-white flex items-center justify-center mb-4"><Award size={24} /></div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">{MISSION}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-white">
        <div className="container-wide max-w-3xl">
          <h2 className="section-title text-center mb-12">Our Journey</h2>
          <div className="relative">
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-brand-200 transform md:-translate-x-px" />
            {REAL_TIMELINE.map((event, i) => (
              <div key={i} className={`relative flex items-start gap-6 mb-10 last:mb-0 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="absolute left-6 md:left-1/2 w-4 h-4 bg-brand-500 rounded-full border-4 border-white shadow transform -translate-x-2 md:-translate-x-2 mt-1" />
                <div className={`ml-14 md:ml-0 md:w-5/12 ${i % 2 === 0 ? 'md:text-right md:pr-12' : 'md:pl-12'}`}>
                  <div className="bg-brand-500 text-white text-sm font-bold px-3 py-1 rounded-full inline-block mb-2">{event.year}</div>
                  <h3 className="font-bold text-gray-800 text-lg mb-1">{event.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{event.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding gradient-light">
        <div className="container-wide">
          <h2 className="section-title text-center mb-10">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
            {CORE_VALUES.map((value, i) => (
              <div key={i} className="card p-5 text-center hover:border-brand-300 transition">
                <div className="w-10 h-10 rounded-full bg-brand-50 text-brand-500 flex items-center justify-center mx-auto mb-3"><Heart size={20} /></div>
                <h3 className="font-bold text-gray-800 mb-2 text-sm">{value.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <h2 className="section-title text-center mb-10">Leadership Team</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {TEAM.map((member, i) => (
              <div key={i} className="text-center group">
                <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-brand-100 to-blue-100 mx-auto mb-3 flex items-center justify-center overflow-hidden group-hover:shadow-lg transition">
                  <Users size={32} className="text-brand-300" />
                </div>
                <h3 className="font-bold text-gray-800 text-sm">{member.name}</h3>
                <p className="text-xs text-brand-500">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Stats */}
      <section className="py-16 bg-brand-500 text-white">
        <div className="container-wide px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[{ value: '1972', label: 'Founded' }, { value: '150+', label: 'Team Members' }, { value: '1000 KL', label: 'Monthly Capacity' }, { value: '35+', label: 'Years with Railways & Navy' }].map((stat, i) => (
              <div key={i}><div className="text-3xl md:text-4xl font-bold text-brand-100">{stat.value}</div><div className="text-brand-200 text-sm mt-1">{stat.label}</div></div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
