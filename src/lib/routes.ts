import { type Locale, DEFAULT_LOCALE } from './locales';

export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  CALCULATOR: '/calculator',
  CALC_PIPES_HEAT_LOSS: '/calculator/pipes/heat-loss',
  CALC_PIPES_CONDENSATION: '/calculator/pipes/condensation',
  CALC_SHEETS_HEAT_LOSS: '/calculator/sheets/heat-loss',
  CALC_SHEETS_CONDENSATION: '/calculator/sheets/condensation',
  CONTACTS: '/contacts',
  DOCUMENTS: '/documents',
  LOGISTICS: '/logistics',
  NEWS: '/news',
  PRODUCTS: '/products',

  NEWS_ITEM: (slug: string) => `/news/${slug}`,
  PRODUCT_ITEM: (slug: string) => `/products/${slug}`,
} as const;

/**
 * Формирует ссылку с учётом локали
 *
 * ru  + '/'        -> '/'
 * ru  + '/about'   -> '/about'
 * en  + '/'        -> '/en'
 * en  + '/about'   -> '/en/about'
 */
export function href(locale: Locale, path: string) {
  // Гарантируем, что путь начинается со слэша
  const safePath = path.startsWith('/') ? path : `/${path}`;

  // русский — без префикса
  if (locale === DEFAULT_LOCALE) {
    return safePath;
  }

  // главная
  if (safePath === '/') {
    return `/${locale}`;
  }

  return `/${locale}${safePath}`;
}

/**
 * Переключает язык, сохраняя текущий путь
 *
 * '/about'        + 'en' -> '/en/about'
 * '/en/about'     + 'ru' -> '/about'
 * '/uz/news/a1'   + 'ru' -> '/news/a1'
 */
export function switchLocale(pathname: string, nextLocale: Locale) {
  // убираем хвостовой слэш (кроме '/')
  const clean =
    pathname !== '/' ? pathname.replace(/\/$/, '') : pathname;

  // убираем текущую локаль из URL
  const stripped = clean.replace(/^\/(ru|en|uz)(?=\/|$)/, '');

  const path = stripped === '' ? '/' : stripped;

  return href(nextLocale, path);
}

/**
 * Навигация (без локали)
 */
export const NAV_LINKS = [
  { key: 'about', path: ROUTES.ABOUT },
  { key: 'documents', path: ROUTES.DOCUMENTS },
  { key: 'products', path: ROUTES.PRODUCTS },
  { key: 'calculator', path: ROUTES.CALCULATOR },
  { key: 'logistics', path: ROUTES.LOGISTICS },
  { key: 'contacts', path: ROUTES.CONTACTS },
] as const;


/**
 * Возвращает навигацию с учетом локали
 */
export function getNavLinks(locale: Locale) {
  return NAV_LINKS.map((link) => ({
    ...link,
    path: href(locale, link.path),
  }));
}
