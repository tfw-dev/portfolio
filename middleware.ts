import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const response = NextResponse.next();

  // Option 1: Set a request header (works only for Edge functions)
  response.headers.set('x-pathname', pathname);

  // Option 2: Set a cookie (readable in any server component)
  response.cookies.set('pathname', pathname);

  return response;
}

// Apply to all routes
export const config = {
  matcher: '/:path*',
};
