import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, company, phone, email, enquiry_type, document_id, product_id } = body;

    if (!name || !phone) {
      return NextResponse.json({ error: 'Name and phone are required' }, { status: 400 });
    }

    const supabase = createServiceClient();

    // Save download lead
    await supabase.from('tds_downloads').insert({
      name, company, phone, email, enquiry_type, document_id, product_id,
    });

    // Also create an enquiry for follow-up
    await supabase.from('enquiries').insert({
      name, company, phone, email,
      enquiry_type: enquiry_type || 'TDS Download',
      message: `TDS download request for product ${product_id || 'unknown'}`,
      source: 'tds_download', status: 'new',
    });

    // Increment download count on document
    if (document_id) {
      try { await supabase.from('product_documents').update({ download_count: 1 }).eq('id', document_id); } catch (e) {}
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('TDS download error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
