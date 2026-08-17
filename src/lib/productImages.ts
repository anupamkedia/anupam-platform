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
  'IND-ZRP-001': '/img/products/epoxy-zinc-rich.jpg',
  'IND-IZS-001': '/img/products/epoxy-zinc-rich.jpg',
  'IND-EZP-001': '/img/products/epoxy-zinc-rich.jpg',
  'IND-MIO-001': '/img/products/epoxy-pu-paint.jpg',
  'IND-EHB-001': '/img/products/epoxy-pu-paint.jpg',
  'IND-ECT-001': '/img/products/coal-tar-coating.jpg',
  'IND-APU-001': '/img/products/polyurethane-paint.jpg',
  'IND-HRA-001': '/img/products/azura-aluminium-paint.jpg',
  'IND-STL-001': '/img/products/food-grade-epoxy.jpg',
  'IND-EFL-001': '/img/products/duraflo.jpg',
  'IND-DTM-001': '/img/products/stoving-enamel.jpg',
  'MAR-EP-001': '/img/products/epoxy-pu-paint.jpg',
  'MAR-AF-001': '/img/products/pipeline-coatings.jpg',
  'MAR-NSD-001': '/img/products/epoxy-non-skid.jpg',
  'RLY-FEVE-001': '/img/products/polyurethane-paint.jpg',
  'RLY-EPR-001': '/img/products/epoxy-zinc-rich.jpg',
  'SPL-IFC-001': '/img/products/azura-fire-seal.jpg',
  'SPL-THB-001': '/img/products/azura-heatshield.jpg',
  'SPL-PWT-001': '/img/products/food-grade-epoxy.jpg',
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
  ['floor', '/img/products/duraflo.jpg'],
  ['kerb', '/img/products/kerb-coatings.jpg'],
  ['epoxy', '/img/products/epoxy-pu-paint.jpg'],
  ['zinc', '/img/products/epoxy-zinc-rich.jpg'],
  ['polyurethane', '/img/products/polyurethane-paint.jpg'],
  ['fire', '/img/products/azura-fire-seal.jpg'],
  ['heat', '/img/products/azura-heatshield.jpg'],
  ['marine', '/img/products/pipeline-coatings.jpg'],
  ['coal', '/img/products/coal-tar-coating.jpg'],
  ['glow', '/img/products/glow-in-dark.jpg'],
  ['fluorescent', '/img/products/fluorescent-paints.jpg'],
  ['aluminium', '/img/products/azura-aluminium-paint.jpg'],
  ['stoving', '/img/products/stoving-enamel.jpg'],
  ['non-skid', '/img/products/epoxy-non-skid.jpg'],
  ['anti-graffiti', '/img/products/anti-graffiti.jpg'],
  ['pipeline', '/img/products/pipeline-coatings.jpg'],
  ['wud', '/img/products/azura-wud-glaze.jpg'],
  ['texture', '/img/products/azura-pearl-glow.jpg'],
  ['food', '/img/products/food-grade-epoxy.jpg'],
  ['water', '/img/products/food-grade-epoxy.jpg'],
  ['mio', '/img/products/epoxy-pu-paint.jpg'],
  ['mastic', '/img/products/epoxy-pu-paint.jpg'],
  ['dtm', '/img/products/stoving-enamel.jpg'],
  ['chlor', '/img/products/epoxy-pu-paint.jpg'],
  ['vinyl', '/img/products/epoxy-pu-paint.jpg'],
  ['potable', '/img/products/food-grade-epoxy.jpg'],
  ['intumescent', '/img/products/azura-fire-seal.jpg'],
  ['flake', '/img/products/epoxy-zinc-rich.jpg'],
  ['graphene', '/img/products/epoxy-pu-paint.jpg'],
  ['polyurea', '/img/products/polyurethane-paint.jpg'],
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
