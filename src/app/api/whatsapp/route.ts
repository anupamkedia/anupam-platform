import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase';

// WhatsApp webhook verification (GET)
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  if (mode === 'subscribe' && token === process.env.WHATSAPP_VERIFY_TOKEN) {
    return new NextResponse(challenge, { status: 200 });
  }
  return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
}

// WhatsApp incoming message webhook (POST)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const entry = body.entry?.[0];
    const changes = entry?.changes?.[0];
    const value = changes?.value;

    if (value?.messages) {
      const message = value.messages[0];
      const from = message.from; // sender phone number
      const text = message.text?.body || '';
      const timestamp = message.timestamp;

      const supabase = createServiceClient();

      // Log incoming WhatsApp message
      await supabase.from('enquiries').insert({
        name: value.contacts?.[0]?.profile?.name || from,
        phone: from,
        message: text,
        source: 'whatsapp',
        enquiry_type: 'WhatsApp Message',
        status: 'new',
      });

      // TODO: Auto-reply logic based on message content
      // e.g., "hi" -> send welcome template
      // "price list" -> send catalogue link
      // "complaint" -> create complaint ticket
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('WhatsApp webhook error:', err);
    return NextResponse.json({ success: true }); // Always return 200 to WhatsApp
  }
}
