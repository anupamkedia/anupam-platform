import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

/* Reading enquiries requires the SERVICE ROLE key, which exists only on the
   server. The admin panel previously read this table from the browser with the
   public key — which is precisely the exposure Supabase flagged: anyone who
   viewed the site could have done the same. */
function admin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export async function GET(req: Request) {
  const supabase = admin();
  if (!supabase) {
    return NextResponse.json({
      error: 'SUPABASE_SERVICE_ROLE_KEY is not set. Add it in Vercel > Settings > Environment Variables (type: Secret), then redeploy. Until then enquiries cannot be read from the browser, which is the safe default.',
    }, { status: 503 });
  }

  const { data, error } = await supabase
    .from('enquiries')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const { searchParams } = new URL(req.url);
  if (searchParams.get('format') === 'csv') {
    const cols = ['name','company','phone','email','enquiry_type','source','status','message','created_at'];
    const head = cols.join(',') + '\n';
    const body = (data || []).map((r: any) =>
      cols.map((c) => `"${String(r[c] ?? '').replace(/"/g, '""')}"`).join(',')
    ).join('\n');
    return new NextResponse(head + body, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="anupam-enquiries-${new Date().toISOString().slice(0,10)}.csv"`,
      },
    });
  }
  return NextResponse.json({ enquiries: data || [] });
}

/* Update the status of one enquiry — new, contacted, quoted, won, closed. */
export async function PATCH(req: Request) {
  const supabase = admin();
  if (!supabase) return NextResponse.json({ error: 'Service role key not configured.' }, { status: 503 });

  const { id, status } = await req.json();
  if (!id || !status) return NextResponse.json({ error: 'id and status are required' }, { status: 400 });

  const { error } = await supabase.from('enquiries').update({ status }).eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
