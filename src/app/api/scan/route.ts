import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { painter_id, scan_type, code, gps_lat, gps_lng } = body;

    if (!painter_id || !code) {
      return NextResponse.json({ error: 'Painter ID and code are required' }, { status: 400 });
    }

    const supabase = createServiceClient();

    // Check if code already used
    const { data: existing } = await supabase
      .from('painter_scans')
      .select('id')
      .eq('code', code)
      .eq('status', 'approved')
      .single();

    if (existing) {
      return NextResponse.json({ error: 'This code has already been used', duplicate: true }, { status: 400 });
    }

    // Create scan record
    const { data: scan, error } = await supabase.from('painter_scans').insert({
      painter_id,
      scan_type: scan_type || 'QR',
      code,
      gps_lat,
      gps_lng,
      status: 'pending', // Pending verification
      points_awarded: 0,
    }).select().single();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      scan_id: scan.id,
      message: 'Code submitted for verification. Points will be credited after approval.',
    });
  } catch (err: any) {
    console.error('Scan error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
