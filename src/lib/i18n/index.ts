import { Locale } from "@/lib/locales";

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

  // Calculator Page
  calculator?: {
    hero?: {
      titlePart1?: string;
      titleHighlight1?: string;
      titlePart2?: string;
      titleHighlight2?: string;
      titlePart3?: string;
    };
    form?: {
      title?: string;
      subtitle?: string;
      fields?: {
        fullName?: string;
        phone?: string;
        email?: string;
        company?: string;
      };
      submit?: string;
      loading?: string;
      disclaimer1?: string;
      disclaimer2?: string;
      errors?: {
        fullName?: string;
        phone?: string;
        emailReq?: string;
        emailInv?: string;
        company?: string;
      };
    };
    navigation?: {
      title?: string;
      subtitle?: string;
      categories?: { pipes?: string; sheets?: string };
      items?: {
        pipesHeatLoss?: { title?: string; desc?: string };
        pipesCond?: { title?: string; desc?: string };
        sheetsHeatLoss?: { title?: string; desc?: string };
        sheetsCond?: { title?: string; desc?: string };
      };
    };
    calc?: {
      pipesHeatLossTitle?: string;
      parameters?: string;
      ambientTemp?: string;
      ambientTempDesc?: string;
      mediumTemp?: string;
      mediumTempDesc?: string;
      pipeDiameter?: string;
      pipeDiameterDesc?: string;
      pipeDiameterDescH?: string;
      insulationThickness?: string;
      insulationThicknessDesc?: string;
      pipeLength?: string;
      pipeLengthDesc?: string;
      insulationMaterial?: string;
      insulationMaterialDesc?: string;
      hCoefficient?: string;
      hCoefficientDesc?: string;
      calcHBtn?: string;
      energyCost?: string;
      energyCostDesc?: string;
      results?: string;
      meanLambda?: string;
      meanLambdaDesc?: string;
      thermalTransmittance?: string;
      thermalTransmittanceDesc?: string;
      heatLoss?: string;
      heatLossDesc?: string;
      heatLossReduction?: string;
      heatLossReductionDesc?: string;
      costPerHour?: string;
      costPerHourDesc?: string;
      calculateBtn?: string;
      helpBtn?: string;
      backBtn?: string;
      hModal?: {
        title?: string;
        calcType?: string;
        calcTypeDesc?: string;
        inside?: string;
        outside?: string;
        orientation?: string;
        vertical?: string;
        horizontal?: string;
        additionalSettings?: string;
        emissivity?: string;
        continueBtn?: string;
        cancelBtn?: string;
      };
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
    hero?: {
      titlePart1?: string;
      titleHighlight?: string;
      titlePart2?: string;
      description?: string;
    };
    description?: string;
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

  // Logistics Page
  logistics?: {
    hero?: {
      title?: string;
      description?: string;
    };
    categories?: {
      rolls?: {
        title?: string;
        description?: string;
      };
      tubes?: {
        title?: string;
        description?: string;
      };
    };
    transport?: {
      truck45?: string;
      truck88?: string;
      container40?: string;
    };
    subtitles?: {
      compact?: string;
      increased?: string;
      international?: string;
    };
    labels?: {
      rollWidth?: string;
      rollVolume?: string;
      boxVolume?: string;
      quantity?: string;
    };
    units?: {
      pcs?: string;
      m3?: string;
    };
  };

  // About Page
  about?: {
    hero?: {
      title: string;
      description: string;
    };
    info?: {
      title: string;
      p1_1: string;
      p1_2: string;
      p2_1: string;
      p2_2: string;
      p2_3: string;
      p2_4: string;
    };
    factory?: {
      p1_1: string;
      p1_2: string;
      p2_1: string;
      p2_2: string;
      p3_1: string;
      p3_2: string;
    };
    policy?: {
      header: {
        title: string;
        subtitle: string;
      };
      mission: {
        title: string;
        p1_1: string;
        p1_2: string;
        p2: string;
        p3_1: string;
        p3_2: string;
        p3_3: string;
      };
      areas: {
        title: string;
        img_title_1: string;
        img_title_2: string;
        items: Array<{
          id: number;
          title: string;
          content: {
            p1?: string;
            p2?: string;
            list?: string[];
          };
        }>;
      };
      disclaimer: string;
    };
  };

  // Documents Page
  documents?: {
    hero?: {
      title?: string;
      description?: string;
    };
    passport?: {
      title?: string;
    };
    certificates?: {
      title?: string;
    };
    quality?: {
      text?: string;
    };
    data?: {
      download?: string;
      passports?: {
        rolls?: string;
        tubes?: string;
      };
      certificates?: {
        conformityUz?: string;
        conformityRu?: string;
      };
    };
  };
}

const dictionaries = {
  ru: () => import("./dictionaries/ru").then((module) => module.default),
  en: () => import("./dictionaries/en").then((module) => module.default),
  uz: () => import("./dictionaries/uz").then((module) => module.default),
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
