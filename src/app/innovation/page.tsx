'use client';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const technologies = [
  { name: 'Epoxy Technology', desc: 'Two-component systems providing exceptional adhesion, chemical resistance, and barrier protection for steel, concrete, and immersion environments.', uses: ['Structural steel', 'Tank linings', 'Flooring', 'Marine'], products: ['Epoxy Zinc Phosphate', 'Epoxy MIO', 'Epoxy High-Build', 'Solventless Epoxy'] },
  { name: 'Polyurethane Technology', desc: 'Aliphatic and aromatic PU systems delivering UV stability, gloss retention, chemical resistance, and flexibility for topcoat applications.', uses: ['Topcoats', 'Coach exteriors', 'Architectural', 'Floor finishes'], products: ['Aliphatic PU Topcoat', 'Aromatic PU', 'PU Clear Coat'] },
  { name: 'FEVE Fluoropolymer', desc: 'Fluoroethylene vinyl ether technology for extreme gloss and colour retention beyond 15 years. RDSO approved for railway coach exteriors.', uses: ['Railway coaches', 'Architectural facades', 'Bridges'], products: ['FEVE Coach Exterior Coating'] },
  { name: 'Zinc-Rich Technology', desc: 'Organic and inorganic zinc-rich primers providing cathodic protection through galvanic action. Up to 85% metallic zinc in dry film.', uses: ['Structural steel', 'Bridges', 'Offshore', 'Marine'], products: ['Inorganic Zinc Silicate', 'Epoxy Zinc-Rich Primer'] },
  { name: 'Intumescent Fire Protection', desc: 'Coatings that expand 40-50x when exposed to fire, forming insulating carbon char protecting steel from reaching critical temperature. Up to 120-minute fire rating.', uses: ['I-beams', 'Columns', 'Oil & gas', 'Commercial buildings'], products: ['FireSeal Intumescent Coating'] },
  { name: 'Solventless / 100% Solids', desc: 'Zero-VOC coatings with no solvent release. Essential for confined spaces, immersion service, and food/water-contact applications.', uses: ['Potable water tanks', 'Chemical tanks', 'Confined spaces'], products: ['Solventless Epoxy Tank Lining'] },
  { name: 'Glass-Flake Technology', desc: 'Lamellar glass flakes create a tortuous path barrier, dramatically improving chemical and immersion resistance in aggressive environments.', uses: ['Chemical plants', 'Offshore', 'FGD systems', 'Tanks'], products: ['Glass Flake Epoxy Coating'] },
  { name: 'Polysiloxane Technology', desc: 'Silicone-modified systems providing exceptional water impermeability, UV resistance, and hydrophobic film formation for exterior applications.', uses: ['Exterior walls', 'Bridges', 'Structural steel'], products: ['Azura Antidirt Long Life', 'Polysiloxane Topcoat'] },
  { name: 'Thermal Management', desc: 'Silicone aluminium and ceramic-modified coatings for continuous service temperatures from 200°C to 600°C.', uses: ['Stacks', 'Boilers', 'Exhaust ducts', 'Engine parts'], products: ['Heat Resistant Aluminium Paint'] },
  { name: 'Polyurea & Polyaspartic', desc: 'Fast-cure protective coatings achieving full cure in hours. Ideal for fast-turnaround flooring, bridge decks, and secondary containment.', uses: ['Flooring', 'Bridge decks', 'Containment', 'Parking'], products: ['Polyaspartic Floor Coating', 'Polyurea Coating'] },
  { name: 'Anti-Fouling Technology', desc: 'Biocide-free silicone-epoxy hybrid foul-release systems reducing hull friction and fuel consumption by 5-8%.', uses: ['Naval vessels', 'Commercial ships', 'Offshore platforms'], products: ['2K Silicone-Epoxy Anti-Fouling'] },
  { name: 'Low-VOC & Sustainable', desc: 'Water-based, high-solids, and solventless formulations minimising environmental impact without compromising performance.', uses: ['Interior painting', 'Green buildings', 'Healthcare', 'Education'], products: ['Azura range', 'Asure range', 'Water-based primers'] },
];

export default function InnovationPage() {
return (
  <>
    <section className="relative text-white overflow-hidden">
        <img src="/img/heroes/hero-innovation.png" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[var(--color-navy)]/75" />
        <div className="py-16 md:py-24 relative z-10">
      <div className="container-wide max-w-3xl">
        <div className="w-12 h-[2px] bg-[var(--color-red)] mb-6" />
        <h1 className="text-page-title text-white mb-4">Innovation & Technology</h1>
        <p className="text-white/50">The coating technologies within the Anupam portfolio — what they are, how they work, and what problems they solve.</p>
      </div>
    </div></section>
    <section className="section-padding bg-white">
      <div className="container-wide">
        <div className="space-y-8">
          {technologies.map((tech, i) => (
            <div key={tech.name} className="card p-6 md:p-8" style={{borderLeft: '3px solid var(--color-red)'}}>
              <h2 className="text-lg font-bold text-[var(--color-navy)] mb-2">{tech.name}</h2>
              <p className="text-sm text-[var(--color-steel)] leading-relaxed mb-4">{tech.desc}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-steel)]">Where It Is Used</span>
                  <div className="flex flex-wrap gap-1.5 mt-2">{tech.uses.map(u => <span key={u} className="text-xs px-2 py-0.5 bg-gray-100 text-[var(--color-graphite)]" style={{borderRadius:'var(--radius-sm)'}}>{u}</span>)}</div></div>
                <div><span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-steel)]">Related Anupam Products</span>
                  <div className="flex flex-wrap gap-1.5 mt-2">{tech.products.map(p => <span key={p} className="text-xs px-2 py-0.5 bg-blue-50 text-[var(--color-navy)]" style={{borderRadius:'var(--radius-sm)'}}>{p}</span>)}</div></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </>
);
}
