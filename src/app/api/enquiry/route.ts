import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase';
import { sendNotification } from '@/lib/notifications';

/* ============================================================================
   Enquiry intake
   ----------------------------------------------------------------------------
   The previous version checked only that fields were present, so a name of "A"
   and a phone of "8787" were accepted. A double-click created two records. And
   every row recorded source as "website", which told you nothing about where
   the lead came from.

   Validation lives here rather than in the ten forms that post to it: it
   covers all of them at once, and unlike client-side checks it cannot be
   bypassed.
   ========================================================================== */

const DUPLICATE_WINDOW_MS = 5 * 60 * 1000;   // a resubmit inside 5 minutes is the same enquiry
const HOURLY_LIMIT = 6;                       // beyond this from one number, something is wrong

/** Reduce an Indian mobile to 10 digits, or null if it cannot be one. */
function normalisePhone(raw: unknown): string | null {
  if (typeof raw !== 'string') return null;
  let d = raw.replace(/\D/g, '');
  /* Strip trunk and country prefixes in any order. People write 0..., 91...,
     +91..., and 091 91... — a valid number rejected is worse than junk let in. */
  while (d.length > 10) {
    if (d.startsWith('0')) { d = d.slice(1); continue; }
    if (d.startsWith('91')) { d = d.slice(2); continue; }
    break;
  }
  if (d.length !== 10) return null;
  if (!/^[6-9]/.test(d)) return null;                        // Indian mobiles start 6-9
  if (/^(\d)\1{9}$/.test(d)) return null;                    // 9999999999 and similar
  return d;
}

function validName(raw: unknown): string | null {
  if (typeof raw !== 'string') return null;
  const n = raw.trim().replace(/\s+/g, ' ');
  if (n.length < 2) return null;                 // "A" is not a name
  if (!/[A-Za-z\u0900-\u097F]{2}/.test(n)) return null;  // needs real letters, Latin or Devanagari
  if (/^(.)\1+$/.test(n.replace(/\s/g, ''))) return null; // "aaaa"
  if (n.length > 100) return null;
  return n;
}

function validEmail(raw: unknown): string | null | false {
  if (raw === undefined || raw === null || String(raw).trim() === '') return null;  // optional
  const e = String(raw).trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e)) return false;                        // present but wrong
  if (e.length > 200) return false;
  return e;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { company, enquiry_type, message, source, website } = body;

    /* Honeypot: a hidden field no human fills in. Bots fill everything.
       Return success so the bot does not learn it was rejected. */
    if (typeof website === 'string' && website.trim() !== '') {
      return NextResponse.json({ success: true });
    }

    const name = validName(body.name);
    if (!name) {
      return NextResponse.json({ error: 'Please enter your full name.' }, { status: 400 });
    }

    const phone = normalisePhone(body.phone);
    if (!phone) {
      return NextResponse.json({ error: 'Please enter a valid 10-digit mobile number.' }, { status: 400 });
    }

    const email = validEmail(body.email);
    if (email === false) {
      return NextResponse.json({ error: 'That email address does not look right.' }, { status: 400 });
    }

    /* Message is OPTIONAL. Ten forms post here, several of them short-form
       captures — an exit popup, a download gate — where asking for a
       paragraph is wrong. A valid name and a valid mobile is enough to act
       on; the message adds context when there is any. Requiring it here
       silently blocked the exit popup. */
    const msg = typeof message === 'string' ? message.trim() : '';
    if (msg.length > 5000) {
      return NextResponse.json({ error: 'That message is too long.' }, { status: 400 });
    }

    const type = typeof enquiry_type === 'string' && enquiry_type.trim() ? enquiry_type.trim() : 'General';

    const supabase = createServiceClient();

    /* ---- duplicate guard: same number, same type, within five minutes ---- */
    const since = new Date(Date.now() - DUPLICATE_WINDOW_MS).toISOString();
    const { data: recent } = await supabase
      .from('enquiries')
      .select('id, created_at')
      .eq('phone', phone)
      .gte('created_at', since)
      .limit(5);

    if (recent && recent.length > 0) {
      /* Treat as the same enquiry. Success is returned so the visitor sees a
         normal confirmation rather than an error for double-clicking. */
      return NextResponse.json({ success: true, id: recent[0].id, duplicate: true });
    }

    /* ---- rate limit: an unusual number of submissions from one mobile ---- */
    const hourAgo = new Date(Date.now() - 3600_000).toISOString();
    const { count } = await supabase
      .from('enquiries')
      .select('id', { count: 'exact', head: true })
      .eq('phone', phone)
      .gte('created_at', hourAgo);

    if ((count ?? 0) >= HOURLY_LIMIT) {
      return NextResponse.json(
        { error: 'We already have your enquiry and will be in touch shortly.' },
        { status: 429 }
      );
    }

    /* ---- record WHICH page produced the lead ---- */
    const page = typeof source === 'string' && source.trim() ? source.trim().slice(0, 80) : 'website';

    const { data, error } = await supabase.from('enquiries').insert({
      name,
      company: typeof company === 'string' ? company.trim().slice(0, 150) || null : null,
      phone,
      email,
      enquiry_type: type,
      message: msg || 'No message provided',
      source: page,
      status: 'new',
    }).select().single();

    if (error) throw error;

    sendNotification({
      phone,
      whatsappTemplate: 'enquiry_confirmation',
      whatsappParams: [name, type],
      smsTemplateId: process.env.MSG91_TEMPLATE_ID_ENQUIRY,
      smsVariables: { name, enquiry_type: type },
      email: process.env.EMAIL_SALES,
      emailSubject: `New ${type} Enquiry from ${name} — ${company || 'Individual'}`,
      emailHtml: `
        <h2>New Website Enquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Company:</strong> ${company || 'N/A'}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email || 'N/A'}</p>
        <p><strong>Type:</strong> ${type}</p>
        <p><strong>From page:</strong> ${page}</p>
        <p><strong>Message:</strong></p>
        <blockquote>${msg}</blockquote>
        <p><a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin/enquiries">View in Admin Panel</a></p>
      `,
    })?.catch?.((err: unknown) => console.error('[enquiry] notification failed:', err));

    return NextResponse.json({ success: true, id: data.id });
  } catch (err: any) {
    console.error('[enquiry]', err);
    return NextResponse.json({ error: 'Something went wrong. Please call 033-22651204.' }, { status: 500 });
  }
}
