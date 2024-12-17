import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register', '/verify/:path*'],
};

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXT_AUTH_SECRET });
  const url = request.nextUrl;

  if (
    token &&
    (
      url.pathname.startsWith('/register') ||
      url.pathname.startsWith('/login') ||
      url.pathname.startsWith('/verify')
    )
  ) {
    console.log('Redirecting authenticated user to /dashboard/home');
    return NextResponse.redirect(new URL('/dashboard/home', request.url));
  }

  if (!token && url.pathname.startsWith('/dashboard/home')) {
    console.log('Redirecting unauthenticated user to /login');
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (url.pathname === '/dashboard') {
    console.log('Redirecting /dashboard to /dashboard/home');
    return NextResponse.redirect(new URL('/dashboard/home', request.url))
  }

  return NextResponse.next();
}
