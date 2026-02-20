import { Locale } from '@/lib/locales';

/**
 * Тип для словаря переводов
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

  // Hero section
  hero?: {
    slides?: Array<{
      title: string;
      subtitle?: string;
    }>;
  };

  // Features (running string)
  features?: {
    eco?: string;
    durability?: string;
    fireSafety?: string;
    energyEfficiency?: string;
  };

  // Industries (ОБЛАСТИ ПРИМЕНЕНИЯ)
  industries?: {
    title?: string;
    areas?: {
      hotels?: string;
      businessCenters?: string;
      hospitals?: string;
      construction?: string;
      factories?: string;
      shoppingMalls?: string;
    };
    applications?: {
      ventilationDucts?: string;
      airConditioningDucts?: string;
      airConditioningPipelines?: string;
      heatingPipelines?: string;
    };
  };

  // Products
  products?: {
    title?: string;
    tabs?: {
      rolls?: string;
      tubes?: string;
      accessories?: string;
      all?: string;
    };
    viewAll?: string;
  };

  // About Video
  aboutVideo?: {
    text?: string;
  };

  // Branches
  branches?: {
    title?: string;
    tashkent?: {
      city?: string;
      address?: string;
    };
    almaty?: {
      city?: string;
      address?: string;
    };
    moscow?: {
      city?: string;
      address?: string;
    };
  };

  // Calculate Savings
  calculateSavings?: {
    title?: string;
    description?: string;
    button?: string;
  };

  // News
  news?: {
    title?: string;
  };

  // Footer
  footer?: {
    operatingHours?: string;
    workingDays?: string;
    contacts?: string;
    addressText?: string;
    socials?: string;
    rights?: string;
  };

  // Common
  common?: {
    home?: string;
    back?: string;
    next?: string;
    loading?: string;
  };
}

const dictionaries = {
  ru: () => import('./dictionaries/ru').then((module) => module.default),
  en: () => import('./dictionaries/en').then((module) => module.default),
  uz: () => import('./dictionaries/uz').then((module) => module.default),
};

/**
 * Получение словаря переводов (с фоллбэком на RU)
 */
export async function getDictionary(locale: Locale): Promise<Dictionary> {
  // Мы можем потом добавить логику получения с API:
  // try { const apiDict = await fetchFromApi(); return merge({}, dict, apiDict) } catch {}
  return dictionaries[locale]?.() ?? dictionaries.ru();
}

export type TranslationKey = keyof Dictionary;
