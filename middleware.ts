import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('odyssey_auth_token')?.value;

  // Check if accessing protected route
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // Validate token (basic check)
    try {
      const payload = JSON.parse(atob(token));
      const isExpired = Date.now() > payload.exp;

      if (isExpired) {
        const response = NextResponse.redirect(new URL('/login', request.url));
        response.cookies.delete('odyssey_auth_token');
        return response;
      }
    } catch {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Redirect authenticated users away from login
  if (request.nextUrl.pathname === '/login' && token) {
    try {
      const payload = JSON.parse(atob(token));
      const isExpired = Date.now() > payload.exp;
      if (!isExpired) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
    } catch {
      // Token invalid, continue to login
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login'],
};
