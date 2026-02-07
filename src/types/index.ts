import { Locale } from "@/lib/locales";

/**
 * Props для страниц с динамическим параметром locale
 */
export interface PageProps {
  params: Promise<{ locale: Locale }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

/**
 * Props для layout компонентов с динамическим параметром locale
 */
export interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}

/**
 * Props для компонентов с параметром locale
 */
export interface LocaleProps {
  locale: Locale;
}

/**
 * Навигационная ссылка
 */
export interface NavLink {
  key: string;
  path: string;
}

/**
 * Навигационная ссылка с учетом локали
 */
export interface LocalizedNavLink extends NavLink {
  localizedPath: string;
}

/**
 * Общий тип для компонентов с className
 */
export interface WithClassName {
  className?: string;
}

/**
 * Общий тип для компонентов с children
 */
export interface WithChildren {
  children: React.ReactNode;
}
