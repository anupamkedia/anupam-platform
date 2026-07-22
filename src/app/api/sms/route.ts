import { NextRequest, NextResponse } from 'next/server';
import { sendSMS, sendOTP, verifyOTP } from '@/lib/notifications';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, phone, otp, templateId, variables } = body;

    if (action === 'send_otp') {
      const result = await sendOTP(phone);
      return NextResponse.json(result);
    }

    if (action === 'verify_otp') {
      const result = await verifyOTP(phone, otp);
      return NextResponse.json(result);
    }

    if (action === 'send_sms' && templateId) {
      const result = await sendSMS(phone, templateId, variables);
      return NextResponse.json(result);
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
