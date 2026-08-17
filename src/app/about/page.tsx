'use client';
import Link from 'next/link';
import { CHAIRMAN_MESSAGE, REAL_TIMELINE, CORE_VALUES, TEAM, VISION, MISSION, SITE } from '@/lib/constants';
import { ArrowRight } from 'lucide-react';

const legacy = [
  { title: 'Established 1972', desc: 'More than five decades of continuous paint manufacturing experience.' },
  { title: 'Manufacturing-Led', desc: 'Products are developed and manufactured within the company\'s own production infrastructure.' },
  { title: 'In-House Resin Manufacturing', desc: 'Anupam operates its own alkyd resin capability, giving greater control over formulation inputs.' },
  { title: 'Technical Development', desc: 'The portfolio has expanded from conventional coatings into advanced protective and specialty technologies.' },
  { title: 'Institutional Experience', desc: 'Long-standing supply to demanding sectors including Railways, marine, defence, infrastructure and public-sector applications.' },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative text-white overflow-hidden">
        <img src="/img/heroes/hero-about.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[var(--color-navy)]/75" />
        <div className="container-wide py-20 md:py-28 relative z-10">
          <div className="w-12 h-[2px] bg-[var(--color-red)] mb-6" />
          <h1 className="text-page-title text-white mb-4">More Than Five Decades of Paint Manufacturing</h1>
          <p className="text-white/50 max-w-2xl">Since 1972, Anupam Paints has developed coatings for everything from homes and commercial buildings to railway rolling stock, naval assets, structural steel, industrial plants and specialised engineering applications.</p>
          <div className="flex gap-4 mt-8">
            <Link href="/infrastructure" className="bg-[var(--color-red)] text-white font-semibold px-6 py-3 hover:opacity-90 transition" style={{borderRadius:'var(--radius-md)'}}>Visit Our Facility</Link>
            <a href="#story" className="text-white/70 font-medium px-4 py-3 hover:text-white transition inline-flex items-center gap-1">Our Journey <ArrowRight size={14} /></a>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section id="story" className="section-padding bg-white">
        <div className="container-wide max-w-3xl">
          <div className="w-10 h-[2px] bg-[var(--color-red)] mb-6" />
          <h2 className="text-page-title mb-6">Our Story</h2>
          <div className="space-y-4 text-[var(--color-steel)] leading-relaxed">
            <p>Anupam Enterprises, popularly known through the Anupam Paints brand, was established in 1972.</p>
            <p>Over more than five decades, the company has grown from a paint manufacturing enterprise into a diversified coatings manufacturer serving decorative, industrial, railway, marine, defence, infrastructure and specialty applications.</p>
            <p>Anupam&apos;s growth has been built around manufacturing capability rather than simply distribution or branding.</p>
            <p>The company today operates from its manufacturing facility at Ranihati, Howrah, West Bengal, and serves private industry, infrastructure companies, public-sector organisations, government departments, OEMs, applicators, contractors, dealers and residential customers across India.</p>
            <p className="text-[var(--color-navy)] font-medium italic">The Anupam philosophy is straightforward: understand the asset, understand the operating environment, then engineer the coating system around the requirement.</p>
            <p>This approach has allowed Anupam to develop products ranging from decorative emulsions and primers to zinc-rich corrosion-control systems, marine coatings, railway finishes, fire-protection coatings, potable-water linings, thermal-management coatings and other advanced technologies.</p>
          </div>
        </div>
      </section>

      {/* Legacy */}
      <section className="section-padding" style={{background:'var(--color-warm-white)'}}>
        <div className="container-wide">
          <h2 className="text-section-heading mb-8">Our Legacy</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--color-border)]">
            {legacy.map(item => (
              <div key={item.title} className="bg-white p-6">
                <h3 className="font-semibold text-[var(--color-navy)] mb-2">{item.title}</h3>
                <p className="text-sm text-[var(--color-steel)] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chairman's Message */}
      <section className="section-padding bg-white">
        <div className="container-wide max-w-3xl">
          <div className="w-10 h-[2px] bg-[var(--color-red)] mb-6" />
          <h2 className="text-section-heading mb-8">Chairman&apos;s Message</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <img src="/img/heroes/team-group.jpg" alt="Leadership" className="w-full h-40 object-cover object-top" style={{borderRadius:'var(--radius-md)'}} />
              <div className="mt-3 text-center">
                <div className="font-bold text-[var(--color-navy)] text-sm">{CHAIRMAN_MESSAGE.name}</div>
                <div className="text-xs text-[var(--color-steel)]">{CHAIRMAN_MESSAGE.title}</div>
              </div>
            </div>
            <div className="md:col-span-3">
              {CHAIRMAN_MESSAGE.message.split('\n\n').map((para, i) => (
                <p key={i} className="text-sm text-[var(--color-steel)] leading-relaxed mb-4">{para}</p>
              ))}
              <p className="text-[var(--color-steel)] italic mt-6">{CHAIRMAN_MESSAGE.signoff}</p>
              <p className="font-bold text-[var(--color-navy)]">{CHAIRMAN_MESSAGE.name}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding" style={{background:'#F0F4F8'}}>
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card p-8" style={{borderLeft:'3px solid var(--color-red)'}}>
              <h3 className="text-section-heading mb-4">Our Mission</h3>
              <p className="text-sm text-[var(--color-steel)] leading-relaxed">{MISSION}</p>
            </div>
            <div className="card p-8" style={{borderLeft:'3px solid var(--color-navy)'}}>
              <h3 className="text-section-heading mb-4">Our Vision</h3>
              <p className="text-sm text-[var(--color-steel)] leading-relaxed">{VISION}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-[var(--color-navy)] text-white">
        <div className="container-wide max-w-3xl">
          <h2 className="text-section-heading text-white mb-12">Our Journey</h2>
          <div className="space-y-8">
            {REAL_TIMELINE.map((item, i) => (
              <div key={i} className="flex gap-6">
                <div className="shrink-0 w-20 text-right">
                  <span className="text-lg font-bold" style={{color:'var(--color-red)'}}>{item.year}</span>
                </div>
                <div className="pl-6 pb-4" style={{borderLeft:'2px solid rgba(255,255,255,0.1)'}}>
                  <h3 className="font-bold text-white mb-1">{item.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Anupam */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="w-10 h-[2px] bg-[var(--color-red)] mb-6" />
          <h2 className="text-section-heading mb-8">Why Anupam Paints</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: 'More Than 50 Years of Manufacturing', desc: 'Established in 1972. Continuous manufacturing experience across decorative, industrial and specialty coatings.' },
              { title: 'Decorative + Industrial + Specialty', desc: 'A broad portfolio allows Anupam to work across homes, infrastructure, rolling stock, marine assets and heavy industry.' },
              { title: 'In-House Resin Manufacturing', desc: 'Greater control over formulation inputs. Better batch consistency and faster product customisation.' },
              { title: 'Technical Flexibility', desc: 'Ability to develop and customise coating systems around project requirements, subject to technical feasibility.' },
              { title: 'Institutional Experience', desc: 'Decades of work with demanding government, railway, marine, defence and industrial customers.' },
              { title: 'On-Site Technical Support', desc: 'Technical assistance for product selection, trials, application and coating-system implementation.' },
              { title: 'Cost Advantage', desc: 'Typically 10-15% cost advantage versus comparable national-company systems, where commercially applicable, without compromising specified performance.' },
              { title: 'Supply + Application', desc: 'Integrated supply and technical application support for institutional and project requirements.' },
            ].map(item => (
              <div key={item.title} className="py-4" style={{borderTop:'1px solid var(--color-border)'}}>
                <h3 className="font-semibold text-[var(--color-navy)] mb-1">{item.title}</h3>
                <p className="text-sm text-[var(--color-steel)] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[var(--color-navy)]">
        <div className="container-wide text-center">
          <h2 className="text-section-heading text-white mb-3">Want to Know More?</h2>
          <p className="text-white/40 mb-8">Visit our manufacturing facility or speak to our technical team.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/infrastructure" className="bg-[var(--color-red)] text-white font-semibold px-6 py-3 hover:opacity-90 transition" style={{borderRadius:'var(--radius-md)'}}>View Manufacturing</Link>
            <Link href="/contact" className="border border-white/20 text-white font-semibold px-6 py-3 hover:bg-white/10 transition" style={{borderRadius:'var(--radius-md)'}}>Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  );
}
