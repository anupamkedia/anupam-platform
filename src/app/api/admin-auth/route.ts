import { NextRequest, NextResponse } from 'next/server';
import { createSessionToken, checkCredentials } from '@/lib/adminAuth';

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();
    if (!checkCredentials(username, password)) {
      return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
    }
    const token = await createSessionToken();
    const res = NextResponse.json({ success: true });
    res.cookies.set('admin_session', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });
    return res;
  } catch (e) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function DELETE() {
  const res = NextResponse.json({ success: true });
  res.cookies.set('admin_session', '', { maxAge: 0, path: '/' });
  return res;
}
