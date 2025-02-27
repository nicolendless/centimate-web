import { jwtDecode } from "jwt-decode";
import { NextRequest, NextResponse } from "next/server";

function isTokenExpired(token: string) {
  try {
    const decoded = jwtDecode(token)
    const exp = decoded.exp

    if (!exp) return true

    const currentTime = Math.floor(Date.now() / 1000)
    return exp < currentTime
  } catch (error) {
    return true;
  }
}

export function middleware(request: NextRequest) {
  // TODO: create a authenticate method
  let cookie = request.cookies.get('authToken')
  if (!cookie) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  const token = cookie.value
  if (isTokenExpired(token)) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
      * Match all request paths except for the ones starting with:
      * - api (API routes)
      * - _next/static (static files)
      * - _next/image (image optimization files)
      * - favicon.ico, sitemap.xml, robots.txt (metadata files)
      */    
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|auth/login).*)',
  ],
 }