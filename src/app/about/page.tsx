import { Metadata } from 'next';
import { SITE, WHY_ANUPAM } from '@/lib/constants';
import { CheckCircle, Award, Factory, FlaskConical, Leaf, Users, Target, Eye } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Anupam Paints — 50+ years of manufacturing excellence in decorative, industrial, marine, railway, and specialty coatings. Based in Kolkata, India.',
};

const timeline = [
  { year: '1972', title: 'Founded', desc: 'Anupam Enterprises established in Kolkata with a vision to manufacture quality paints.' },
  { year: '1980s', title: 'Government Approvals', desc: 'Secured first railway and government approvals, entering institutional market.' },
  { year: '1990s', title: 'Capacity Expansion', desc: 'Expanded manufacturing facility at Ranihati, Howrah. Added industrial coatings division.' },
  { year: '2000s', title: 'ISO Certified', desc: 'Achieved ISO 9001 certification. Expanded to marine and defence coatings.' },
  { year: '2010s', title: 'Innovation', desc: 'In-house resin plant commissioned. NABL-compliant lab established. Launched specialty coatings.' },
  { year: '2020s', title: 'Digital Transformation', desc: '1000 KL/month capacity. Polyurea, nano coatings, Azura eco-friendly line. Pan-India expansion.' },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="gradient-brand text-white py-16 md:py-24">
        <div className="container-wide px-4">
          <div className="max-w-3xl">
            <p className="text-brand-200 text-sm font-medium mb-2 tracking-wider uppercase">About Us</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">50+ Years of Coating Excellence</h1>
            <p className="text-lg text-brand-200 leading-relaxed">
              From a small paint workshop in Kolkata to one of India&apos;s most versatile coating manufacturers — our journey of innovation, quality, and trust.
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section-padding bg-white">
        <div className="container-wide grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-2xl bg-brand-50 border border-brand-100">
            <div className="flex items-center gap-3 mb-4">
              <Eye className="text-brand-500" size={28} />
              <h2 className="text-2xl font-bold text-brand-500">Our Vision</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              To be India&apos;s most trusted and technically advanced coatings manufacturer, delivering world-class protection and aesthetics across every industry.
            </p>
          </div>
          <div className="p-8 rounded-2xl bg-accent-50 border border-red-100">
            <div className="flex items-center gap-3 mb-4">
              <Target className="text-accent-400" size={28} />
              <h2 className="text-2xl font-bold text-accent-400">Our Mission</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              To engineer high-performance coating solutions through innovation, manufacturing excellence, and customer partnership — while maintaining cost leadership and environmental responsibility.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding gradient-light">
        <div className="container-wide">
          <h2 className="section-title text-center mb-12">Our Journey</h2>
          <div className="max-w-3xl mx-auto">
            {timeline.map((item, i) => (
              <div key={i} className="flex gap-6 mb-8 last:mb-0">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-brand-500 text-white flex items-center justify-center font-bold text-sm shrink-0">
                    {item.year.slice(-2)}
                  </div>
                  {i < timeline.length - 1 && <div className="w-0.5 flex-1 bg-brand-200 mt-2" />}
                </div>
                <div className="pb-8">
                  <div className="text-sm text-brand-500 font-medium">{item.year}</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-1">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Strengths */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <h2 className="section-title text-center mb-4">Why Customers Trust Us</h2>
          <p className="section-subtitle text-center mx-auto mb-12">A combination of manufacturing strength, technical depth, and commercial advantage.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_ANUPAM.map((item, i) => (
              <div key={i} className="card p-6 hover:border-brand-200 transition">
                <CheckCircle size={24} className="text-brand-500 mb-3" />
                <h3 className="font-bold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership placeholder */}
      <section className="section-padding gradient-light">
        <div className="container-wide text-center">
          <h2 className="section-title mb-4">Leadership</h2>
          <p className="text-gray-600 max-w-lg mx-auto mb-8">
            [Founder and director profiles with photographs will be displayed here. Content to be provided by Anupam Paints.]
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {['Managing Director', 'Director', 'Director'].map((title, i) => (
              <div key={i} className="card p-6 text-center">
                <div className="w-20 h-20 rounded-full bg-brand-100 mx-auto mb-4 flex items-center justify-center">
                  <Users size={32} className="text-brand-400" />
                </div>
                <div className="font-bold text-gray-800">{title}</div>
                <div className="text-sm text-steel-400">Anupam Enterprises</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
