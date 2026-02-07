import { type ClassValue, clsx } from 'clsx';
import { Locale, locales } from '@/lib/locales';

/**
 * Утилита для объединения classNames (аналог classnames/clsx)
 * Используется для условного применения CSS классов
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/**
 * Извлекает локаль из pathname
 * Примеры:
 * '/en/about' -> 'en'
 * '/about' -> null
 * '/uz' -> 'uz'
 */
export function getPathnameLocale(pathname: string): Locale | null {
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];

  if (firstSegment && locales.includes(firstSegment as Locale)) {
    return firstSegment as Locale;
  }

  return null;
}

/**
 * Удаляет локаль из pathname
 * Примеры:
 * '/en/about' -> '/about'
 * '/uz' -> '/'
 * '/about' -> '/about'
 */
export function stripLocaleFromPathname(pathname: string): string {
  const locale = getPathnameLocale(pathname);
  if (!locale) return pathname;

  const withoutLocale = pathname.replace(new RegExp(`^/${locale}`), '');
  return withoutLocale || '/';
}
