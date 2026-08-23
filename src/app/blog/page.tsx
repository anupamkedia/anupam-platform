'use client';
import Link from 'next/link';
import { ArrowRight, Calendar, Clock } from 'lucide-react';

const posts = [
  {
    slug: 'clear-protective-water-based-topcoat',
    title: 'Clear Water-Based Topcoats: Protection Without Changing the Look',
    excerpt: 'A clear coat has to do everything a pigmented one does, without the pigment that normally provides UV protection. How water-based clear topcoats work, where they belong, and where they fail.',
    date: '20 August 2026',
    readTime: '7 min read',
    category: 'Technology',
    image: '/img/heroes/hero-technical-library.jpg',
  },
  {
    slug: 'super-hydrophobic-coatings-what-they-do',
    title: 'Super-Hydrophobic Coatings: Separating the Physics from the Marketing',
    excerpt: 'Water beading off a surface makes a compelling video. What matters on a building is whether the effect survives three monsoons. An honest look at contact angle, self-cleaning and where the technology genuinely earns its cost.',
    date: '18 August 2026',
    readTime: '8 min read',
    category: 'Technology',
    image: '/img/heroes/hero-product-range.jpg',
  },
  {
    slug: 'pu-waterproofing-terrace-arest-system',
    title: 'PU Waterproofing for Terraces: Why Elastomeric Beats Rigid Every Time',
    excerpt: 'Most terrace waterproofing fails at a crack, a joint or a detail — not in the middle of the slab. Why polyurethane systems handle movement that cementitious ones cannot, and how to specify one properly.',
    date: '16 August 2026',
    readTime: '8 min read',
    category: 'Waterproofing',
    image: '/img/app/decorative/dec-roof-waterproof.jpg',
  },
  {
    slug: 'heat-reflective-coatings-buildings-india',
    title: 'Heat Reflective Coatings: What the Numbers Mean and What They Are Worth',
    excerpt: 'Surface temperature drops of 15 to 25 degrees are real. Indoor drops of the same size are not. Understanding the difference, and calculating whether a reflective roof pays for itself on your building.',
    date: '14 August 2026',
    readTime: '7 min read',
    category: 'Technology',
    image: '/img/heroes/hero-home-painting.jpg',
  },
  {
    slug: 'india-paint-price-war-2026-what-project-buyers-should-know',
    title: 'India\'s Paint Price War: What Project Buyers Should Actually Watch',
    excerpt: 'Aggressive new capacity has reset decorative pricing, but industrial and protective coatings follow different economics. Here is what actually moves your project cost.',
    date: '4 August 2026',
    readTime: '6 min read',
    category: 'Industry',
    image: '/img/heroes/hero-oil-gas.jpg',
  },
  {
    slug: 'low-voc-coatings-india-regulation-green-building',
    title: 'Low-VOC Coatings in India: What Regulation and Green Building Now Expect',
    excerpt: 'VOC limits are tightening, water-borne chemistry is displacing solvent-borne, and green building credits increasingly require product-level documentation. A practical guide for specifiers.',
    date: '21 July 2026',
    readTime: '7 min read',
    category: 'Sustainability',
    image: '/img/heroes/hero-approvals.jpg',
  },
  {
    slug: 'heat-reflective-roof-coatings-india-summer-temperatures',
    title: 'Heat-Reflective Roof Coatings: Real Numbers Behind the Cooling Claim',
    excerpt: 'As Indian summers intensify, reflective roof coatings have moved from novelty to specification. How they work, what temperature reduction is realistic, and when the payback makes sense.',
    date: '8 July 2026',
    readTime: '6 min read',
    category: 'Technology',
    image: '/img/heroes/hero-industrial-flooring.jpg',
  },
  {
    slug: 'monsoon-damp-seepage-exterior-walls-eastern-india',
    title: 'Why Walls Fail in the Monsoon — and What Actually Fixes Them',
    excerpt: 'Damp patches, peeling paint and efflorescence are symptoms, not causes. A diagnostic guide to wall failures in high-humidity regions, and why repainting alone never works.',
    date: '24 June 2026',
    readTime: '8 min read',
    category: 'Home Painting',
    image: '/img/heroes/hero-home-painting.jpg',
  },
  {
    slug: 'iso-12944-corrosivity-categories-explained',
    title: 'ISO 12944 in Practice: Choosing the Right Corrosivity Category',
    excerpt: 'Specifying C3 where the environment is C5-M is the most expensive mistake in protective coatings. How to read the categories, and what each one demands of the system.',
    date: '10 June 2026',
    readTime: '9 min read',
    category: 'Technical',
    image: '/img/heroes/hero-technical-library.jpg',
  },
  {
    slug: 'coatings-metro-rail-expansion-india',
    title: 'Coating India\'s Metro Expansion: Specification Lessons from the Field',
    excerpt: 'Metro projects combine structural steel, concrete, rolling stock and public architecture in one contract. Each needs a different system, and the interfaces are where problems appear.',
    date: '27 May 2026',
    readTime: '7 min read',
    category: 'Infrastructure',
    image: '/img/heroes/hero-oil-gas.jpg',
  },
  {
    slug: 'epoxy-vs-polyaspartic-industrial-flooring-downtime',
    title: 'Epoxy or Polyaspartic Flooring: The Real Cost Is Downtime',
    excerpt: 'Comparing floor coatings on rupees per square foot ignores the largest cost in most flooring projects — the days the facility is not producing.',
    date: '13 May 2026',
    readTime: '6 min read',
    category: 'Technical',
    image: '/img/heroes/hero-industrial-flooring.jpg',
  },
  {
    slug: 'intumescent-fire-protection-dft-section-factor',
    title: 'Intumescent Fire Protection: The DFT Is a Calculation, Not a Product Choice',
    excerpt: 'Passive fire protection for structural steel is the one coating where the film thickness is derived from structural engineering. Getting this wrong is a life safety issue.',
    date: '29 April 2026',
    readTime: '7 min read',
    category: 'Technical',
    image: '/img/heroes/hero-fire-protection.jpg',
  },
  {
    slug: 'understanding-coating-systems-for-structural-steel',
    title: 'Understanding Coating Systems for Structural Steel: A Complete Guide',
    excerpt: 'Structural steel is the backbone of modern infrastructure — bridges, buildings, power plants, and industrial facilities. But without proper corrosion protection, steel deteriorates rapidly. This guide explains how multi-coat protective systems work, from zinc-rich primers to polyurethane topcoats, and how to select the right system for your environment.',
    date: '12 August 2026',
    readTime: '8 min read',
    category: 'Technical',
    image: '/img/app/industrial/ind-structural-spray.jpg',
  },
  {
    slug: 'why-surface-preparation-matters-more-than-paint-quality',
    title: 'Why Surface Preparation Matters More Than Paint Quality',
    excerpt: 'The most common reason coatings fail is not the paint — it is the surface underneath. Studies consistently show that 60-80% of all coating failures can be traced back to inadequate surface preparation. Whether you are painting a home wall or blast-cleaning a ship hull, the preparation determines the result.',
    date: '5 August 2026',
    readTime: '6 min read',
    category: 'Technical',
    image: '/img/app/industrial/ind-zincrich.jpg',
  },
  {
    slug: 'choosing-the-right-paint-for-your-home-interior',
    title: 'Choosing the Right Paint for Your Home Interior: Luxury vs Premium vs Economy',
    excerpt: 'Walking into a paint shop can be overwhelming — dozens of brands, hundreds of shades, and prices ranging from Rs.100 to Rs.500 per litre. This guide breaks down what actually differs between luxury, premium, and economy interior emulsions, what you are paying for, and which tier makes sense for your home.',
    date: '28 July 2026',
    readTime: '5 min read',
    category: 'Home Painting',
    image: '/img/app/decorative/dec-living-premium.jpg',
  },
  {
    slug: 'rdso-approved-railway-coatings-what-makes-them-different',
    title: 'RDSO Approved Railway Coatings: What Makes Them Different?',
    excerpt: 'Indian Railways operates one of the largest rail networks in the world, with over 70,000 coaches exposed to extreme UV, monsoon rains, stone chipping, and chemical cleaning. Railway coatings must meet rigorous RDSO specifications including EN 45545 fire safety. Learn what goes into engineering a coating system for railway rolling stock.',
    date: '20 July 2026',
    readTime: '7 min read',
    category: 'Railway',
    image: '/img/app/railway/rly-coach-painting.jpg',
  },
  {
    slug: 'waterproofing-your-terrace-common-mistakes-and-solutions',
    title: 'Waterproofing Your Terrace: 5 Common Mistakes and How to Avoid Them',
    excerpt: 'Every monsoon season, thousands of homeowners discover that their terrace waterproofing has failed. Water seeps through cracks, damages ceilings, and causes expensive repairs. Most failures happen not because of bad products, but because of incorrect application. Here are the five most common mistakes and how to get waterproofing right.',
    date: '15 July 2026',
    readTime: '5 min read',
    category: 'Waterproofing',
    image: '/img/app/decorative/dec-roof-waterproof.jpg',
  },
];

export default function BlogPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-white">
        <img src="/img/heroes/hero-blog.jpg" alt="Anupam Paints insights and technical articles on a tablet" className="w-full h-auto block" />
        <div className="not-sr-only md:sr-only container-wide px-4 py-6 md:py-0">
          <div className="w-12 h-[2px] bg-[var(--color-red)] mb-6" />
          <h1 className="text-page-title text-[var(--color-navy)] mb-3">Blog & Insights</h1>
          <p className="text-gray-600 max-w-xl">Technical articles, application guides, and industry insights from the Anupam Paints team.</p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-wide">
          {/* Featured post */}
          <Link href={"/blog/" + posts[0].slug} className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 group">
            <div className="overflow-hidden" style={{borderRadius:'var(--radius-lg)'}}>
              <img src={posts[0].image} alt={posts[0].title} className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-xs font-semibold uppercase tracking-wider mb-2" style={{color:'var(--color-red)'}}>{posts[0].category}</span>
              <h2 className="text-2xl font-bold text-[var(--color-navy)] mb-3 group-hover:text-[var(--color-red)] transition">{posts[0].title}</h2>
              <p className="text-[var(--color-steel)] leading-relaxed mb-4">{posts[0].excerpt}</p>
              <div className="flex items-center gap-4 text-xs text-[var(--color-steel)]">
                <span className="flex items-center gap-1"><Calendar size={12} /> {posts[0].date}</span>
                <span className="flex items-center gap-1"><Clock size={12} /> {posts[0].readTime}</span>
              </div>
            </div>
          </Link>

          {/* Other posts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {posts.slice(1).map(post => (
              <Link key={post.slug} href={"/blog/" + post.slug} className="card card-hover group overflow-hidden">
                <div className="h-44 overflow-hidden">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <span className="text-[10px] font-semibold uppercase tracking-wider" style={{color:'var(--color-red)'}}>{post.category}</span>
                  <h3 className="text-sm font-bold text-[var(--color-navy)] mt-1 mb-2 line-clamp-2 group-hover:text-[var(--color-red)] transition">{post.title}</h3>
                  <p className="text-xs text-[var(--color-steel)] line-clamp-3 mb-3">{post.excerpt}</p>
                  <div className="flex items-center gap-3 text-[10px] text-[var(--color-steel)]">
                    <span>{post.date}</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12" style={{background:'var(--color-warm-white)'}}>
        <div className="container-wide text-center">
          <p className="text-[var(--color-steel)] mb-4">Want technical articles delivered to your inbox?</p>
          <Link href="/contact" className="bg-[var(--color-red)] text-white font-semibold px-6 py-3 hover:opacity-90 transition inline-block" style={{borderRadius:'var(--radius-md)'}}>Subscribe to Updates</Link>
        </div>
      </section>
    </>
  );
}