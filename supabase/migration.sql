-- ============================================================
-- ANUPAM PAINTS — COMPLETE DATABASE SCHEMA
-- Run this in Supabase SQL Editor
-- ============================================================

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================
-- CORE: ROLES & PERMISSIONS
-- ============================================================
CREATE TABLE public.roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  permissions JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO public.roles (name, description) VALUES
  ('super_admin', 'Full unrestricted access'),
  ('director', 'Full read, approval authority'),
  ('website_admin', 'CMS content management'),
  ('sales_head', 'All sales data and team management'),
  ('regional_manager', 'Region-level sales and team'),
  ('area_manager', 'Area-level sales and dealers'),
  ('sales_officer', 'Own territory data'),
  ('technical_service', 'Complaints and technical visits'),
  ('marketing', 'Blog, creatives, campaigns'),
  ('accounts', 'Payment and financial data'),
  ('dispatch', 'Order dispatch and logistics'),
  ('customer_care', 'Complaints and enquiries'),
  ('warranty_team', 'Warranty management'),
  ('hr', 'Employee management'),
  ('dealer', 'Dealer portal access'),
  ('distributor', 'Distributor portal access'),
  ('painter', 'Painter portal access'),
  ('contractor', 'Contractor portal access'),
  ('institutional_customer', 'Institutional customer portal'),
  ('retail_customer', 'Retail customer portal');

-- ============================================================
-- CORE: USER PROFILES
-- ============================================================
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  phone TEXT,
  first_name TEXT,
  last_name TEXT,
  avatar_url TEXT,
  role_id UUID REFERENCES public.roles(id),
  status TEXT DEFAULT 'active' CHECK (status IN ('active','suspended','pending')),
  two_factor_enabled BOOLEAN DEFAULT FALSE,
  last_login TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- CORE: TERRITORIES
-- ============================================================
CREATE TABLE public.territories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  type TEXT CHECK (type IN ('country','state','region','area','district','city')),
  parent_id UUID REFERENCES public.territories(id),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- CORE: AUDIT LOGS
-- ============================================================
CREATE TABLE public.audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id),
  action TEXT NOT NULL,
  module TEXT,
  record_id UUID,
  old_values JSONB,
  new_values JSONB,
  ip_address TEXT,
  device_info TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- PRODUCTS
-- ============================================================
CREATE TABLE public.product_divisions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  tagline TEXT,
  image_url TEXT,
  icon TEXT,
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  meta_title TEXT,
  meta_description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.product_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  division_id UUID REFERENCES public.product_divisions(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(division_id, slug)
);

CREATE TABLE public.product_brands (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  tagline TEXT,
  logo_url TEXT,
  description TEXT,
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID REFERENCES public.product_categories(id) ON DELETE SET NULL,
  brand_id UUID REFERENCES public.product_brands(id) ON DELETE SET NULL,
  division_id UUID REFERENCES public.product_divisions(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  code TEXT,
  short_description TEXT,
  description TEXT,
  features JSONB DEFAULT '[]',
  usage_areas TEXT,
  surface_prep TEXT,
  application_method TEXT,
  dft_min NUMERIC,
  dft_max NUMERIC,
  dft_unit TEXT DEFAULT 'microns',
  coverage_rate TEXT,
  coverage_unit TEXT,
  volume_solids NUMERIC,
  pack_sizes JSONB DEFAULT '[]',
  shade_options JSONB DEFAULT '[]',
  voc_content TEXT,
  standards JSONB DEFAULT '[]',
  warranty_years INT,
  warranty_terms TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  meta_title TEXT,
  meta_description TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.product_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  alt_text TEXT,
  is_primary BOOLEAN DEFAULT FALSE,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.product_documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  doc_type TEXT CHECK (doc_type IN ('tds','msds','brochure','certificate','datasheet')),
  title TEXT,
  file_url TEXT NOT NULL,
  version TEXT DEFAULT '1.0',
  is_gated BOOLEAN DEFAULT FALSE,
  download_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.product_finder_rules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  surface_types JSONB DEFAULT '[]',
  environments JSONB DEFAULT '[]',
  performance_needs JSONB DEFAULT '[]',
  industries JSONB DEFAULT '[]',
  priority INT DEFAULT 0
);

-- ============================================================
-- SOLUTIONS / COATING SYSTEMS
-- ============================================================
CREATE TABLE public.solutions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  industry TEXT,
  icon TEXT,
  problem_statement TEXT,
  total_dft TEXT,
  application_method TEXT,
  expected_performance TEXT,
  standards TEXT,
  spec_pdf_url TEXT,
  image_url TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  meta_title TEXT,
  meta_description TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.solution_layers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  solution_id UUID REFERENCES public.solutions(id) ON DELETE CASCADE,
  layer_order INT NOT NULL,
  layer_type TEXT CHECK (layer_type IN ('surface_prep','primer','intermediate','topcoat','sealer')),
  product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  product_name TEXT,
  dft TEXT,
  coats INT DEFAULT 1,
  notes TEXT
);

-- ============================================================
-- CMS: PAGES, BANNERS, MENUS
-- ============================================================
CREATE TABLE public.pages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  template TEXT DEFAULT 'default',
  content JSONB DEFAULT '[]',
  meta_title TEXT,
  meta_description TEXT,
  meta_keywords TEXT,
  og_image TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft','published','scheduled','archived')),
  publish_at TIMESTAMPTZ,
  expire_at TIMESTAMPTZ,
  version INT DEFAULT 1,
  created_by UUID REFERENCES public.profiles(id),
  updated_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.page_versions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page_id UUID REFERENCES public.pages(id) ON DELETE CASCADE,
  version INT NOT NULL,
  content JSONB,
  changed_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.banners (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT,
  subtitle TEXT,
  image_url TEXT,
  mobile_image_url TEXT,
  cta_text TEXT,
  cta_url TEXT,
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.menus (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  location TEXT NOT NULL UNIQUE,
  items JSONB DEFAULT '[]',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- APPROVALS & CERTIFICATIONS
-- ============================================================
CREATE TABLE public.approvals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  category TEXT,
  description TEXT,
  logo_url TEXT,
  certificate_url TEXT,
  reference_number TEXT,
  valid_from DATE,
  valid_until DATE,
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- CLIENTS & CASE STUDIES
-- ============================================================
CREATE TABLE public.clients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  sector TEXT,
  logo_url TEXT,
  website TEXT,
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.case_studies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  client_id UUID REFERENCES public.clients(id),
  location TEXT,
  challenge TEXT,
  solution TEXT,
  result TEXT,
  products_used JSONB DEFAULT '[]',
  images JSONB DEFAULT '[]',
  testimonial_quote TEXT,
  testimonial_author TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TESTIMONIALS
-- ============================================================
CREATE TABLE public.testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  company TEXT,
  designation TEXT,
  location TEXT,
  category TEXT CHECK (category IN ('industrial','government','dealer','contractor','decorative','applicator')),
  product_used TEXT,
  rating INT CHECK (rating BETWEEN 1 AND 5),
  feedback TEXT NOT NULL,
  photo_url TEXT,
  is_approved BOOLEAN DEFAULT FALSE,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- BLOG
-- ============================================================
CREATE TABLE public.blog_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT,
  excerpt TEXT,
  featured_image TEXT,
  category_id UUID REFERENCES public.blog_categories(id),
  tags JSONB DEFAULT '[]',
  author_id UUID REFERENCES public.profiles(id),
  author_name TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft','published','scheduled','archived')),
  publish_at TIMESTAMPTZ,
  views INT DEFAULT 0,
  meta_title TEXT,
  meta_description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- MEDIA LIBRARY
-- ============================================================
CREATE TABLE public.media (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  filename TEXT NOT NULL,
  original_filename TEXT,
  file_type TEXT,
  file_size INT,
  url TEXT NOT NULL,
  thumbnail_url TEXT,
  folder TEXT DEFAULT 'general',
  alt_text TEXT,
  tags JSONB DEFAULT '[]',
  uploaded_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- ENQUIRIES & LEADS
-- ============================================================
CREATE TABLE public.enquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  source TEXT DEFAULT 'website',
  name TEXT NOT NULL,
  company TEXT,
  phone TEXT,
  email TEXT,
  enquiry_type TEXT,
  message TEXT,
  page_url TEXT,
  product_interest TEXT,
  assigned_to UUID REFERENCES public.profiles(id),
  status TEXT DEFAULT 'new' CHECK (status IN ('new','contacted','qualified','converted','closed')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.tds_downloads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  company TEXT,
  phone TEXT,
  email TEXT,
  enquiry_type TEXT,
  document_id UUID REFERENCES public.product_documents(id),
  product_id UUID REFERENCES public.products(id),
  downloaded_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- DEALERS
-- ============================================================
CREATE TABLE public.dealers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id),
  dealer_code TEXT UNIQUE,
  firm_name TEXT NOT NULL,
  contact_person TEXT,
  phone TEXT,
  email TEXT,
  gst_number TEXT,
  address TEXT,
  city TEXT,
  district TEXT,
  state TEXT,
  pin_code TEXT,
  gps_lat NUMERIC,
  gps_lng NUMERIC,
  assigned_employee_id UUID REFERENCES public.profiles(id),
  distributor_id UUID,
  credit_limit NUMERIC DEFAULT 0,
  territory_id UUID REFERENCES public.territories(id),
  product_categories JSONB DEFAULT '[]',
  display_status TEXT DEFAULT 'pending',
  loyalty_tier TEXT DEFAULT 'silver',
  loyalty_points INT DEFAULT 0,
  status TEXT DEFAULT 'active',
  onboarded_at DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.dealer_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  firm_name TEXT NOT NULL,
  contact_person TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  city TEXT,
  state TEXT,
  gst_number TEXT,
  current_brands TEXT,
  expected_volume TEXT,
  product_interest TEXT,
  status TEXT DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- PAINTERS
-- ============================================================
CREATE TABLE public.painters (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id),
  painter_code TEXT UNIQUE,
  name TEXT NOT NULL,
  mobile TEXT,
  photo_url TEXT,
  address TEXT,
  city TEXT,
  district TEXT,
  state TEXT,
  pin_code TEXT,
  gps_lat NUMERIC,
  gps_lng NUMERIC,
  experience_years INT,
  specialisation TEXT,
  dealer_ref_id UUID REFERENCES public.dealers(id),
  employee_ref_id UUID REFERENCES public.profiles(id),
  preferred_language TEXT DEFAULT 'en',
  training_status TEXT DEFAULT 'not_started',
  loyalty_tier TEXT DEFAULT 'bronze',
  loyalty_points INT DEFAULT 0,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- EMPLOYEES & SFA
-- ============================================================
CREATE TABLE public.employees (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id),
  employee_code TEXT UNIQUE,
  designation TEXT,
  department TEXT,
  reporting_manager_id UUID REFERENCES public.employees(id),
  territory_id UUID REFERENCES public.territories(id),
  targets JSONB DEFAULT '{}',
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.attendance (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id UUID REFERENCES public.employees(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  check_in_time TIMESTAMPTZ,
  check_out_time TIMESTAMPTZ,
  check_in_lat NUMERIC,
  check_in_lng NUMERIC,
  check_out_lat NUMERIC,
  check_out_lng NUMERIC,
  check_in_selfie TEXT,
  location_type TEXT DEFAULT 'field',
  working_hours NUMERIC,
  status TEXT DEFAULT 'present',
  manager_approval BOOLEAN,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.dealer_visits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  dealer_id UUID REFERENCES public.dealers(id),
  employee_id UUID REFERENCES public.employees(id),
  visit_date DATE NOT NULL,
  check_in_time TIMESTAMPTZ,
  check_out_time TIMESTAMPTZ,
  gps_lat NUMERIC,
  gps_lng NUMERIC,
  photos JSONB DEFAULT '[]',
  stock_audit JSONB DEFAULT '[]',
  competitor_info JSONB DEFAULT '[]',
  feedback TEXT,
  outstanding_amount NUMERIC,
  order_requirement TEXT,
  follow_up_date DATE,
  next_action TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  source TEXT DEFAULT 'field',
  employee_id UUID REFERENCES public.employees(id),
  contact_name TEXT NOT NULL,
  company TEXT,
  phone TEXT,
  email TEXT,
  lead_type TEXT,
  products_required JSONB DEFAULT '[]',
  lead_value NUMERIC,
  stage TEXT DEFAULT 'new',
  probability INT,
  expected_closure DATE,
  competitors JSONB DEFAULT '[]',
  loss_reason TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- COMPLAINTS
-- ============================================================
CREATE TABLE public.complaints (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  complaint_number TEXT UNIQUE,
  complainant_type TEXT,
  complainant_name TEXT,
  complainant_phone TEXT,
  complainant_email TEXT,
  dealer_id UUID REFERENCES public.dealers(id),
  product_id UUID REFERENCES public.products(id),
  batch_number TEXT,
  invoice_number TEXT,
  purchase_date DATE,
  category TEXT,
  severity TEXT DEFAULT 'medium',
  description TEXT NOT NULL,
  photos JSONB DEFAULT '[]',
  assigned_to UUID REFERENCES public.employees(id),
  root_cause TEXT,
  corrective_action TEXT,
  closure_report TEXT,
  status TEXT DEFAULT 'open',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- WARRANTIES
-- ============================================================
CREATE TABLE public.warranty_registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  registration_number TEXT UNIQUE,
  product_id UUID REFERENCES public.products(id),
  customer_name TEXT,
  customer_phone TEXT,
  customer_email TEXT,
  dealer_id UUID REFERENCES public.dealers(id),
  painter_id UUID REFERENCES public.painters(id),
  invoice_url TEXT,
  batch_number TEXT,
  surface_type TEXT,
  area_sqft NUMERIC,
  system_applied JSONB DEFAULT '{}',
  coats INT,
  application_date DATE,
  site_photos JSONB DEFAULT '[]',
  warranty_years INT,
  warranty_start DATE,
  warranty_end DATE,
  certificate_url TEXT,
  qr_code TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- LOYALTY & CAMPAIGNS
-- ============================================================
CREATE TABLE public.loyalty_points (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id),
  user_type TEXT,
  event_type TEXT,
  event_id UUID,
  points INT NOT NULL,
  status TEXT DEFAULT 'pending',
  expires_at TIMESTAMPTZ,
  approved_by UUID,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.campaigns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  target_audience JSONB DEFAULT '{}',
  products JSONB DEFAULT '[]',
  criteria JSONB DEFAULT '{}',
  point_rules JSONB DEFAULT '{}',
  reward JSONB DEFAULT '{}',
  start_date DATE,
  end_date DATE,
  budget NUMERIC,
  budget_used NUMERIC DEFAULT 0,
  status TEXT DEFAULT 'draft',
  terms TEXT,
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- QUOTATIONS
-- ============================================================
CREATE TABLE public.quotations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  quotation_number TEXT UNIQUE,
  contact_name TEXT,
  contact_company TEXT,
  contact_phone TEXT,
  contact_email TEXT,
  prepared_by UUID REFERENCES public.profiles(id),
  items JSONB DEFAULT '[]',
  subtotal NUMERIC,
  tax NUMERIC,
  total NUMERIC,
  terms JSONB DEFAULT '[]',
  validity_days INT DEFAULT 30,
  version INT DEFAULT 1,
  status TEXT DEFAULT 'draft',
  pdf_url TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- NOTIFICATIONS
-- ============================================================
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id),
  title TEXT NOT NULL,
  message TEXT,
  channel TEXT DEFAULT 'dashboard',
  related_type TEXT,
  related_id UUID,
  is_read BOOLEAN DEFAULT FALSE,
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- SITE SETTINGS
-- ============================================================
CREATE TABLE public.site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT NOT NULL UNIQUE,
  value JSONB,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default settings
INSERT INTO public.site_settings (key, value) VALUES
  ('company', '{"name":"Anupam Paints","tagline":"Engineering Coatings. Protecting Assets. Beautifying Spaces.","established":"1972","capacity":"1000 KL/Month","facility_area":"5 Acres"}'),
  ('contact', '{"head_office":"113 Park Street, Poddar Point, Kolkata – 700064","factory":"Ranihati, Howrah, West Bengal","phone":"+91-XXXXXXXXXX","email":"info@anupampaints.com","whatsapp":"+91-XXXXXXXXXX"}'),
  ('social', '{"linkedin":"","facebook":"","instagram":"","youtube":"","twitter":""}'),
  ('seo', '{"default_title":"Anupam Paints — Industrial, Decorative & Specialty Coatings Manufacturer Since 1972","default_description":"India''s trusted manufacturer of industrial, decorative, marine, railway, and specialty coatings. 50+ years of excellence. ISO certified. Government approved."}');

-- ============================================================
-- SEED: PRODUCT DIVISIONS
-- ============================================================
INSERT INTO public.product_divisions (name, slug, description, tagline, icon, sort_order) VALUES
  ('Decorative & Architectural', 'decorative', 'Interior, exterior, and specialty decorative products for homes, offices, and institutions.', 'Creating Memories', 'Palette', 1),
  ('Industrial Protective', 'industrial', 'High-performance anti-corrosion and protective coating systems for steel, concrete, and industrial assets.', 'Protection Engineered', 'Shield', 2),
  ('Marine & Defence', 'marine', 'Specialised coating systems for naval vessels, shipyards, and defence applications.', 'Defending the Fleet', 'Anchor', 3),
  ('Railway', 'railway', 'RDSO/ICF/CLW approved coating systems for coaches, bogies, underframes, and railway infrastructure.', 'Coating the Backbone of India', 'Train', 4),
  ('Specialty', 'specialty', 'Fire-retardant, thermal barrier, potable water, and advanced technology coatings.', 'Beyond Ordinary', 'Sparkles', 5);

-- ============================================================
-- SEED: PRODUCT BRANDS
-- ============================================================
INSERT INTO public.product_brands (name, slug, tagline, sort_order) VALUES
  ('AZURA', 'azura', 'Luxury — Creating Memories', 1),
  ('ASURE', 'asure', 'Premium — Creating Memories', 2),
  ('ANEX', 'anex', 'Mainstream — Creating Memories', 3),
  ('ATOP', 'atop', 'Value — Creating Memories', 4),
  ('AMAJE', 'amaje', 'Primers — Creating Memories', 5),
  ('AREST', 'arest', 'Waterproofing — Creating Memories', 6),
  ('Advance', 'advance', 'Premium Architectural', 7),
  ('Metallica', 'metallica', 'Metallic Finishes', 8),
  ('FireSeal', 'fireseal', 'Intumescent Fire Protection', 9),
  ('Anupam Industrial', 'anupam-industrial', 'Industrial Protective Coatings', 10);

-- ============================================================
-- SEED: APPROVALS
-- ============================================================
INSERT INTO public.approvals (name, category, description, sort_order) VALUES
  ('ISO 9001:2015', 'ISO', 'Quality Management System', 1),
  ('ISO 14001:2015', 'ISO', 'Environmental Management System', 2),
  ('ISO 45001:2018', 'ISO', 'Occupational Health & Safety', 3),
  ('RDSO', 'Railway', 'Research Designs & Standards Organisation', 4),
  ('ICF Chennai', 'Railway', 'Integral Coach Factory', 5),
  ('CLW Chittaranjan', 'Railway', 'Chittaranjan Locomotive Works', 6),
  ('DMW Patiala', 'Railway', 'Diesel Modernisation Works', 7),
  ('RCF Kapurthala', 'Railway', 'Rail Coach Factory', 8),
  ('MCF Rae Bareli', 'Railway', 'Modern Coach Factory', 9),
  ('Indian Navy / DQAN', 'Defence', 'Directorate of Quality Assurance (Naval)', 10),
  ('MES Eastern Command', 'Defence', 'Military Engineer Services', 11),
  ('EIL', 'Infrastructure', 'Engineers India Limited', 12),
  ('HPCL', 'Energy', 'Hindustan Petroleum Corporation Limited', 13),
  ('BHEL', 'Energy', 'Bharat Heavy Electricals Limited', 14),
  ('CMRL', 'Infrastructure', 'Chennai Metro Rail Limited', 15),
  ('AAI', 'Infrastructure', 'Airports Authority of India', 16),
  ('IGBC', 'Green Building', 'Indian Green Building Council', 17),
  ('WRAS', 'Potable Water', 'Water Regulations Advisory Scheme', 18),
  ('MSME', 'Registration', 'Ministry of MSME', 19),
  ('NSIC', 'Registration', 'National Small Industries Corporation', 20);

-- ============================================================
-- SEED: BLOG CATEGORIES
-- ============================================================
INSERT INTO public.blog_categories (name, slug, sort_order) VALUES
  ('Decorative Painting Guides', 'decorative-guides', 1),
  ('Industrial Corrosion Protection', 'corrosion-protection', 2),
  ('Marine Coating Knowledge', 'marine-coatings', 3),
  ('Railway Coating Systems', 'railway-coatings', 4),
  ('Fire Protection', 'fire-protection', 5),
  ('Waterproofing', 'waterproofing', 6),
  ('Floor Coating Systems', 'floor-coatings', 7),
  ('Paint Testing & Standards', 'testing-standards', 8),
  ('Product News', 'product-news', 9),
  ('Industry Trends', 'industry-trends', 10);

-- ============================================================
-- SEED: BANNERS
-- ============================================================
INSERT INTO public.banners (title, subtitle, cta_text, cta_url, sort_order, is_active) VALUES
  ('Engineering Coatings. Protecting Assets. Beautifying Spaces.', 'Trusted by Indian Railways, Navy, and 500+ industrial clients since 1972', 'Explore Products', '/products', 1, true),
  ('50+ Years of Manufacturing Excellence', '1000 KL/month capacity. In-house resin plant. NABL-compliant laboratory.', 'View Infrastructure', '/infrastructure', 2, true),
  ('High-Performance Industrial Coatings', 'Epoxy, PU, Polyurea, Fire-Retardant, Heat-Resistant, and Chemical-Resistant systems', 'Request a Quote', '/contact', 3, true);

-- ============================================================
-- INDEXES
-- ============================================================
CREATE INDEX idx_products_division ON public.products(division_id);
CREATE INDEX idx_products_category ON public.products(category_id);
CREATE INDEX idx_products_brand ON public.products(brand_id);
CREATE INDEX idx_products_slug ON public.products(slug);
CREATE INDEX idx_products_active ON public.products(is_active);
CREATE INDEX idx_enquiries_status ON public.enquiries(status);
CREATE INDEX idx_blog_posts_status ON public.blog_posts(status);
CREATE INDEX idx_dealers_state ON public.dealers(state);
CREATE INDEX idx_dealers_city ON public.dealers(city);
CREATE INDEX idx_complaints_status ON public.complaints(status);
CREATE INDEX idx_audit_logs_user ON public.audit_logs(user_id);
CREATE INDEX idx_audit_logs_created ON public.audit_logs(created_at);

-- ============================================================
-- ROW LEVEL SECURITY (basic policies)
-- ============================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dealers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.painters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.complaints ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Public read access for products, divisions, solutions, approvals, etc.
CREATE POLICY "Public read products" ON public.products FOR SELECT USING (is_active = true);
CREATE POLICY "Public read divisions" ON public.product_divisions FOR SELECT USING (is_active = true);
CREATE POLICY "Public read categories" ON public.product_categories FOR SELECT USING (is_active = true);
CREATE POLICY "Public read solutions" ON public.solutions FOR SELECT USING (is_active = true);
CREATE POLICY "Public read approvals" ON public.approvals FOR SELECT USING (is_active = true);
CREATE POLICY "Public read clients" ON public.clients FOR SELECT USING (is_active = true);
CREATE POLICY "Public read testimonials" ON public.testimonials FOR SELECT USING (is_approved = true);
CREATE POLICY "Public read banners" ON public.banners FOR SELECT USING (is_active = true);
CREATE POLICY "Public read blog" ON public.blog_posts FOR SELECT USING (status = 'published');
CREATE POLICY "Public read blog_categories" ON public.blog_categories FOR SELECT USING (true);
CREATE POLICY "Public read site_settings" ON public.site_settings FOR SELECT USING (true);

-- Users can read own profile
CREATE POLICY "Users read own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Notifications: users see only their own
CREATE POLICY "Users read own notifications" ON public.notifications FOR SELECT USING (auth.uid() = user_id);

-- Enquiries: anyone can insert
CREATE POLICY "Public insert enquiries" ON public.enquiries FOR INSERT WITH CHECK (true);

-- Enable RLS on public read tables
ALTER TABLE public.product_divisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.solutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.approvals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

SELECT 'Migration complete — all tables and seed data created.' AS status;
