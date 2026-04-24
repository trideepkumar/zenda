import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const role = request.cookies.get('user-role')?.value;

  const isAuthRoute = pathname.startsWith('/login');

  // If no role, protect dashboard and other routes
  if (!role && !isAuthRoute && pathname !== '/unauthorized') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Redirect authenticated users trying to access login
  if (role && isAuthRoute) {
    if (role === 'admin') return NextResponse.redirect(new URL('/admin', request.url));
    if (role === 'delivery') return NextResponse.redirect(new URL('/delivery', request.url));
    return NextResponse.redirect(new URL('/', request.url)); // user dashboard
  }

  // Role-based protection rules
  if (pathname.startsWith('/admin') && role !== 'admin') {
    return NextResponse.redirect(new URL('/unauthorized', request.url));
  }

  if (pathname.startsWith('/delivery') && role !== 'delivery') {
    return NextResponse.redirect(new URL('/unauthorized', request.url));
  }

  // Prevent admin and delivery from accessing user specific routes if desired, 
  // though typically an admin can see products. We'll enforce strict separation.
  const userOnlyRoutes = ['/cart', '/checkout', '/orders'];
  if (userOnlyRoutes.some(route => pathname.startsWith(route)) && role !== 'user') {
    return NextResponse.redirect(new URL('/unauthorized', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
