import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*', '/login', '/register', '/verify/:path*', '/reset/:path*', '/forgot-password'],
};

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXT_AUTH_SECRET });
  const url = request.nextUrl;
  const { pathname } = url;

  const authPaths = ['/register', '/login', '/verify', '/reset', '/forgot-password'];
  const dashboardPaths = ['/dashboard/create', '/dashboard/home', '/dashboard/settings', '/dashboard/urls'];
  const adminPaths = ['/admin/users', '/admin/urls'];

  if (token) {
    if (token.role === 'admin') {
      if (authPaths.some(path => pathname.startsWith(path))) {
        console.log('Redirecting authenticated admin to /admin/users');
        return NextResponse.redirect(new URL('/admin/users', request.url));
      }
      if (dashboardPaths.some(path => pathname.startsWith(path))) {
        console.log('Redirecting admin from dashboard route to /admin/users');
        return NextResponse.redirect(new URL('/admin/users', request.url));
      }
    }

    if (token.role !== 'admin') {
      if (authPaths.some(path => pathname.startsWith(path))) {
        console.log('Redirecting authenticated user to /dashboard/home');
        return NextResponse.redirect(new URL('/dashboard/home', request.url));
      }
      if (adminPaths.some(path => pathname.startsWith(path)) || pathname === '/admin/') {
        console.log('Redirecting non-admin user from admin route to /dashboard/home');
        return NextResponse.redirect(new URL('/dashboard/home', request.url));
      }
    }
  } else {
    if (dashboardPaths.includes(pathname)) {
      console.log('Redirecting unauthenticated user to /login');
      return NextResponse.redirect(new URL('/login', request.url));
    }

    if (adminPaths.includes(pathname) || pathname === '/admin/') {
      console.log('Redirecting unauthenticated user to /login');
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  if (pathname === '/dashboard/') {
    console.log('Redirecting /dashboard to /dashboard/home');
    return NextResponse.redirect(new URL('/dashboard/home', request.url));
  }

  return NextResponse.next();
}
