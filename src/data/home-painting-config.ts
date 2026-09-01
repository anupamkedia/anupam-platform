/* ============================================================================
   ANUPAM PAINTS — home painting cost model
   ----------------------------------------------------------------------------
   EDIT THIS FILE for the estimating rules. Prices and labour rates are NOT
   here — they live in Supabase and are edited at /admin/pricing and
   /admin/labour, so you can change them without a developer.

   While a price or rate is 0, the tool shows QUANTITIES and the repaint
   comparison but prints no rupee figure for that line. It will not publish a
   number it cannot stand behind.
   ========================================================================== */

/* WALL area only, net of doors and windows, for a standard 10 ft ceiling.

   Note the trap: the "3.2 times carpet area" figure quoted around the trade
   generally INCLUDES ceilings. Using 3.2 for walls and then adding ceilings
   separately over-counts by roughly a fifth, which on a 2 BHK is about 700
   sq ft of paint that will never be applied.

   2.5 for walls plus 1.0 for ceilings gives 3.5 combined, which matches the
   upper end of the trade rule and reconciles with a physical check:
   a 700 sq ft flat has roughly 180 to 220 ft of wall run at 10 ft high,
   less about 15% for openings.

   Adjust if your site measurements say otherwise — this single number moves
   every quantity on the page. */
export const WALL_AREA_FACTOR = 2.5;
export const CEILING_FACTOR = 1.0;

export interface HomeSize { key: string; label: string; carpetSqft: number }

export const HOME_SIZES: HomeSize[] = [
  { key: '1bhk',  label: '1 BHK',            carpetSqft: 450 },
  { key: '2bhk',  label: '2 BHK',            carpetSqft: 700 },
  { key: '3bhk',  label: '3 BHK',            carpetSqft: 1100 },
  { key: '4bhk',  label: '4 BHK',            carpetSqft: 1600 },
  { key: 'villa', label: 'Villa / bungalow', carpetSqft: 2400 },
  { key: 'custom',label: 'I know my area',   carpetSqft: 0 },
];

/* Decorative ladder. productKey must exist in coating-systems PRODUCTS, so a
   volume solids correction at /admin/pricing flows through to this tool too.

   lifeYears is the realistic repaint interval in Indian conditions. These
   drive the "cheap paint costs more" comparison, so they matter — adjust
   them to what you actually see in the field. */
export interface Tier {
  key: string; brand: string; position: string;
  interior: string; exterior: string;
  lifeYearsInterior: number; lifeYearsExterior: number;
  blurb: string;
}

export const TIERS: Tier[] = [
  { key: 'azura', brand: 'Azura', position: 'Luxury',
    interior: 'AZLUX', exterior: 'AZEXT',
    lifeYearsInterior: 7, lifeYearsExterior: 9,
    blurb: 'Richest finish, best washability, longest life on the wall.' },
  { key: 'asure', brand: 'Asure', position: 'Premium',
    interior: 'ASINT', exterior: 'ASEXT',
    lifeYearsInterior: 5, lifeYearsExterior: 7,
    blurb: 'Strong stain resistance for living areas and bedrooms.' },
  { key: 'anex', brand: 'Anex', position: 'Mainstream',
    interior: 'ANEXINT', exterior: 'ANEXEXT',
    lifeYearsInterior: 4, lifeYearsExterior: 5,
    blurb: 'Everyday emulsion balancing finish and value.' },
  { key: 'atop', brand: 'Atop', position: 'Economy',
    interior: 'ATOPINT', exterior: 'ANEXEXT',
    lifeYearsInterior: 2, lifeYearsExterior: 3,
    blurb: 'Lowest cost, for rentals and quick refreshes.' },
];

/* Nominal dry film per coat, in microns, used with each product's volume
   solids to derive coverage. Emulsions are applied thinner than industrial
   coatings; these are the figures that make coverage come out at the
   familiar 130 to 150 sq ft per litre per coat. */
export const DFT_PER_COAT = {
  interior: 30,
  exterior: 35,
  primer: 30,
  putty: 0,        // putty is quoted by weight, not litres — see below
};

export const COATS = { interior: 2, exterior: 2, primer: 1 };

/* Putty is bought by the kilo and Anupam does not manufacture it, so it is
   estimated separately and flagged as a third-party item. */
export const PUTTY_KG_PER_100_SQFT = 12;

export interface Surface { key: string; label: string; note: string }

export const SURFACES: Surface[] = [
  { key: 'interiorWalls', label: 'Interior walls', note: 'The largest area in most homes' },
  { key: 'ceilings',      label: 'Ceilings',       note: 'Usually the same paint in a lighter shade' },
  { key: 'exteriorWalls', label: 'Exterior walls', note: 'Priced separately — different paint, different labour' },
  { key: 'woodMetal',     label: 'Doors, windows, grills', note: 'Enamel or PU, quoted per running work' },
];

export type Condition = 'fresh' | 'repaintGood' | 'repaintDamaged';

export const CONDITIONS: Record<Condition, { label: string; note: string; puttyNeeded: boolean; primerCoats: number }> = {
  fresh:          { label: 'New construction',
                    note: 'Bare plaster. Needs putty and primer before any paint.',
                    puttyNeeded: true,  primerCoats: 1 },
  repaintGood:    { label: 'Repaint, walls in good condition',
                    note: 'Sound existing paint. Light sanding, primer only where needed.',
                    puttyNeeded: false, primerCoats: 1 },
  repaintDamaged: { label: 'Repaint, walls damaged or damp',
                    note: 'Peeling, cracks or damp patches. Needs scraping, repair and full re-priming.',
                    puttyNeeded: true,  primerCoats: 1 },
};

export const WHATSAPP = '919831728605';
