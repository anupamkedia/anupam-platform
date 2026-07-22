import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      product_id, customer_name, customer_phone, customer_email,
      dealer_id, painter_id, invoice_url, batch_number,
      surface_type, area_sqft, system_applied, coats, application_date,
    } = body;

    if (!product_id || !customer_name || !customer_phone) {
      return NextResponse.json({ error: 'Product, customer name, and phone are required' }, { status: 400 });
    }

    const supabase = createServiceClient();

    // Generate registration number
    const regNumber = 'WR' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).slice(2, 6).toUpperCase();

    let rules: any = null;
    try {
      const res = await supabase.from('warranty_rules').select('warranty_years').eq('product_id', product_id).eq('is_active', true).limit(1).single();
      rules = res.data;
    } catch (e) {}

    const warrantyYears = rules?.warranty_years || 3; // Default 3 years

    const warrantyStart = application_date ? new Date(application_date) : new Date();
    const warrantyEnd = new Date(warrantyStart);
    warrantyEnd.setFullYear(warrantyEnd.getFullYear() + warrantyYears);

    const { data, error } = await supabase.from('warranty_registrations').insert({
      registration_number: regNumber,
      product_id, customer_name, customer_phone, customer_email,
      dealer_id, painter_id, invoice_url, batch_number,
      surface_type, area_sqft, system_applied, coats,
      application_date: warrantyStart.toISOString().split('T')[0],
      warranty_years: warrantyYears,
      warranty_start: warrantyStart.toISOString().split('T')[0],
      warranty_end: warrantyEnd.toISOString().split('T')[0],
      status: 'pending',
    }).select().single();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      registration_number: regNumber,
      warranty_years: warrantyYears,
      warranty_end: warrantyEnd.toISOString().split('T')[0],
    });
  } catch (err: any) {
    console.error('Warranty error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const regNumber = searchParams.get('registration_number');

  if (!regNumber) {
    return NextResponse.json({ error: 'Registration number required' }, { status: 400 });
  }

  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from('warranty_registrations')
    .select('*, products(name)')
    .eq('registration_number', regNumber)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: 'Warranty not found' }, { status: 404 });
  }

  return NextResponse.json(data);
}
