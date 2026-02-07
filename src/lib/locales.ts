export const locales = ['ru', 'en', 'uz'] as const;
export type Locale = (typeof locales)[number];

export const DEFAULT_LOCALE: Locale = 'ru';

/**
 * Названия языков для отображения в UI
 */
export const LOCALE_NAMES: Record<Locale, string> = {
  ru: 'Русский',
  en: 'English',
  uz: "O'zbekcha",
};

/**
 * Короткие коды языков для отображения
 */
export const LOCALE_CODES: Record<Locale, string> = {
  ru: 'RU',
  en: 'EN',
  uz: 'UZ',
};

/**
 * Проверяет, является ли строка валидной локалью
 */
export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

/**
 * Получает локаль из строки, возвращает DEFAULT_LOCALE если невалидна
 */
export function getValidLocale(locale: string | undefined): Locale {
  if (!locale) return DEFAULT_LOCALE;
  return isValidLocale(locale) ? locale : DEFAULT_LOCALE;
}
