import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase';
import { sendNotification } from '@/lib/notifications';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, company, phone, email, enquiry_type, message } = body;

    if (!name || !phone || !enquiry_type || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const supabase = createServiceClient();
    const { data, error } = await supabase.from('enquiries').insert({
      name, company, phone, email, enquiry_type, message,
      source: 'website', status: 'new',
    }).select().single();

    if (error) throw error;

    // Send notifications (non-blocking — don't await in production for speed)
    sendNotification({
      // WhatsApp confirmation to customer
      phone,
      whatsappTemplate: 'enquiry_confirmation',
      whatsappParams: [name, enquiry_type],

      // SMS to customer
      smsTemplateId: process.env.MSG91_TEMPLATE_ID_ENQUIRY,
      smsVariables: { name, enquiry_type },

      // Email to sales team
      email: process.env.EMAIL_SALES,
      emailSubject: `New ${enquiry_type} Enquiry from ${name} — ${company || 'Individual'}`,
      emailHtml: `
        <h2>New Website Enquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Company:</strong> ${company || 'N/A'}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email || 'N/A'}</p>
        <p><strong>Type:</strong> ${enquiry_type}</p>
        <p><strong>Message:</strong></p>
        <blockquote>${message}</blockquote>
        <p><a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin/enquiries">View in Admin Panel</a></p>
      `,
    }).catch(err => console.error('Notification error:', err));

    return NextResponse.json({ success: true, id: data.id });
  } catch (err: any) {
    console.error('Enquiry error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
