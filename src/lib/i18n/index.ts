import { Locale } from '@/lib/locales';

/**
 * Тип для словаря переводов
 * В будущем здесь будут храниться все переводы для каждого языка
 */
export interface Dictionary {
  // Navigation
  nav?: {
    about?: string;
    documents?: string;
    products?: string;
    calculator?: string;
    logistics?: string;
    contacts?: string;
  };

  // Common
  common?: {
    home?: string;
    back?: string;
    next?: string;
    loading?: string;
  };

  // Здесь будут добавляться новые секции переводов
}

/**
 * Функция-заглушка для получения словаря переводов
 * В будущем будет импортировать реальные переводы из файлов dictionaries/ru.ts, en.ts, uz.ts
 * 
 * Пример будущей реализации:
 * ```typescript
 * const dictionaries = {
 *   ru: () => import('./dictionaries/ru').then((module) => module.default),
 *   en: () => import('./dictionaries/en').then((module) => module.default),
 *   uz: () => import('./dictionaries/uz').then((module) => module.default),
 * };
 * 
 * export async function getDictionary(locale: Locale): Promise<Dictionary> {
 *   return dictionaries[locale]?.() ?? dictionaries.ru();
 * }
 * ```
 * 
 * ВАЖНО для SEO:
 * - Переводы должны содержать SEO-оптимизированные ключевые слова
 * - Заголовки и описания должны быть уникальными для каждого языка
 * - Использовать естественный язык, а не дословный перевод
 */
export async function getDictionary(_locale: Locale): Promise<Dictionary> {
  // Пока возвращаем пустой объект
  // Когда будут готовы файлы переводов, раскомментировать код выше
  return {};
}

/**
 * Типы для ключей переводов (для автокомплита в IDE)
 * Пример использования:
 * const t = await getDictionary(locale);
 * const title = t.nav?.about ?? 'About us';
 */
export type TranslationKey = keyof Dictionary;
