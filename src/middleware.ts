import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { locales, DEFAULT_LOCALE } from "./lib/locales";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Проверяем, есть ли уже локаль в пути (например, /en/about или /ru)
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Если локали нет, перенаправляем на дефолтную (русский)
  // Мы сохраняем хвост пути (например: /about -> /ru/about)
  const locale = DEFAULT_LOCALE;
  request.nextUrl.pathname = `/${locale}${pathname}`;

  // 308 - Permanent Redirect (хорошо для SEO)
  // Но пока можно 307 (Temporary), чтобы кэш браузера не мешал разработке
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Применяем middleware ко всем путям, кроме системных файлов
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|img|svg|video|docs).*)",
  ],
};
