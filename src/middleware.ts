import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { locales, DEFAULT_LOCALE } from "./lib/locales";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  
  
  const locale = DEFAULT_LOCALE;
  request.nextUrl.pathname = `/${locale}${pathname}`;

  
  
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  
  matcher: [
    
    "/((?!api|_next/static|_next/image|favicon.ico|img|svg|video|docs).*)",
  ],
};
