'use client';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';

const posts: Record<string, any> = {
  'understanding-coating-systems-for-structural-steel': {
    title: 'Understanding Coating Systems for Structural Steel: A Complete Guide',
    date: '12 August 2026', readTime: '8 min read', category: 'Technical',
    image: '/img/app/industrial/ind-structural-spray.png',
    content: [
      'Structural steel is the backbone of modern infrastructure. Bridges, power plants, refineries, commercial buildings, and industrial facilities all depend on steel for structural integrity. But steel has one critical vulnerability — corrosion.',
      'When exposed to moisture, oxygen, and especially chlorides in coastal or industrial environments, steel corrodes. Without protection, a steel structure can lose significant cross-section within years, compromising its load-bearing capacity and safety.',
      '## How Multi-Coat Systems Work',
      'A protective coating system is not a single coat of paint. It is an engineered multi-layer system where each layer performs a specific function:',
      '**Primer** — The first coat applied directly to prepared steel. Zinc-rich primers provide sacrificial (cathodic) protection. Epoxy zinc phosphate primers provide inhibitive protection. The choice depends on the environment severity.',
      '**Intermediate Coat** — The barrier coat. Typically a high-build epoxy or epoxy MIO (micaceous iron oxide). This layer provides the bulk of the barrier protection, preventing moisture and oxygen from reaching the steel.',
      '**Topcoat** — The finishing coat. Aliphatic polyurethane for exterior exposure provides UV resistance, colour retention, and gloss retention. FEVE fluoropolymer for extreme weathering. Polysiloxane for long-term maintenance-free performance.',
      '## Selecting the Right System',
      'The correct system depends on several factors:',
      '**Environment** — classified by ISO 12944 from C1 (very low) to CX (extreme offshore). A rural building requires a different system than a coastal bridge or an offshore platform.',
      '**Design Life** — How long must the coating protect? 5 years (low), 15 years (medium), or 25+ years (high/very high)?',
      '**Surface Preparation** — The foundation of any coating system. Abrasive blast cleaning to Sa 2.5 is the gold standard for high-performance systems.',
      '**DFT (Dry Film Thickness)** — Each coat must achieve the specified thickness. Too thin reduces protection. Too thick can cause cracking.',
      '## Typical Systems by Environment',
      '**C3 General Industrial:** Epoxy Zinc Phosphate (50μm) → Epoxy MIO (100μm) → Aliphatic PU (50μm). Total: 200μm.',
      '**C4-C5 Coastal/Marine:** Inorganic Zinc Silicate (75μm) → High-Build Epoxy (150μm) → Aliphatic PU (50μm). Total: 275μm.',
      '**CX Offshore:** Inorganic Zinc Silicate (75μm) → Glass Flake Epoxy (200-500μm) → Aliphatic PU (50μm). Total: 325-625μm.',
      '## The Anupam Approach',
      'At Anupam Paints, we manufacture the complete range of structural steel coating systems — from zinc-rich primers to polyurethane topcoats. Our technical team can specify the right system for your project based on the actual environment, design life, and applicable standards.',
      'Contact our technical team for a system recommendation specific to your project.',
    ],
  },
  'why-surface-preparation-matters-more-than-paint-quality': {
    title: 'Why Surface Preparation Matters More Than Paint Quality',
    date: '5 August 2026', readTime: '6 min read', category: 'Technical',
    image: '/img/app/industrial/ind-zincrich.png',
    content: [
      'If you could invest in only one thing to improve coating performance, it should not be a more expensive paint. It should be better surface preparation.',
      'Industry data consistently shows that 60-80% of all premature coating failures are caused by inadequate surface preparation — not by the coating itself.',
      '## What Surface Preparation Does',
      'Surface preparation achieves three things:',
      '**Removes contaminants** — Oil, grease, salts, dust, and moisture on the surface prevent adhesion. Even invisible salt contamination from fingerprints can cause blistering.',
      '**Removes rust and mill scale** — Mill scale is the dark oxide layer formed during steel manufacturing. It looks protective but it is cathodic to steel and will cause underfilm corrosion.',
      '**Creates surface profile** — Blast cleaning creates tiny peaks and valleys (profile) that dramatically increase the surface area for mechanical adhesion.',
      '## Standards You Should Know',
      '**Sa 2.5 (Near-White Blast)** — The most commonly specified grade for high-performance systems. At least 95% of the surface is free from visible contaminants.',
      '**Sa 3 (White Metal Blast)** — Complete removal of all visible contaminants. Required for immersion service and some high-performance systems.',
      '**St 3 (Power Tool Cleaning)** — Acceptable for maintenance situations where blast cleaning is impractical. Not suitable for high-performance new construction.',
      '## The Bottom Line',
      'The best coating in the world will fail on a poorly prepared surface. And a well-prepared surface will make even a standard coating perform better than expected.',
      'Before specifying an expensive coating system, ensure your surface preparation specification is correct. It is the single most important factor in coating durability.',
    ],
  },
  'choosing-the-right-paint-for-your-home-interior': {
    title: 'Choosing the Right Paint for Your Home Interior',
    date: '28 July 2026', readTime: '5 min read', category: 'Home Painting',
    image: '/img/app/decorative/dec-living-premium.png',
    content: [
      'Selecting interior paint for your home involves more than picking a colour. The type of emulsion you choose determines how the walls look, how long the finish lasts, and how easy it is to maintain.',
      '## Luxury vs Premium vs Economy — What Is the Difference?',
      '**Luxury Emulsions (like Azura Pearl Glow)** — Use high-quality acrylic polymers and fine-ground pigments. Result: smoother finish, better coverage in fewer coats, superior washability (can withstand 10,000+ scrub cycles), stain resistance, and colour that does not fade. Cost: Rs.350-500/litre.',
      '**Premium Emulsions (like Asure CleanWalls)** — Good quality polymers with reliable coverage and washability (5,000+ scrub cycles). Excellent balance of performance and value. Cost: Rs.200-350/litre.',
      '**Economy Emulsions (like Atop Interior)** — Standard acrylic emulsions suitable for large-area painting where budget is primary. Decent coverage, basic washability. Cost: Rs.100-200/litre.',
      '## What Should You Choose?',
      '**Living room and bedrooms** — Luxury or premium. These are high-visibility rooms where finish quality, colour depth, and stain resistance matter.',
      '**Kitchen** — Luxury. Must withstand oil splashes, steam, and frequent cleaning.',
      '**Bathroom ceiling** — Premium with anti-fungal properties. Humidity resistance is critical.',
      '**Children\'s rooms** — Luxury washable. Kids will touch, draw, and splash. You need wipeable walls.',
      '**Rental property** — Economy with good primer. Functional and cost-effective.',
      '## The Primer Matters',
      'Never skip primer. A proper primer like Azura Damp Arrestor provides alkali resistance, improves adhesion, and ensures the topcoat colour appears true. Painting directly on bare plaster wastes paint and reduces durability.',
      'Visit an Anupam dealer near you or use our Paint Calculator to estimate quantities for your project.',
    ],
  },
  'rdso-approved-railway-coatings-what-makes-them-different': {
    title: 'RDSO Approved Railway Coatings: What Makes Them Different?',
    date: '20 July 2026', readTime: '7 min read', category: 'Railway',
    image: '/img/app/railway/rly-coach-painting.png',
    content: [
      'Indian Railways operates over 70,000 coaches across one of the world\'s largest rail networks. These coaches face extreme conditions — tropical UV, monsoon rains, temperature swings from 5°C to 50°C, stone chipping from ballast, chemical cleaning agents, and constant passenger use.',
      '## Why Railway Coatings Are Different',
      'A railway coach coating must simultaneously provide:',
      '**Corrosion protection** — The steel shell must be protected for 8-12 years between workshop repaints.',
      '**Appearance** — Gloss and colour must be retained despite years of UV exposure and chemical washing.',
      '**Fire safety** — EN 45545 HL3 compliance is increasingly required. The coating must not contribute to fire spread or toxic smoke.',
      '**Mechanical durability** — Resistance to stone impact from ballast, vibration, and regular cleaning.',
      '## The FEVE Advantage',
      'FEVE (Fluoroethylene Vinyl Ether) fluoropolymer topcoats offer the highest weatherability available in a liquid coating. Unlike conventional polyurethane, FEVE resins contain carbon-fluorine bonds that are virtually unbreakable by UV radiation.',
      'The result: gloss retention above 80% even after 10+ years of outdoor exposure, versus 40-50% for conventional PU.',
      '## Anupam\'s Railway Heritage',
      'Anupam Paints has been supplying Indian Railways for over three decades. Our ANUTHANE FEVE system has been tested for over 4000 hours in QUV accelerated weathering and meets EN 45545 HL3 R7 fire safety requirements.',
      'We supply coating systems to CLW, DMW, ICF, RCF, MCF, and multiple railway workshops across India.',
    ],
  },
  'waterproofing-your-terrace-common-mistakes-and-solutions': {
    title: 'Waterproofing Your Terrace: 5 Common Mistakes',
    date: '15 July 2026', readTime: '5 min read', category: 'Waterproofing',
    image: '/img/app/decorative/dec-roof-waterproof.png',
    content: [
      'Every monsoon, thousands of homeowners discover leaking terraces. The frustrating truth: most waterproofing failures are caused by application mistakes, not product failures.',
      '## Mistake 1: Not Finding the Water Source',
      'Before applying any waterproofing, you must identify WHERE water is entering. Is it through cracks? Pipe penetrations? Parapet junctions? Poor drainage causing ponding? Applying waterproofing over the wrong area wastes money.',
      '## Mistake 2: Skipping Crack Treatment',
      'Cracks in the RCC slab must be treated BEFORE applying the waterproofing membrane. Use a flexible crack filler like Arest Crack Filler to fill and bridge existing cracks. The membrane alone cannot bridge active structural cracks.',
      '## Mistake 3: Applying on a Wet Surface',
      'Waterproofing coatings need a dry substrate to adhere properly. Applying during rain or on a damp surface traps moisture underneath, causing blistering and delamination within months.',
      '## Mistake 4: Insufficient Thickness',
      'A thin coat is not waterproof. Follow the manufacturer\'s recommended coverage strictly. Multiple coats with proper drying between them create a continuous, pinhole-free membrane.',
      '## Mistake 5: Ignoring Details',
      'Most leaks occur at details — where the terrace meets the parapet wall, around pipe penetrations, at expansion joints, and at drainage outlets. These areas need reinforcement with fabric membrane embedded in the waterproofing system.',
      '## The Right System',
      'A proper terrace waterproofing system consists of: Surface cleaning → Crack filling → Primer → Base coat → Reinforcement at details → Second coat → UV-resistant topcoat.',
      'Anupam\'s Arest waterproofing range provides the complete system. Contact us for a site assessment.',
    ],
  },
};

export default function BlogPost() {
  const params = useParams();
  const slug = params.slug as string;
  const post = posts[slug];
  if (!post) return <div className="container-wide py-20 text-center"><h1 className="text-2xl font-bold">Post not found</h1><Link href="/blog" className="text-[var(--color-red)] mt-4 inline-block">Back to Blog</Link></div>;

  return (
    <>
      <section className="relative text-white overflow-hidden">
        <img src={post.image} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[var(--color-navy)]/75" />
        <div className="container-wide py-16 md:py-24 relative z-10">
          <Link href="/blog" className="text-white/50 text-sm flex items-center gap-1 mb-4 hover:text-white transition"><ArrowLeft size={14} /> Back to Blog</Link>
          <span className="text-xs font-semibold uppercase tracking-wider" style={{color:'var(--color-red)'}}>{post.category}</span>
          <h1 className="text-page-title text-white mt-2 mb-4">{post.title}</h1>
          <div className="flex items-center gap-4 text-sm text-white/50">
            <span className="flex items-center gap-1"><Calendar size={14} /> {post.date}</span>
            <span className="flex items-center gap-1"><Clock size={14} /> {post.readTime}</span>
          </div>
        </div>
      </section>
      <section className="section-padding bg-white">
        <div className="container-wide max-w-3xl">
          <div className="space-y-4">
            {post.content.map((para: string, i: number) => {
              if (para.startsWith('## ')) return <h2 key={i} className="text-xl font-bold text-[var(--color-navy)] mt-8 mb-2">{para.replace('## ', '')}</h2>;
              if (para.startsWith('**') && para.endsWith('**')) return <h3 key={i} className="font-bold text-[var(--color-navy)] mt-4">{para.replace(/\*\*/g, '')}</h3>;
              const formatted = para.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
              return <p key={i} className="text-[var(--color-steel)] leading-relaxed" dangerouslySetInnerHTML={{__html: formatted}} />;
            })}
          </div>
          <div className="mt-12 pt-8" style={{borderTop:'1px solid var(--color-border)'}}>
            <h3 className="font-bold text-[var(--color-navy)] mb-3">Need Technical Assistance?</h3>
            <p className="text-sm text-[var(--color-steel)] mb-4">Our team can help you select the right coating system for your specific application.</p>
            <div className="flex gap-3">
              <Link href="/contact" className="bg-[var(--color-red)] text-white font-semibold px-5 py-2.5 text-sm" style={{borderRadius:'var(--radius-md)'}}>Contact Technical Team</Link>
              <Link href="/technical-library" className="border border-[var(--color-border)] text-[var(--color-navy)] font-semibold px-5 py-2.5 text-sm" style={{borderRadius:'var(--radius-md)'}}>Browse TDS Library</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}