import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-side client with service role for admin operations
export function createServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}

// Type definitions
export type Division = {
  id: string; name: string; slug: string; description: string;
  tagline: string; image_url: string | null; icon: string; sort_order: number;
};
export type Product = {
  id: string; name: string; slug: string; code: string; short_description: string;
  description: string; features: string[]; usage_areas: string; surface_prep: string;
  application_method: string; dft_min: number; dft_max: number; dft_unit: string;
  coverage_rate: string; pack_sizes: string[]; shade_options: any[];
  voc_content: string; standards: string[]; warranty_years: number;
  warranty_terms: string; is_featured: boolean; image_url?: string;
  category_id: string; division_id: string; brand_id: string;
  product_images?: { image_url: string; alt_text: string; is_primary: boolean }[];
  product_categories?: { name: string; slug: string };
  product_divisions?: { name: string; slug: string };
  product_brands?: { name: string; slug: string };
};
export type Solution = {
  id: string; title: string; slug: string; industry: string; icon: string;
  problem_statement: string; total_dft: string; application_method: string;
  expected_performance: string; image_url: string | null;
  solution_layers?: any[];
};
export type Approval = {
  id: string; name: string; category: string; description: string;
  logo_url: string | null; certificate_url: string | null; reference_number: string;
};
export type Banner = {
  id: string; title: string; subtitle: string; image_url: string;
  cta_text: string; cta_url: string;
};
export type Enquiry = {
  name: string; company: string; phone: string; email: string;
  enquiry_type: string; message: string; source?: string;
};
