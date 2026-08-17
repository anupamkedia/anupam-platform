const imageMap: Record<string, string> = {
  'AZ-INT-001': '/img/products/azura-advance-emulsion.jpg',
  'AZ-EXT-001': '/img/products/azura-luxury-exterior-7.jpg',
  'AZ-INT-002': '/img/products/azura-pearl-glow.jpg',
  'AZ-PRM-001': '/img/products/azura-damp-arrestor.jpg',
  'AS-INT-001': '/img/products/asure-radiance.jpg',
  'AS-EXT-001': '/img/products/asure-cleanwalls.jpg',
  'AN-INT-001': '/img/products/anex-advance-interior.jpg',
  'AN-EXT-001': '/img/products/anex-advance-exterior.jpg',
  'AT-INT-001': '/img/products/atop-interior-emulsion.jpg',
  'AT-EXT-001': '/img/products/atop-exterior-emulsion.jpg',
  'AM-PRM-001': '/img/products/atop-interior-primer.jpg',
  'AM-PRM-002': '/img/products/amaje-universal-primer.jpg',
  'AR-WP-001': '/img/products/arest-base-coat.jpg',
  'AR-WP-002': '/img/products/arest-roof-coat.jpg',
  'MT-INT-001': '/img/products/azura-gold-metallica.jpg',
  'AD-INT-001': '/img/products/anex-acrylic-emulsion.jpg',
  'AP-EN-001': '/img/products/azura-luxury-enamel.jpg',
  'AP-FL-001': '/img/products/asure-floor-shield.jpg',
  'AP-RM-001': '/img/products/kerb-coatings.jpg',
  'IND-ZRP-001': '/img/products/industrial-drum-1.png',
  'IND-IZS-001': '/img/products/industrial-drum-1.png',
  'IND-EZP-001': '/img/products/industrial-drum-1.png',
  'IND-MIO-001': '/img/products/industrial-drum-2.png',
  'IND-EHB-001': '/img/products/industrial-drum-2.png',
  'IND-ECT-001': '/img/products/industrial-drum-2.png',
  'IND-APU-001': '/img/products/industrial-drum-1.png',
  'IND-HRA-001': '/img/products/industrial-drum-1.png',
  'IND-STL-001': '/img/products/industrial-drum-1.png',
  'IND-EFL-001': '/img/products/industrial-drum-2.png',
  'IND-DTM-001': '/img/products/industrial-drum-1.png',
  'MAR-EP-001': '/img/products/industrial-drum-2.png',
  'MAR-AF-001': '/img/products/industrial-drum-2.png',
  'MAR-NSD-001': '/img/products/industrial-drum-2.png',
  'RLY-FEVE-001': '/img/products/industrial-drum-1.png',
  'RLY-EPR-001': '/img/products/industrial-drum-1.png',
  'SPL-IFC-001': '/img/products/azura-fire-seal.jpg',
  'SPL-THB-001': '/img/products/industrial-drum-2.png',
  'SPL-PWT-001': '/img/products/industrial-drum-1.png',
};

const slugFallbacks: [string, string][] = [
  ['azura', '/img/products/azura-advance-emulsion.jpg'],
  ['asure', '/img/products/asure-radiance.jpg'],
  ['anex', '/img/products/anex-advance-interior.jpg'],
  ['atop', '/img/products/atop-interior-emulsion.jpg'],
  ['arest', '/img/products/arest-roof-coat.jpg'],
  ['amaje', '/img/products/amaje-universal-primer.jpg'],
  ['pearl', '/img/products/azura-pearl-glow.jpg'],
  ['cleanwalls', '/img/products/asure-cleanwalls.jpg'],
  ['radiance', '/img/products/asure-radiance.jpg'],
  ['metallica', '/img/products/azura-gold-metallica.jpg'],
  ['enamel', '/img/products/azura-luxury-enamel.jpg'],
  ['biowash', '/img/products/azura-biowash.jpg'],
  ['putty', '/img/products/anex-advance-interior.jpg'],
  ['primer', '/img/products/amaje-universal-primer.jpg'],
  ['damp', '/img/products/arest-damp-block-2k.jpg'],
  ['crack', '/img/products/arest-crack-fillers.jpg'],
  ['roof', '/img/products/arest-roof-coat.jpg'],
  ['floor', '/img/products/industrial-drum-2.png'],
  ['kerb', '/img/products/kerb-coatings.jpg'],
  ['epoxy', '/img/products/industrial-drum-2.png'],
  ['zinc', '/img/products/industrial-drum-1.png'],
  ['polyurethane', '/img/products/industrial-drum-1.png'],
  ['fire', '/img/products/azura-fire-seal.jpg'],
  ['heat', '/img/products/industrial-drum-2.png'],
  ['marine', '/img/products/industrial-drum-2.png'],
  ['coal', '/img/products/industrial-drum-2.png'],
  ['glow', '/img/products/industrial-drum-1.png'],
  ['fluorescent', '/img/products/industrial-drum-2.png'],
  ['aluminium', '/img/products/industrial-drum-1.png'],
  ['stoving', '/img/products/industrial-drum-1.png'],
  ['non-skid', '/img/products/industrial-drum-2.png'],
  ['anti-graffiti', '/img/products/industrial-drum-1.png'],
  ['pipeline', '/img/products/industrial-drum-2.png'],
  ['wud', '/img/products/industrial-drum-1.png'],
  ['texture', '/img/products/azura-pearl-glow.jpg'],
  ['food', '/img/products/industrial-drum-1.png'],
  ['water', '/img/products/industrial-drum-1.png'],
  ['mio', '/img/products/industrial-drum-2.png'],
  ['mastic', '/img/products/industrial-drum-2.png'],
  ['dtm', '/img/products/industrial-drum-1.png'],
  ['chlor', '/img/products/industrial-drum-2.png'],
  ['vinyl', '/img/products/industrial-drum-2.png'],
  ['potable', '/img/products/industrial-drum-1.png'],
  ['intumescent', '/img/products/azura-fire-seal.jpg'],
  ['flake', '/img/products/industrial-drum-1.png'],
  ['graphene', '/img/products/industrial-drum-2.png'],
  ['polyurea', '/img/products/industrial-drum-1.png'],
  ['shield', '/img/products/asure-floor-shield.jpg'],
  ['weather', '/img/products/azura-luxury-exterior-7.jpg'],
  ['exterior', '/img/products/azura-luxury-exterior-7.jpg'],
  ['interior', '/img/products/azura-advance-emulsion.jpg'],
  ['luxury', '/img/products/azura-advance-emulsion.jpg'],
  ['premium', '/img/products/azura-advance-emulsion.jpg'],
  ['acrylic', '/img/products/anex-acrylic-emulsion.jpg'],
  ['distemper', '/img/products/anex-acrylic-emulsion.jpg'],
  ['red oxide', '/img/products/anex-red-oxide.jpg'],
];

export function getProductImage(code?: string, slug?: string, name?: string): string | null {
  if (code && imageMap[code]) return imageMap[code];
  if (slug) {
    const lower = slug.toLowerCase();
    for (const [key, img] of slugFallbacks) {
      if (lower.includes(key)) return img;
    }
  }
  // Try product name
  if (name) {
    const lowerName = name.toLowerCase();
    for (const [key, img] of slugFallbacks) {
      if (lowerName.includes(key)) return img;
    }
  }
  // Ultimate fallback
  return '/img/products/azura-advance-emulsion.jpg';
}

export const brandLogos: Record<string, string> = {
  'azura': '/img/logos/azura.jpg',
  'asure': '/img/logos/asure.png',
  'anex': '/img/logos/anex.jpg',
  'atop': '/img/logos/atop.png',
  'amaje': '/img/logos/amaje.png',
  'arest': '/img/logos/arest.jpg',
};

export function getBrandLogo(brandSlug?: string): string | null {
  if (!brandSlug) return null;
  return brandLogos[brandSlug.toLowerCase()] || null;
}
