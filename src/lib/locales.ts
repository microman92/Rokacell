export const locales = ['ru', 'en', 'uz'] as const;
export type Locale = (typeof locales)[number];

export const DEFAULT_LOCALE: Locale = 'ru';
