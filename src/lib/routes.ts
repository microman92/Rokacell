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


export function href(locale: Locale, path: string) {
  
  const safePath = path.startsWith('/') ? path : `/${path}`;

  
  if (locale === DEFAULT_LOCALE) {
    return safePath;
  }

  
  if (safePath === '/') {
    return `/${locale}`;
  }

  return `/${locale}${safePath}`;
}


export function switchLocale(pathname: string, nextLocale: Locale) {
  
  const clean =
    pathname !== '/' ? pathname.replace(/\/$/, '') : pathname;

  
  const stripped = clean.replace(/^\/(ru|en|uz)(?=\/|$)/, '');

  const path = stripped === '' ? '/' : stripped;

  return href(nextLocale, path);
}


export const NAV_LINKS = [
  { key: 'about', path: ROUTES.ABOUT },
  { key: 'documents', path: ROUTES.DOCUMENTS },
  { key: 'products', path: ROUTES.PRODUCTS },
  { key: 'calculator', path: ROUTES.CALCULATOR },
  { key: 'logistics', path: ROUTES.LOGISTICS },
  { key: 'contacts', path: ROUTES.CONTACTS },
] as const;



export function getNavLinks(locale: Locale) {
  return NAV_LINKS.map((link) => ({
    ...link,
    path: href(locale, link.path),
  }));
}
