// ===== WHATSAPP BUSINESS API INTEGRATION =====

type WhatsAppMessage = {
  to: string; // Phone number with country code (e.g., 919876543210)
  template?: { name: string; language: string; components?: any[] };
  text?: string;
};

export async function sendWhatsAppTemplate(to: string, templateName: string, params: string[] = []) {
  const url = `${process.env.WHATSAPP_API_URL}/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`;

  const components = params.length > 0 ? [{
    type: 'body',
    parameters: params.map(p => ({ type: 'text', text: p })),
  }] : [];

  const body = {
    messaging_product: 'whatsapp',
    to: to.replace(/[^0-9]/g, ''),
    type: 'template',
    template: {
      name: templateName,
      language: { code: 'en' },
      ...(components.length > 0 ? { components } : {}),
    },
  };

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(JSON.stringify(data));
    return { success: true, messageId: data.messages?.[0]?.id };
  } catch (err: any) {
    console.error('WhatsApp send error:', err.message);
    return { success: false, error: err.message };
  }
}

export async function sendWhatsAppText(to: string, text: string) {
  const url = `${process.env.WHATSAPP_API_URL}/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`;

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: to.replace(/[^0-9]/g, ''),
        type: 'text',
        text: { body: text },
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(JSON.stringify(data));
    return { success: true, messageId: data.messages?.[0]?.id };
  } catch (err: any) {
    console.error('WhatsApp text error:', err.message);
    return { success: false, error: err.message };
  }
}

// ===== SMS GATEWAY (MSG91) INTEGRATION =====

export async function sendSMS(to: string, templateId: string, variables: Record<string, string> = {}) {
  const url = 'https://control.msg91.com/api/v5/flow/';

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'authkey': process.env.MSG91_AUTH_KEY || '',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        template_id: templateId,
        short_url: '0',
        recipients: [{
          mobiles: to.replace(/[^0-9]/g, ''),
          ...variables,
        }],
      }),
    });
    const data = await res.json();
    return { success: data.type === 'success', data };
  } catch (err: any) {
    console.error('SMS send error:', err.message);
    return { success: false, error: err.message };
  }
}

export async function sendOTP(phone: string) {
  const url = `https://control.msg91.com/api/v5/otp?template_id=${process.env.MSG91_TEMPLATE_ID_OTP}&mobile=${phone.replace(/[^0-9]/g, '')}`;

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'authkey': process.env.MSG91_AUTH_KEY || '', 'Content-Type': 'application/json' },
    });
    const data = await res.json();
    return { success: data.type === 'success', requestId: data.request_id };
  } catch (err: any) {
    console.error('OTP send error:', err.message);
    return { success: false, error: err.message };
  }
}

export async function verifyOTP(phone: string, otp: string) {
  const url = `https://control.msg91.com/api/v5/otp/verify?mobile=${phone.replace(/[^0-9]/g, '')}&otp=${otp}`;

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'authkey': process.env.MSG91_AUTH_KEY || '' },
    });
    const data = await res.json();
    return { success: data.type === 'success' };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

// ===== EMAIL (RESEND) INTEGRATION =====

export async function sendEmail(to: string, subject: string, html: string) {
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.EMAIL_FROM || 'Anupam Paints <notifications@anupampaints.com>',
        to, subject, html,
      }),
    });
    const data = await res.json();
    return { success: !!data.id, id: data.id };
  } catch (err: any) {
    console.error('Email error:', err.message);
    return { success: false, error: err.message };
  }
}

// ===== NOTIFICATION DISPATCHER =====
// Central function that sends notifications through the appropriate channel

export type NotificationPayload = {
  phone?: string;
  email?: string;
  whatsappTemplate?: string;
  whatsappParams?: string[];
  smsTemplateId?: string;
  smsVariables?: Record<string, string>;
  emailSubject?: string;
  emailHtml?: string;
};

export async function sendNotification(payload: NotificationPayload) {
  const results: Record<string, any> = {};

  // WhatsApp
  if (payload.phone && payload.whatsappTemplate && process.env.WHATSAPP_ACCESS_TOKEN) {
    results.whatsapp = await sendWhatsAppTemplate(payload.phone, payload.whatsappTemplate, payload.whatsappParams);
  }

  // SMS
  if (payload.phone && payload.smsTemplateId && process.env.MSG91_AUTH_KEY) {
    results.sms = await sendSMS(payload.phone, payload.smsTemplateId, payload.smsVariables);
  }

  // Email
  if (payload.email && payload.emailSubject && payload.emailHtml && process.env.RESEND_API_KEY) {
    results.email = await sendEmail(payload.email, payload.emailSubject, payload.emailHtml);
  }

  return results;
}
