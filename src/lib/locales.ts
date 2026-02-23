export const locales = ['ru', 'en', 'uz'] as const;
export type Locale = (typeof locales)[number];

export const DEFAULT_LOCALE: Locale = 'ru';


export const LOCALE_NAMES: Record<Locale, string> = {
  ru: 'Русский',
  en: 'English',
  uz: "O'zbekcha",
};


export const LOCALE_CODES: Record<Locale, string> = {
  ru: 'RU',
  en: 'EN',
  uz: 'UZ',
};


export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}


export function getValidLocale(locale: string | undefined): Locale {
  if (!locale) return DEFAULT_LOCALE;
  return isValidLocale(locale) ? locale : DEFAULT_LOCALE;
}
