'use client';

import { usePathname } from 'next/navigation';
import { getPathnameLocale } from '@/lib/utils';
import { DEFAULT_LOCALE, type Locale } from '@/lib/locales';


export function useCurrentLocale(): Locale {
  const pathname = usePathname();
  const locale = getPathnameLocale(pathname);

  return locale || DEFAULT_LOCALE;
}
