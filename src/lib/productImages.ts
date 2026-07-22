// Maps product codes to actual pack shot images in /img/products/
const imageMap: Record<string, string> = {
  // DECORATIVE - AZURA
  'AZ-INT-001': '/img/products/azura-advance-emulsion.jpg',
  'AZ-EXT-001': '/img/products/azura-luxury-exterior-7.jpg',
  'AZ-INT-002': '/img/products/azura-pearl-glow.jpg',
  'AZ-PRM-001': '/img/products/azura-damp-arrestor.jpg',
  // ASURE
  'AS-INT-001': '/img/products/asure-radiance.jpg',
  'AS-EXT-001': '/img/products/asure-cleanwalls.jpg',
  // ANEX
  'AN-INT-001': '/img/products/anex-advance-interior.jpg',
  'AN-EXT-001': '/img/products/anex-advance-exterior.jpg',
  // ATOP
  'AT-INT-001': '/img/products/atop-interior-emulsion.jpg',
  'AT-EXT-001': '/img/products/atop-exterior-emulsion.jpg',
  // AMAJE
  'AM-PRM-001': '/img/products/atop-interior-primer.jpg',
  'AM-PRM-002': '/img/products/amaje-universal-primer.jpg',
  // AREST
  'AR-WP-001': '/img/products/arest-base-coat.jpg',
  'AR-WP-002': '/img/products/arest-roof-coat.jpg',
  // METALLICA
  'MT-INT-001': '/img/products/azura-gold-metallica.jpg',
  // ADVANCE
  'AD-INT-001': '/img/products/anex-acrylic-emulsion.jpg',
  // ENAMEL
  'AP-EN-001': '/img/products/azura-luxury-enamel.jpg',
  // FLOOR
  'AP-FL-001': '/img/products/asure-floor-shield.jpg',
  // ROAD MARKING
  'AP-RM-001': '/img/products/kerb-coatings.jpg',

  // INDUSTRIAL
  'IND-ZRP-001': '/img/products/epoxy-zinc-rich.jpg',
  'IND-IZS-001': '/img/products/epoxy-zinc-rich.jpg',
  'IND-EZP-001': '/img/products/epoxy-zinc-rich.jpg',
  'IND-MIO-001': '/img/products/epoxy-pu-paint.jpg',
  'IND-EHB-001': '/img/products/epoxy-pu-paint.jpg',
  'IND-ECT-001': '/img/products/coal-tar-coating.jpg',
  'IND-GFE-001': '/img/products/epoxy-pu-paint.jpg',
  'IND-APU-001': '/img/products/polyurethane-paint.jpg',
  'IND-HRA-001': '/img/products/azura-aluminium-paint.jpg',
  'IND-NOV-001': '/img/products/epoxy-pu-paint.jpg',
  'IND-STL-001': '/img/products/food-grade-epoxy.jpg',
  'IND-EFL-001': '/img/products/duraflo.jpg',
  'IND-PAF-001': '/img/products/duraflo.jpg',
  'IND-DTM-001': '/img/products/stoving-enamel.jpg',
  'IND-CRC-001': '/img/products/epoxy-positive-water.jpg',

  // MARINE
  'MAR-EP-001': '/img/products/epoxy-pu-paint.jpg',
  'MAR-AF-001': '/img/products/pipeline-coatings.jpg',
  'MAR-NSD-001': '/img/products/epoxy-non-skid.jpg',
  'MAR-NGP-001': '/img/products/polyurethane-paint.jpg',
  'MAR-BTC-001': '/img/products/coal-tar-coating.jpg',
  'MAR-GID-001': '/img/products/glow-in-dark.jpg',
  'MAR-FLR-001': '/img/products/fluorescent-paints.jpg',

  // RAILWAY
  'RLY-FEVE-001': '/img/products/polyurethane-paint.jpg',
  'RLY-EPR-001': '/img/products/epoxy-zinc-rich.jpg',
  'RLY-PUT-001': '/img/products/polyurethane-paint.jpg',
  'RLY-BUF-001': '/img/products/epoxy-pu-paint.jpg',
  'RLY-INT-001': '/img/products/stoving-enamel.jpg',
  'RLY-HRC-001': '/img/products/azura-heatshield.jpg',
  'RLY-ZFC-001': '/img/products/epoxy-zinc-rich.jpg',

  // SPECIALTY
  'SPL-IFC-001': '/img/products/azura-fire-seal.jpg',
  'SPL-THB-001': '/img/products/azura-heatshield.jpg',
  'SPL-NGC-001': '/img/products/anti-graffiti.jpg',
  'SPL-PWT-001': '/img/products/food-grade-epoxy.jpg',
  'SPL-PUA-001': '/img/products/epoxy-pu-paint.jpg',
  'SPL-AGC-001': '/img/products/anti-graffiti.jpg',
  'SPL-PUC-001': '/img/products/polyurethane-paint.jpg',
};

const slugFallbacks: [string, string][] = [
  ['azura', '/img/products/azura-advance-emulsion.jpg'],
  ['asure', '/img/products/asure-radiance.jpg'],
  ['anex', '/img/products/anex-advance-interior.jpg'],
  ['atop', '/img/products/atop-interior-emulsion.jpg'],
  ['arest', '/img/products/arest-roof-coat.jpg'],
  ['epoxy', '/img/products/epoxy-pu-paint.jpg'],
  ['zinc', '/img/products/epoxy-zinc-rich.jpg'],
  ['polyurethane', '/img/products/polyurethane-paint.jpg'],
  ['fire', '/img/products/azura-fire-seal.jpg'],
  ['heat', '/img/products/azura-heatshield.jpg'],
  ['floor', '/img/products/duraflo.jpg'],
  ['marine', '/img/products/pipeline-coatings.jpg'],
  ['coal', '/img/products/coal-tar-coating.jpg'],
  ['glow', '/img/products/glow-in-dark.jpg'],
];

export function getProductImage(code?: string, slug?: string): string | null {
  if (code && imageMap[code]) return imageMap[code];
  if (slug) {
    const lower = slug.toLowerCase();
    for (const [key, img] of slugFallbacks) {
      if (lower.includes(key)) return img;
    }
  }
  return null;
}

// Brand slug to logo mapping
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
