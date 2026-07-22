export const SITE = {
  name: 'Anupam Paints',
  company: 'Anupam Enterprises',
  tagline: 'Engineering Coatings. Protecting Assets. Beautifying Spaces.',
  established: '1972',
  capacity: '1000 KL/Month',
  facility: '5-Acre Manufacturing Facility',
  headOffice: '113 Park Street, Poddar Point, Kolkata – 700064',
  factory: 'Ranihati, Howrah, West Bengal',
  phone: '+91-XXXXXXXXXX',
  email: 'info@anupampaints.com',
  whatsapp: '+91-XXXXXXXXXX',
};

export const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Infrastructure', href: '/infrastructure' },
  {
    label: 'Products', href: '/products',
    children: [
      { label: 'Decorative & Architectural', href: '/products/decorative' },
      { label: 'Industrial Protective', href: '/products/industrial' },
      { label: 'Marine & Defence', href: '/products/marine' },
      { label: 'Railway', href: '/products/railway' },
      { label: 'Specialty', href: '/products/specialty' },
      { label: 'Product Finder', href: '/products?finder=true' },
    ],
  },
  {
    label: 'Solutions', href: '/solutions',
    children: [
      { label: 'Structural Steel Systems', href: '/solutions/structural-steel' },
      { label: 'Railway Coating Systems', href: '/solutions/railway-systems' },
      { label: 'Marine Coating Systems', href: '/solutions/marine-systems' },
      { label: 'Industrial Flooring', href: '/solutions/industrial-flooring' },
      { label: 'Roof Waterproofing', href: '/solutions/roof-waterproofing' },
      { label: 'Fire Protection', href: '/solutions/fire-protection' },
      { label: 'Potable Water Tanks', href: '/solutions/potable-water' },
      { label: 'Oil & Gas', href: '/solutions/oil-gas' },
      { label: 'View All Solutions', href: '/solutions' },
    ],
  },
  { label: 'Approvals', href: '/approvals' },
  { label: 'Clients', href: '/clients' },
  {
    label: 'Resources', href: '/technical-library',
    children: [
      { label: 'Technical Library', href: '/technical-library' },
      { label: 'Paint Calculator', href: '/calculator' },
      { label: 'Blog & Knowledge Centre', href: '/blog' },
    ],
  },
  { label: 'Contact', href: '/contact' },
];

export const STATS = [
  { value: '50+', label: 'Years of Excellence', suffix: '' },
  { value: '1000', label: 'KL/Month Capacity', suffix: '+' },
  { value: '5', label: 'Acre Manufacturing Plant', suffix: '' },
  { value: '500', label: 'Products', suffix: '+' },
  { value: '100', label: 'Approvals & Certifications', suffix: '+' },
  { value: '20', label: 'States Served', suffix: '+' },
];

export const WHY_ANUPAM = [
  { title: 'Since 1972', desc: '50+ years of unbroken manufacturing excellence in decorative and industrial coatings.' },
  { title: 'In-House Resin Plant', desc: 'Vertical integration with our own alkyd resin manufacturing — ensuring quality from raw material to finished product.' },
  { title: 'NABL-Compliant Lab', desc: 'Every batch tested in our modern QC laboratory. Salt spray, adhesion, weathering, chemical resistance — all in-house.' },
  { title: 'Government Approved', desc: 'Trusted by Indian Railways, Navy, MES, HPCL, BHEL, EIL, CMRL, AAI, and more.' },
  { title: 'Custom Formulation', desc: 'Any coating engineered to your exact specification. Faster turnaround than large national companies.' },
  { title: '10–15% Cost Advantage', desc: 'Premium quality at competitive pricing — without compromising performance, compliance, or quality.' },
  { title: 'Supply + Application', desc: 'Turnkey project execution with trained application teams and on-site technical support.' },
  { title: 'ISO Certified', desc: 'ISO 9001, ISO 14001, ISO 45001 — quality, environment, and safety management systems.' },
];

export const DIVISIONS_DATA = [
  {
    slug: 'decorative', name: 'Decorative & Architectural',
    tagline: 'Creating Memories',
    desc: 'Premium interior and exterior paints, textures, waterproofing, and designer finishes for homes and commercial spaces.',
    color: 'from-blue-400 to-indigo-600',
  },
  {
    slug: 'industrial', name: 'Industrial Protective',
    tagline: 'Protection Engineered',
    desc: 'Epoxy, PU, zinc-rich, heat-resistant, and chemical-resistant coatings for steel structures, pipelines, and industrial assets.',
    color: 'from-gray-600 to-gray-800',
  },
  {
    slug: 'marine', name: 'Marine & Defence',
    tagline: 'Defending the Fleet',
    desc: 'Anti-fouling, underwater, deck, and fire-retardant coatings for naval vessels and shipyards. Indian Navy approved.',
    color: 'from-cyan-600 to-blue-800',
  },
  {
    slug: 'railway', name: 'Railway Coatings',
    tagline: 'Coating the Backbone of India',
    desc: 'RDSO, ICF, CLW, DMW approved systems. FEVE coatings, EN 45545 HL3 compliant fire-safe products.',
    color: 'from-red-500 to-red-700',
  },
  {
    slug: 'specialty', name: 'Specialty Coatings',
    tagline: 'Beyond Ordinary',
    desc: 'Intumescent fire protection, thermal barriers, potable water coatings, polyurea, and nano-technology systems.',
    color: 'from-amber-500 to-orange-600',
  },
];

export const ENQUIRY_TYPES = [
  'Product Enquiry',
  'Technical Support',
  'Dealer Enquiry',
  'Export Enquiry',
  'Project Specification',
  'Sample Request',
  'Quotation Request',
  'Career Enquiry',
  'Other',
];

export const APPROVAL_CATEGORIES = [
  'All', 'ISO', 'Railway', 'Defence', 'Infrastructure', 'Energy', 'Green Building', 'Potable Water', 'Registration',
];
