import { NextResponse, type NextRequest } from 'next/server';
import { verifySessionToken } from '@/lib/adminAuth';

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const token = request.cookies.get('admin_session')?.value;
    const valid = await verifySessionToken(token);
    if (!valid) {
      const loginUrl = new URL('/admin-login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
