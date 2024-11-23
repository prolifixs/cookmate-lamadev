import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })
  const isAuth = !!token
  const isAuthPage = request.nextUrl.pathname.startsWith("/sign-in")

  if (isAuthPage) {
    if (isAuth) {
      return NextResponse.redirect(new URL("/", request.url))
    }
    return null
  }

  if (!isAuth) {
    let from = request.nextUrl.pathname;
    if (request.nextUrl.search) {
      from += request.nextUrl.search;
    }
    
    return NextResponse.redirect(
      new URL(`/sign-in?callbackUrl=${encodeURIComponent(from)}`, request.url)
    );
  }
}

export const config = {
  matcher: [
    "/profile/:path*",
    "/recipes/:path*",
    "/sign-in",
  ]
} 