import { Locale } from "@/lib/locales";

// ──────────────────────────
// Подтипы словаря переводов (ISP: Interface Segregation)
// ──────────────────────────

export interface NavDict {
  about?: string;
  documents?: string;
  products?: string;
  calculator?: string;
  logistics?: string;
  contacts?: string;
}

export interface HeroDict {
  slides?: Array<{
    title: string;
    subtitle?: string;
  }>;
}

export interface FeaturesDict {
  eco?: string;
  durability?: string;
  fireSafety?: string;
  energyEfficiency?: string;
}

export interface IndustriesDict {
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
}

export interface CalculatorDict {
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
    sheetsHeatLossTitle?: string;
    pipesCondensationTitle?: string;
    sheetsCondensationTitle?: string;
    parameters?: string;
    ambientTemp?: string;
    ambientTempDesc?: string;
    mediumTemp?: string;
    mediumTempDesc?: string;
    mediumTempSheetDesc?: string;
    pipeDiameter?: string;
    pipeDiameterDesc?: string;
    pipeDiameterDescH?: string;
    surfaceArea?: string;
    surfaceAreaDesc?: string;
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
    heatLossSheetDesc?: string;
    heatLossReduction?: string;
    heatLossReductionDesc?: string;
    heatLossReductionSheetDesc?: string;
    costPerHour?: string;
    costPerHourDesc?: string;
    calculateBtn?: string;
    helpBtn?: string;
    backBtn?: string;
    relativeHumidity?: string;
    relativeHumidityDesc?: string;
    dewPoint?: string;
    dewPointDesc?: string;
    minInsThickness?: string;
    minInsThicknessDesc?: string;
    heatTransferCoefficient?: string;
    heatTransferCoefficientDesc?: string;
    calculateHBtn?: string;
    nominalThickness?: string;
    nominalThicknessDesc?: string;
    contactSupport?: string;
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
      emissivityDesc?: string;
      sheetHeightM?: string;
      typeOfCladding?: string;
      relHumidity?: string;
      select?: string;
      continueBtn?: string;
      cancelBtn?: string;
    };
    helpModalHeatLoss?: {
      title?: string;
      p1?: string;
      p2?: string;
      p3?: string;
      p4?: string;
      fieldsTitle?: string;
      fAmbient?: string;
      fMedium?: string;
      fDiameter?: string;
      fThickness?: string;
      fWall?: string;
      fLength?: string;
      fMaterial?: string;
      fHeatTransfer?: string;
      fEnergyCost?: string;
      fCalcType?: string;
      fOrientation?: string;
      fEmissivity?: string;
      results?: string;
      units?: string;
      closeBtn?: string;
    };
    helpModalCondensation?: {
      title?: string;
      p1?: string;
      p2?: string;
      p3?: string;
      p4?: string;
      fieldsTitle?: string;
      fAmbient?: string;
      fMedium?: string;
      fDiameter?: string;
      fMaterial?: string;
      fHeatTransfer?: string;
      fRelHumidity?: string;
      fCalcType?: string;
      fOrientation?: string;
      fEmissivity?: string;
      fSheetHeight?: string;
      fCladding?: string;
      results?: string;
      units?: string;
      closeBtn?: string;
    };
  };
}

export interface ProductsDict {
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
}

export interface AboutVideoDict {
  text?: string;
}

export interface BranchesDict {
  title?: string;
  tashkent?: { city?: string; address?: string };
  almaty?: { city?: string; address?: string };
  moscow?: { city?: string; address?: string };
}

export interface CalculateSavingsDict {
  title?: string;
  description?: string;
  button?: string;
}

export interface NewsDict {
  title?: string;
}

export interface FooterDict {
  operatingHours?: string;
  workingDays?: string;
  contacts?: string;
  addressText?: string;
  socials?: string;
  rights?: string;
}

export interface CommonDict {
  home?: string;
  back?: string;
  next?: string;
  loading?: string;
}

export interface LogisticsDict {
  hero?: { title?: string; description?: string };
  categories?: {
    rolls?: { title?: string; description?: string };
    tubes?: { title?: string; description?: string };
  };
  transport?: { truck45?: string; truck88?: string; container40?: string };
  subtitles?: { compact?: string; increased?: string; international?: string };
  labels?: { rollWidth?: string; rollVolume?: string; boxVolume?: string; quantity?: string };
  units?: { pcs?: string; m3?: string };
}

export interface AboutDict {
  hero?: { title: string; description: string };
  info?: {
    title: string;
    p1_1: string; p1_2: string;
    p2_1: string; p2_2: string; p2_3: string; p2_4: string;
  };
  factory?: {
    p1_1: string; p1_2: string;
    p2_1: string; p2_2: string;
    p3_1: string; p3_2: string;
  };
  policy?: {
    header: { title: string; subtitle: string };
    mission: {
      title: string;
      p1_1: string; p1_2: string;
      p2: string;
      p3_1: string; p3_2: string; p3_3: string;
    };
    areas: {
      title: string;
      img_title_1: string;
      img_title_2: string;
      items: Array<{
        id: number;
        title: string;
        content: { p1?: string; p2?: string; list?: string[] };
      }>;
    };
    disclaimer: string;
  };
}

export interface DocumentsDict {
  hero?: { title?: string; description?: string };
  passport?: { title?: string };
  certificates?: { title?: string };
  quality?: { text?: string };
  data?: {
    download?: string;
    passports?: { rolls?: string; tubes?: string };
    certificates?: { conformityUz?: string; conformityRu?: string };
  };
}

// ──────────────────────────
// Составной тип словаря (обратная совместимость)
// ──────────────────────────

export interface Dictionary {
  nav?: NavDict;
  hero?: HeroDict;
  features?: FeaturesDict;
  industries?: IndustriesDict;
  calculator?: CalculatorDict;
  products?: ProductsDict;
  aboutVideo?: AboutVideoDict;
  branches?: BranchesDict;
  calculateSavings?: CalculateSavingsDict;
  news?: NewsDict;
  footer?: FooterDict;
  common?: CommonDict;
  logistics?: LogisticsDict;
  about?: AboutDict;
  documents?: DocumentsDict;
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
