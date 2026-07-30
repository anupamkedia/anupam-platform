'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowRight, Layers, Shield, Clock, Ruler, Paintbrush, ChevronRight, CheckCircle, AlertTriangle, Factory } from 'lucide-react';

type CoatingLayer = {
  layer: string;
  product: string;
  type: string;
  dft: string;
  coats: string;
  method: string;
  purpose: string;
};

type SolutionData = {
  title: string;
  subtitle: string;
  industry: string;
  icon: string;
  heroImage: string;
  description: string;
  surfacePrep: string[];
  totalDFT: string;
  serviceLife: string;
  standards: string[];
  environment: string;
  layers: CoatingLayer[];
  applications: string[];
  whyAnupam: string[];
};

const solutionsData: Record<string, SolutionData> = {
  'railway-coaches': {
    title: 'Railway Coach Coating System',
    subtitle: 'RDSO / ICF / CLW Approved',
    industry: 'Railways',
    icon: '🚂',
    heroImage: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=1920&q=80',
    description: 'Complete RDSO and ICF approved coating system for railway coach exteriors, interiors, bogies, and underframes. EN 45545 HL3 fire and smoke compliant products for passenger safety.',
    surfacePrep: ['Blast cleaning to Sa 2.5 (ISO 8501-1)', 'Remove all rust, mill scale, and contaminants', 'Surface profile 40-75 microns', 'Apply primer within 4 hours of blasting'],
    totalDFT: '180-250 microns',
    serviceLife: '10-12 years between repaints',
    standards: ['RDSO Specification', 'ICF Specification', 'EN 45545-2 HL3', 'IS 15927'],
    environment: 'C3-C4 (Atmospheric, all weather zones of India)',
    layers: [
      { layer: 'Primer', product: 'Epoxy Zinc Phosphate Primer (RDSO Approved)', type: 'Two-pack epoxy', dft: '35-50 microns', coats: '1', method: 'Airless spray', purpose: 'Anti-corrosive base protection and adhesion to steel substrate' },
      { layer: 'Intermediate', product: 'Epoxy MIO (Micaceous Iron Oxide)', type: 'Two-pack epoxy MIO', dft: '100-125 microns', coats: '1', method: 'Airless spray', purpose: 'Barrier protection with lamellar MIO pigment structure' },
      { layer: 'Topcoat', product: 'FEVE Fluoropolymer Coach Exterior Coating', type: 'FEVE Fluoropolymer', dft: '30-40 microns', coats: '1', method: 'Airless spray', purpose: 'Superior gloss retention, UV resistance, colour stability for 10+ years' },
    ],
    applications: ['LHB coaches', 'ICF coaches', 'Metro coaches', 'EMU/MEMU coaches', 'Locomotive shells', 'Wagon exteriors'],
    whyAnupam: ['35+ years supplying Indian Railways', 'RDSO, ICF, CLW, DMW, RCF, MCF approved', 'EN 45545 HL3 fire-safe products', 'FEVE technology for 10+ year gloss retention', 'Active supply to all major workshops'],
  },
  'railway-bogies': {
    title: 'Bogie & Underframe Coating System',
    subtitle: 'Heavy-Duty Anti-Corrosion',
    industry: 'Railways',
    icon: '🔧',
    heroImage: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1920&q=80',
    description: 'Heavy-duty anti-corrosion coating system for bogies, underframes, and structural components exposed to ballast impact, stone chips, water spray, and mechanical abrasion.',
    surfacePrep: ['Blast cleaning to Sa 2.5', 'Remove grease and oil with solvent cleaning', 'Surface profile 50-75 microns'],
    totalDFT: '200-300 microns',
    serviceLife: '8-10 years',
    standards: ['RDSO Spec', 'ICF Spec', 'IS 15489'],
    environment: 'C4-C5 (Severe - stone chips, water, chemicals)',
    layers: [
      { layer: 'Primer', product: 'Epoxy Zinc-Rich Primer (Organic)', type: 'Zinc-rich epoxy', dft: '60-80 microns', coats: '1', method: 'Airless spray', purpose: 'Cathodic protection with 85% zinc in dry film' },
      { layer: 'Build Coat', product: 'Epoxy High-Build Coating', type: 'High-build epoxy', dft: '125-200 microns', coats: '1-2', method: 'Airless spray', purpose: 'Abrasion and impact resistance for harsh underframe conditions' },
    ],
    applications: ['Bogies (LHB, ICF)', 'Underframes', 'Coupler assemblies', 'Brake gear', 'Structural steel members'],
    whyAnupam: ['Proven at CLW, DMW, MCF workshops', 'Stone chip and impact resistant formulations', 'Fast curing for workshop turnaround'],
  },
  'marine-hull': {
    title: 'Marine Hull Coating System',
    subtitle: 'Indian Navy DQAN Approved',
    industry: 'Marine & Defence',
    icon: '🚢',
    heroImage: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=1920&q=80',
    description: 'Complete hull coating system for naval vessels and commercial ships. Indian Navy DQAN approved with advanced anti-fouling technology for extended dry-docking intervals.',
    surfacePrep: ['Blast cleaning to Sa 2.5 (near-white)', 'Surface profile 50-75 microns', 'Surface must be free from salt contamination (<50 mg/m2)', 'Apply primer within 4 hours'],
    totalDFT: '375-500 microns',
    serviceLife: '5-year dry-docking interval',
    standards: ['Indian Navy DQAN Spec', 'IMO PSPC', 'IS 15489', 'NACE SP0108'],
    environment: 'Im2 (Seawater immersion)',
    layers: [
      { layer: 'Anti-Corrosive Primer', product: 'Marine Epoxy Primer (Navy Approved)', type: 'Two-pack marine epoxy', dft: '125-200 microns', coats: '1-2', method: 'Airless spray', purpose: 'Corrosion protection and cathodic disbondment resistance for underwater hull' },
      { layer: 'Tie Coat', product: 'Epoxy High-Build Coating', type: 'High-build epoxy', dft: '100-150 microns', coats: '1', method: 'Airless spray', purpose: 'Additional barrier and compatibility layer between primer and anti-fouling' },
      { layer: 'Anti-Fouling', product: '2K Silicone-Epoxy Anti-Fouling Coating', type: 'Silicone-epoxy hybrid', dft: '100-150 microns', coats: '1-2', method: 'Airless spray', purpose: 'Biocide-free foul-release — reduces fuel consumption 5-8% through low hull friction' },
    ],
    applications: ['Warships', 'Frigates', 'Corvettes', 'Patrol vessels', 'Submarines (external)', 'Commercial vessels', 'Offshore platforms'],
    whyAnupam: ['Indian Navy approved for 35+ years', 'GRSE, Mazagon Dock, Cochin Shipyard supplier', 'Biocide-free anti-fouling — IMO compliant', '5-year dry-docking intervals'],
  },
  'marine-superstructure': {
    title: 'Superstructure & Deck Coating System',
    subtitle: 'Naval Grey + Safety Systems',
    industry: 'Marine & Defence',
    icon: '⚓',
    heroImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1920&q=80',
    description: 'Complete above-waterline coating system for naval vessel superstructure, decks, and safety areas including naval grey finish, non-skid deck coatings, and photoluminescent safety markings.',
    surfacePrep: ['Blast cleaning to Sa 2.5', 'Power tool cleaning to St 3 for maintenance'],
    totalDFT: '200-300 microns',
    serviceLife: '5-7 years',
    standards: ['Indian Navy Spec', 'IMO Resolution A.752'],
    environment: 'C5-M (Marine atmospheric)',
    layers: [
      { layer: 'Primer', product: 'Marine Epoxy Primer', type: 'Marine epoxy', dft: '75-100 microns', coats: '1', method: 'Airless spray', purpose: 'Anti-corrosive base for salt-spray environment' },
      { layer: 'Intermediate', product: 'Epoxy MIO', type: 'Epoxy MIO', dft: '75-100 microns', coats: '1', method: 'Airless spray', purpose: 'Barrier protection layer' },
      { layer: 'Topcoat', product: 'Naval Grey Paint System', type: 'Aliphatic PU', dft: '40-60 microns', coats: '1', method: 'Airless spray', purpose: 'Naval grey colour match with UV and salt spray resistance' },
    ],
    applications: ['Superstructure panels', 'Mast and radar platforms', 'Helicopter deck', 'Weather decks', 'Interior bulkheads'],
    whyAnupam: ['Exact naval grey shade matching', 'Glow-in-dark and fluorescent safety coatings', 'Non-skid deck epoxy for wet conditions'],
  },
  'structural-steel': {
    title: 'Structural Steel Coating System',
    subtitle: 'PEB, Bridges, Buildings, Industrial Sheds',
    industry: 'Infrastructure',
    icon: '🏗️',
    heroImage: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1920&q=80',
    description: 'Multi-coat anti-corrosion system for structural steel in buildings, PEB structures, bridges, flyovers, and industrial facilities. Designed per ISO 12944 for 15-20 year service life.',
    surfacePrep: ['Blast cleaning to Sa 2.5 (ISO 8501-1)', 'Surface profile 40-75 microns', 'Remove oil/grease with solvent wipe', 'Apply primer within 4 hours of blasting'],
    totalDFT: '250-320 microns',
    serviceLife: '15-20 years in C3-C4 environment',
    standards: ['ISO 12944', 'IS 15489', 'ASTM D3359', 'ASTM B117', 'SSPC-SP10'],
    environment: 'C3-C4 (Atmospheric, urban/industrial)',
    layers: [
      { layer: 'Primer', product: 'Inorganic Zinc Silicate Primer', type: 'Self-curing IZS', dft: '60-75 microns', coats: '1', method: 'Airless spray', purpose: 'Maximum cathodic protection — self-curing, heat resistant up to 400C' },
      { layer: 'Intermediate', product: 'Epoxy MIO (Micaceous Iron Oxide)', type: 'Two-pack epoxy MIO', dft: '100-150 microns', coats: '1-2', method: 'Airless spray', purpose: 'Lamellar barrier protection — moisture and chemical resistance' },
      { layer: 'Topcoat', product: 'Aliphatic Polyurethane Topcoat', type: 'Two-pack aliphatic PU', dft: '40-60 microns', coats: '1', method: 'Airless spray', purpose: 'UV stable, non-yellowing, excellent gloss retention. Any RAL/BS shade.' },
    ],
    applications: ['PEB structures', 'Bridges and flyovers', 'Commercial buildings', 'Industrial sheds', 'Transmission towers', 'Stadiums and large-span structures'],
    whyAnupam: ['10-15% cost advantage over national brands', 'Complete system from one manufacturer', 'On-site technical support', 'EIL approved', 'Supplied to L&T, Tata Projects, Shapoorji Pallonji'],
  },
  'containers': {
    title: 'Container & Freight Coating System',
    subtitle: 'ISO Container and Wagon Protection',
    industry: 'Logistics',
    icon: '📦',
    heroImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1920&q=80',
    description: 'High-performance coating system for shipping containers, freight wagons, and transport equipment exposed to mechanical abuse, weather extremes, and chemical spillage.',
    surfacePrep: ['Blast cleaning to Sa 2.5', 'Surface profile 40-75 microns'],
    totalDFT: '200-280 microns',
    serviceLife: '10-15 years',
    standards: ['ISO 12944', 'IS 15489'],
    environment: 'C4-C5 (Severe industrial/marine)',
    layers: [
      { layer: 'Primer', product: 'Epoxy Zinc Phosphate Primer', type: 'Two-pack epoxy', dft: '35-50 microns', coats: '1', method: 'Airless spray', purpose: 'Anti-corrosive adhesion to blasted steel' },
      { layer: 'Build Coat', product: 'Epoxy High-Build Coating', type: 'High-build epoxy', dft: '125-150 microns', coats: '1', method: 'Airless spray', purpose: 'Impact and abrasion resistance for freight handling' },
      { layer: 'Topcoat', product: 'Aliphatic Polyurethane Topcoat', type: 'Aliphatic PU', dft: '40-60 microns', coats: '1', method: 'Airless spray', purpose: 'Weather and UV resistant finish coat in any RAL shade' },
    ],
    applications: ['ISO shipping containers', 'Freight wagons', 'Tank containers', 'Flat-bed trailers', 'Container chassis'],
    whyAnupam: ['Supplier to Transafe Container Manufacturing', 'Fast turnaround for large batch production', 'Competitive pricing for high-volume orders'],
  },
  'real-estate': {
    title: 'Real Estate & Construction Coating Systems',
    subtitle: 'Residential, Commercial, Premium Projects',
    industry: 'Real Estate',
    icon: '🏢',
    heroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80',
    description: 'Complete decorative and protective coating solutions for residential, commercial, and premium construction projects. From exterior weather protection to luxury interior finishes and waterproofing.',
    surfacePrep: ['Ensure plaster is cured minimum 28 days', 'Fill cracks with Arest Crack Filler', 'Apply primer coat on clean dry surface', 'Use Azura Biowash on repaint surfaces'],
    totalDFT: 'Per product specification',
    serviceLife: 'Up to 15 years with premium range',
    standards: ['IS Specifications', 'IGBC Green Building Compliant', 'Low VOC < 30 ppm'],
    environment: 'Interior and Exterior, all Indian climate zones',
    layers: [
      { layer: 'Surface Prep', product: 'Azura Hi-Efficient Biowash (for repaint)', type: 'Wall cleaning solution', dft: 'N/A', coats: '1', method: 'Spray/Brush', purpose: 'Removes algae, mould, mildew, and contaminants before painting' },
      { layer: 'Primer (Exterior)', product: 'Azura Damp Arrestor Alkali Block Dual Primer', type: 'Water-based dual primer', dft: 'N/A', coats: '1-2', method: 'Brush/Spray', purpose: 'Fiber-reinforced. Blocks alkali, arrests dampness, strengthens surface' },
      { layer: 'Primer (Interior)', product: 'Amaje Universal Primer WT', type: 'Water-based universal', dft: 'N/A', coats: '1-2', method: 'Brush/Spray', purpose: 'Fills porosity, hides stains, levels surface for topcoat' },
      { layer: 'Topcoat (Exterior)', product: 'Azura Exterior Emulsion Long Life Anti Dirt 15', type: 'Premium exterior emulsion', dft: 'N/A', coats: '2', method: 'Brush/Roller/Spray', purpose: '15-year dirt resistance with Polysiloxane + PU hybrid technology' },
      { layer: 'Topcoat (Interior)', product: 'Azura Pearl Glow / Asure CleanWalls', type: 'Luxury interior emulsion', dft: 'N/A', coats: '2-3', method: 'Brush/Roller', purpose: 'Premium silk/sheen finish with washability and colour retention' },
      { layer: 'Waterproofing', product: 'Arest Advance PU RoofCoat + Base Coat', type: 'Elastomeric waterproofing', dft: 'N/A', coats: '3-4', method: 'Brush/Roller', purpose: 'Waterproofing + heat reflection. Reduces temperature by 10C' },
    ],
    applications: ['Residential apartments', 'Villas and bungalows', 'Commercial offices', 'Shopping malls', 'Hotels and hospitality', 'Educational institutions', 'Hospitals'],
    whyAnupam: ['Full decorative range under 6 brands (Azura to Atop)', 'Up to 15 years warranty', 'IGBC Green Building certified', '10-15% cost saving vs Asian Paints/Berger', 'Supplied to Shapoorji Pallonji, Lodha, IndoSpace'],
  },
  'oil-gas': {
    title: 'Oil & Gas Coating Systems',
    subtitle: 'Refineries, Pipelines, Tanks, Offshore',
    industry: 'Oil & Gas',
    icon: '⛽',
    heroImage: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?w=1920&q=80',
    description: 'High-performance coating systems for oil and gas facilities including refineries, pipelines, storage tanks, offshore platforms, and petrochemical plants. Designed for extreme corrosion, chemical, and temperature resistance.',
    surfacePrep: ['Blast cleaning to Sa 2.5 or Sa 3 (ISO 8501-1)', 'Surface profile 50-100 microns per spec', 'Salt contamination test before coating', 'Strict environmental controls during application'],
    totalDFT: '350-1000+ microns (system dependent)',
    serviceLife: '15-25 year design life',
    standards: ['NACE SP0188', 'ISO 12944-9', 'SSPC', 'ASTM B117', 'API Standards'],
    environment: 'CX (Extreme — chemical, immersion, high temp)',
    layers: [
      { layer: 'Primer', product: 'Inorganic Zinc Silicate Primer', type: 'Self-curing IZS', dft: '60-75 microns', coats: '1', method: 'Airless spray', purpose: 'Maximum cathodic protection for structural steel in aggressive environments' },
      { layer: 'Intermediate', product: 'Glass Flake Epoxy Coating', type: 'Glass flake reinforced epoxy', dft: '200-500 microns', coats: '1-2', method: 'Airless spray', purpose: 'Superior barrier properties for chemical and immersion resistance' },
      { layer: 'Topcoat', product: 'Aliphatic Polyurethane Topcoat', type: 'Aliphatic PU', dft: '50-60 microns', coats: '1', method: 'Airless spray', purpose: 'UV stable, chemical resistant finish in safety colour coding' },
    ],
    applications: ['Refineries', 'Petrochemical plants', 'Oil and gas pipelines', 'Storage tanks (external)', 'Offshore platforms and jackets', 'Flare stacks and chimneys', 'LPG cylinders'],
    whyAnupam: ['Complete range from primers to specialty topcoats', 'Glass flake and novolac epoxy for extreme environments', 'Heat resistant coatings up to 600C', 'Supplied to IOCL, HPCL, ONGC facilities', 'EIL approved products'],
  },
  'tank-lining': {
    title: 'Tank Lining Systems',
    subtitle: 'Potable Water, Chemical, Fuel Tanks',
    industry: 'Water & Chemical',
    icon: '💧',
    heroImage: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1920&q=80',
    description: 'Solventless and food-grade lining systems for potable water tanks, fuel storage tanks, chemical tanks, and effluent treatment plants. WRAS and FDA approved for drinking water contact.',
    surfacePrep: ['Blast cleaning to Sa 3 (white metal)', 'Surface profile 50-100 microns', 'Solvent wipe to remove all contamination', 'Strict humidity and temperature controls'],
    totalDFT: '300-800 microns',
    serviceLife: '15-20 years',
    standards: ['WRAS (UK)', 'FDA 21 CFR', 'AWWA C210', 'IS 15489', 'NSF 61'],
    environment: 'Im1/Im2/Im3 (Immersion)',
    layers: [
      { layer: 'Primer', product: 'Solventless Epoxy Tank Lining (self-priming)', type: '100% solids epoxy', dft: '150-250 microns', coats: '1', method: 'Airless spray (heated)', purpose: 'Self-priming — direct application to blasted steel. Zero VOC.' },
      { layer: 'Build/Finish', product: 'Solventless Epoxy Tank Lining', type: '100% solids epoxy', dft: '150-250 microns', coats: '1', method: 'Airless spray (heated)', purpose: 'Seamless, non-porous barrier. WRAS approved for potable water.' },
    ],
    applications: ['Overhead water tanks (OHT)', 'Underground water tanks (UGT)', 'Water treatment plant structures', 'Fuel storage tanks', 'Chemical storage tanks', 'ETP structures', 'Swimming pools'],
    whyAnupam: ['WRAS approved — UK standard for potable water', 'FDA 21 CFR compliant for food contact', 'Zero VOC — 100% solids', 'Supplied to municipal water projects'],
  },
  'fire-protection': {
    title: 'Passive Fire Protection System',
    subtitle: 'Intumescent Coating — Up to 120 Minutes',
    industry: 'Safety',
    icon: '🔥',
    heroImage: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=1920&q=80',
    description: 'FireSeal intumescent fire-retardant coating providing passive fire protection for structural steel. Expands 40-50 times when exposed to fire, forming an insulating carbon char layer that protects steel from reaching critical temperature.',
    surfacePrep: ['Blast cleaning to Sa 2.5', 'Apply compatible anti-corrosive primer first', 'Surface must be dry and free from contamination'],
    totalDFT: '500-3000 microns (fire rating dependent)',
    serviceLife: 'Design life of structure',
    standards: ['BS 476', 'IS 15509', 'ASTM E119', 'EN 13381', 'IS 17044-2018', 'UL 263'],
    environment: 'Interior and exterior (with topcoat for exterior)',
    layers: [
      { layer: 'Primer', product: 'Epoxy Zinc Phosphate Primer', type: 'Anti-corrosive primer', dft: '35-50 microns', coats: '1', method: 'Airless spray', purpose: 'Corrosion protection base compatible with intumescent' },
      { layer: 'Intumescent', product: 'FireSeal Intumescent Fire-Retardant Coating', type: 'Intumescent', dft: '500-3000 microns', coats: 'Multiple', method: 'Airless spray', purpose: 'Expands 40-50x in fire. Forms insulating char. Up to 120-min fire rating.' },
      { layer: 'Topcoat (exterior)', product: 'Aliphatic Polyurethane Topcoat', type: 'Aliphatic PU', dft: '50 microns', coats: '1', method: 'Airless spray', purpose: 'Weather protection for intumescent in exterior applications' },
    ],
    applications: ['I-beams and columns', 'Trusses and purlins', 'Oil and gas facilities', 'Commercial buildings', 'Data centres', 'Airport structures', 'Industrial warehouses'],
    whyAnupam: ['120-minute fire rating tested', 'Salt spray resistance 1000+ hours', 'Conforms to IS 17044-2018, ASTM E119, UL 263', 'Advanced carbon nano-structured technology'],
  },
  'industrial-flooring': {
    title: 'Industrial Flooring Systems',
    subtitle: 'Epoxy, PU, and Polyaspartic Floors',
    industry: 'Industrial',
    icon: '🏭',
    heroImage: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1920&q=80',
    description: 'Seamless, hygienic industrial flooring systems for warehouses, factories, pharmaceutical plants, food processing, and commercial spaces. Chemical resistant, abrasion resistant, and easy to maintain.',
    surfacePrep: ['Diamond grinding or shot blasting of concrete', 'Remove all curing compounds and laitance', 'Fill cracks with epoxy patching compound', 'Moisture content < 4%'],
    totalDFT: '1-5 mm (system dependent)',
    serviceLife: '10-15 years in heavy traffic',
    standards: ['ASTM D4060', 'IS 15477', 'ASTM C1028'],
    environment: 'Industrial floors — chemical, abrasion, impact',
    layers: [
      { layer: 'Primer', product: 'Epoxy Floor Primer (penetrating)', type: 'Low viscosity epoxy', dft: '100-200 microns', coats: '1', method: 'Roller/Squeegee', purpose: 'Penetrates and seals concrete substrate' },
      { layer: 'Body Coat', product: 'Epoxy Self-Levelling Floor Coating (Duraflo)', type: 'Self-levelling epoxy', dft: '1-3 mm', coats: '1', method: 'Notched trowel + roller', purpose: 'Self-levelling seamless finish — chemical and abrasion resistant' },
      { layer: 'Topcoat/Seal', product: 'Polyaspartic Floor Coating', type: 'Polyaspartic', dft: '100-200 microns', coats: '1', method: 'Roller', purpose: 'Fast curing UV stable topcoat — return to service in 4 hours' },
    ],
    applications: ['Warehouses and logistics parks', 'Pharmaceutical plants', 'Food processing', 'Automobile showrooms', 'Parking areas', 'Hospitals and cleanrooms', 'Cold storage'],
    whyAnupam: ['Self-priming Duraflo — single step application', 'Polyaspartic for fast return to service', 'Anti-static and anti-slip options', 'Supplied to IndoSpace, Welspun warehouses'],
  },
  'power-cement': {
    title: 'Power Plant & Cement Plant Coating Systems',
    subtitle: 'High Temperature & Chemical Resistance',
    industry: 'Power & Cement',
    icon: '⚡',
    heroImage: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?w=1920&q=80',
    description: 'Coating systems for power generation and cement manufacturing facilities. Includes high-temperature coatings for stacks and boilers, chemical-resistant systems for FGD units, and general structural steel protection.',
    surfacePrep: ['Blast cleaning to Sa 2.5', 'Surface profile as per product specification'],
    totalDFT: '250-500 microns (ambient temp areas)',
    serviceLife: '15-20 years',
    standards: ['ISO 12944', 'ASTM C411', 'IS 15155'],
    environment: 'CX (Extreme — high temp, chemical, abrasive dust)',
    layers: [
      { layer: 'Primer (ambient)', product: 'Inorganic Zinc Silicate Primer', type: 'Self-curing IZS', dft: '60-75 microns', coats: '1', method: 'Airless spray', purpose: 'Cathodic protection — heat resistant up to 400C' },
      { layer: 'Intermediate', product: 'Epoxy MIO', type: 'Epoxy MIO', dft: '100-150 microns', coats: '1', method: 'Airless spray', purpose: 'Barrier protection' },
      { layer: 'Topcoat', product: 'Aliphatic PU Topcoat', type: 'Aliphatic PU', dft: '50 microns', coats: '1', method: 'Airless spray', purpose: 'UV stable finish' },
      { layer: 'High Temp Areas', product: 'Heat Resistant Aluminium Paint (600C)', type: 'Silicone aluminium', dft: '25-40 microns', coats: '2', method: 'Spray', purpose: 'For stacks, boilers, exhaust ducts up to 600C continuous' },
    ],
    applications: ['Thermal power plants', 'Cement plant structures', 'Boiler casings', 'Exhaust stacks and chimneys', 'Coal handling plants', 'ESP structures', 'Cooling towers'],
    whyAnupam: ['Heat resistant up to 600C', 'Supplied to BHEL, NTPC facilities', 'Complete range from ambient to high-temp', 'Abrasion resistant for dusty environments'],
  },
};

export default function SolutionDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const solution = solutionsData[slug];

  if (!solution) {
    return (
      <div className="section-padding text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Solution Not Found</h2>
        <Link href="/solutions" className="btn-primary">View All Solutions</Link>
      </div>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="relative text-white overflow-hidden min-h-[50vh] flex items-end">
        <img src={solution.heroImage} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-500/95 via-brand-500/70 to-brand-500/30" />
        <div className="container-wide px-4 py-12 relative z-10">
          <div className="flex items-center gap-2 text-brand-200 text-sm mb-4">
            <Link href="/solutions" className="hover:text-white">Solutions</Link><ChevronRight size={14} />
            <span className="text-white">{solution.industry}</span>
          </div>
          <div className="text-5xl mb-3">{solution.icon}</div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{solution.title}</h1>
          <p className="text-brand-200 font-medium">{solution.subtitle}</p>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="bg-white border-b border-gray-100 py-6">
        <div className="container-wide px-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center"><Layers size={20} className="mx-auto text-brand-500 mb-1" /><div className="text-xs text-gray-500">Total DFT</div><div className="font-bold text-gray-800 text-sm">{solution.totalDFT}</div></div>
          <div className="text-center"><Clock size={20} className="mx-auto text-green-500 mb-1" /><div className="text-xs text-gray-500">Service Life</div><div className="font-bold text-gray-800 text-sm">{solution.serviceLife}</div></div>
          <div className="text-center"><Shield size={20} className="mx-auto text-blue-500 mb-1" /><div className="text-xs text-gray-500">Environment</div><div className="font-bold text-gray-800 text-sm">{solution.environment}</div></div>
          <div className="text-center"><Ruler size={20} className="mx-auto text-purple-500 mb-1" /><div className="text-xs text-gray-500">Layers</div><div className="font-bold text-gray-800 text-sm">{solution.layers.length} coat system</div></div>
        </div>
      </section>

      {/* Description */}
      <section className="section-padding bg-white">
        <div className="container-wide max-w-4xl">
          <p className="text-gray-700 text-lg leading-relaxed mb-8">{solution.description}</p>

          {/* Layer-by-layer system */}
          <h2 className="text-2xl font-bold text-brand-500 mb-6 flex items-center gap-2"><Layers size={24} /> Coating System — Layer by Layer</h2>
          <div className="space-y-4 mb-12">
            {solution.layers.map((layer, i) => (
              <div key={i} className="bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-full bg-brand-500 text-white flex items-center justify-center font-bold text-sm">{i + 1}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="badge bg-brand-50 text-brand-600 text-xs font-semibold">{layer.layer}</span>
                      <span className="text-xs text-gray-400">{layer.type}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-1">{layer.product}</h3>
                    <p className="text-sm text-gray-600 mb-3">{layer.purpose}</p>
                    <div className="flex flex-wrap gap-3">
                      <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-lg text-xs font-medium">DFT: {layer.dft}</div>
                      <div className="bg-purple-50 text-purple-700 px-3 py-1 rounded-lg text-xs font-medium">Coats: {layer.coats}</div>
                      <div className="bg-green-50 text-green-700 px-3 py-1 rounded-lg text-xs font-medium">{layer.method}</div>
                    </div>
                  </div>
                </div>
                {i < solution.layers.length - 1 && (
                  <div className="flex justify-center mt-3"><div className="w-0.5 h-4 bg-brand-200" /></div>
                )}
              </div>
            ))}
          </div>

          {/* Surface Preparation */}
          <div className="bg-amber-50 rounded-xl p-6 mb-8">
            <h3 className="font-bold text-amber-800 mb-3 flex items-center gap-2"><AlertTriangle size={20} /> Surface Preparation</h3>
            <ul className="space-y-2">{solution.surfacePrep.map((step, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-amber-900"><CheckCircle size={14} className="text-amber-500 mt-0.5 shrink-0" /> {step}</li>
            ))}</ul>
          </div>

          {/* Standards */}
          <div className="bg-blue-50 rounded-xl p-6 mb-8">
            <h3 className="font-bold text-blue-800 mb-3 flex items-center gap-2"><Shield size={20} /> Applicable Standards</h3>
            <div className="flex flex-wrap gap-2">{solution.standards.map((std, i) => (
              <span key={i} className="bg-white text-blue-700 px-3 py-1.5 rounded-lg text-sm font-medium border border-blue-200">{std}</span>
            ))}</div>
          </div>

          {/* Applications */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><Factory size={20} className="text-brand-500" /> Applications</h3>
              <ul className="space-y-2">{solution.applications.map((app, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-gray-700"><CheckCircle size={14} className="text-green-500" /> {app}</li>
              ))}</ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><Shield size={20} className="text-brand-500" /> Why Anupam Paints</h3>
              <ul className="space-y-2">{solution.whyAnupam.map((point, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-gray-700"><CheckCircle size={14} className="text-brand-500" /> {point}</li>
              ))}</ul>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-brand-500 to-brand-700 rounded-2xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-3">Need This Coating System?</h3>
            <p className="text-brand-200 mb-6">Our technical team will prepare a detailed specification and competitive quotation for your project.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/contact" className="bg-white text-brand-500 font-bold px-6 py-3 rounded-lg hover:bg-gray-100 transition">Request Specification</Link>
              <a href="tel:03322651204" className="border-2 border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/10 transition">Call: 033-22651204</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
