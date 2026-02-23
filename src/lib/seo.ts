import type { Metadata } from "next";
import type { Locale } from "@/lib/locales";

const BASE_URL = "https://rokacell.com";

/**
 * SEO-мета для каждой страницы, по каждому языку.
 * Единственное место хранения всех title/description.
 */
export const PAGE_SEO: Record<
  string,
  Record<Locale, { title: string; description: string }>
> = {
  home: {
    ru: {
      title: "Теплоизоляция из вспененного каучука — ROKACELL Узбекистан",
      description:
        "Официальный сайт ROKACELL — первого производителя эластомерной теплоизоляции в Центральной Азии. Рулоны и трубки NBR/PVC для HVAC систем. Соответствует EN 14304. Ташкент.",
    },
    uz: {
      title: "Elastomer izolyatsiya — ROKACELL O'zbekiston",
      description:
        "ROKACELL rasmiy sayti — Markaziy Osiyodagi birinchi elastomer issiqlik izolyatsiyasi ishlab chiqaruvchisi. HVAC uchun NBR/PVC rulonlar va quvurlar. EN 14304. Toshkent.",
    },
    en: {
      title: "Elastomeric Rubber Insulation — ROKACELL Uzbekistan",
      description:
        "Official ROKACELL website — the first elastomeric thermal insulation manufacturer in Central Asia. NBR/PVC rolls and tubes for HVAC systems. EN 14304 certified. Tashkent.",
    },
  },
  products: {
    ru: {
      title: "Продукция — Рулоны и трубки ROKAFLEX | ROKACELL Узбекистан",
      description:
        "Каталог теплоизоляционных материалов ROKACELL: рулоны ROKAFLEX ROLL STD, трубки, аксессуары для HVAC систем. Изготовлено из вспененного каучука NBR/PVC. Стандарт EN 14304.",
    },
    uz: {
      title: "Mahsulotlar — ROKAFLEX rulonlar va quvurlar | ROKACELL",
      description:
        "ROKACELL mahsulotlari katalogi: ROKAFLEX ROLL STD rulonlar, quvurlar, HVAC tizimlari uchun aksessuarlar. NBR/PVC ko'pirtirilgan kauchukdan tayyorlangan. EN 14304 standarti.",
    },
    en: {
      title: "Products — ROKAFLEX Rolls and Tubes | ROKACELL Uzbekistan",
      description:
        "ROKACELL product catalog: ROKAFLEX ROLL STD rolls, tubes and accessories for HVAC systems. Made from NBR/PVC foam rubber. EN 14304 certified.",
    },
  },
  about: {
    ru: {
      title: "О компании — ROKACELL, производитель теплоизоляции в Узбекистане",
      description:
        "ROKACELL — первый производитель эластомерной теплоизоляции в Центральной Азии. Основан в 2021 г. при участии турецкого партнёра KAIMANN. Мощность 3000 тонн в год. Сертификаты ISO 9001, ISO 14001, ISO 45001.",
    },
    uz: {
      title: "Kompaniya haqida — ROKACELL, O'zbekistondagi izolyatsiya ishlab chiqaruvchisi",
      description:
        "ROKACELL — Markaziy Osiyoda birinchi elastomer izolyatsiya ishlab chiqaruvchisi. 2021 yilda turk hamkori KAIMANN bilan tashkil etilgan. Yillik quvvat 3000 tonna. ISO 9001, 14001, 45001 sertifikatlari.",
    },
    en: {
      title: "About Us — ROKACELL, Thermal Insulation Manufacturer in Uzbekistan",
      description:
        "ROKACELL is the first elastomeric insulation manufacturer in Central Asia, founded in 2021 with Turkish partner KAIMANN. Annual capacity 3,000 MT. ISO 9001, ISO 14001, ISO 45001 certified.",
    },
  },
  contacts: {
    ru: {
      title: "Контакты — ROKACELL Ташкент, Алматы, Москва",
      description:
        "Контакты компании ROKACELL: офисы в Ташкенте (Узбекистан), Алматы (Казахстан) и Москве (Россия). Адреса, телефоны, режим работы. Свяжитесь с нами по вопросам теплоизоляции.",
    },
    uz: {
      title: "Kontaktlar — ROKACELL Toshkent, Olma-ota, Moskva",
      description:
        "ROKACELL kompaniyasi kontaktlari: Toshkent (O'zbekiston), Olma-ota (Qozog'iston) va Moskva (Rossiya) ofislari. Manzillar, telefon raqamlari, ish vaqti.",
    },
    en: {
      title: "Contacts — ROKACELL Tashkent, Almaty, Moscow",
      description:
        "ROKACELL offices in Tashkent (Uzbekistan), Almaty (Kazakhstan) and Moscow (Russia). Addresses, phone numbers and working hours. Contact us for insulation inquiries.",
    },
  },
  documents: {
    ru: {
      title: "Документы и сертификаты — ROKACELL | ISO, EN 14304",
      description:
        "Сертификаты соответствия, технические паспорта и документация ROKACELL. Сертификаты ISO 9001, ISO 14001, ISO 45001. Соответствие стандарту EN 14304 для Узбекистана и России.",
    },
    uz: {
      title: "Hujjatlar va sertifikatlar — ROKACELL | ISO, EN 14304",
      description:
        "ROKACELL muvofiqlik sertifikatlari, texnik pasportlar va hujjatlar. ISO 9001, ISO 14001, ISO 45001 sertifikatlari. O'zbekiston va Rossiya uchun EN 14304 standarti.",
    },
    en: {
      title: "Documents & Certificates — ROKACELL | ISO, EN 14304",
      description:
        "ROKACELL conformity certificates, technical passports and documentation. ISO 9001, ISO 14001, ISO 45001 certified. EN 14304 standard compliance for Uzbekistan and Russia.",
    },
  },
  logistics: {
    ru: {
      title: "Логистика — Доставка теплоизоляции ROKACELL по Центральной Азии",
      description:
        "Условия доставки продукции ROKACELL по Узбекистану, Казахстану и СНГ. Упаковка рулонов и трубок. Контейнерные перевозки 40HC, грузовые автомобили 45 м³ и 88 м³.",
    },
    uz: {
      title: "Logistika — ROKACELL izolyatsiyasini Markaziy Osiyoga yetkazib berish",
      description:
        "O'zbekiston, Qozog'iston va MDHga ROKACELL mahsulotlarini yetkazib berish shartlari. Rulonlar va quvurlar qadoqlash. 40HC konteyner, 45 m³ va 88 m³ yuk mashinalari.",
    },
    en: {
      title: "Logistics — ROKACELL Insulation Delivery Across Central Asia",
      description:
        "ROKACELL delivery terms across Uzbekistan, Kazakhstan and CIS. Roll and tube packaging details. Container transport 40HC, freight trucks 45 m³ and 88 m³.",
    },
  },
  calculator: {
    ru: {
      title: "Калькулятор — Расчёт теплопотерь и конденсации | ROKACELL",
      description:
        "Онлайн-калькулятор для расчёта теплопотерь и конденсации в трубопроводах и плоских поверхностях. Подбор толщины теплоизоляции ROKACELL для вашего проекта.",
    },
    uz: {
      title: "Kalkulyator — Issiqlik yo'qotish va kondensatsiya hisoblash | ROKACELL",
      description:
        "Quvurlar va tekis yuzalar uchun issiqlik yo'qotish va kondensatsiyani onlayn hisoblash. Loyihangiz uchun ROKACELL izolyatsiya qalinligini tanlash.",
    },
    en: {
      title: "Calculator — Heat Loss & Condensation Calculation | ROKACELL",
      description:
        "Online calculator for heat loss and condensation in pipes and flat surfaces. Select the right ROKACELL insulation thickness for your project.",
    },
  },
};

/**
 * Создаёт Metadata для страницы по ключу и локали.
 * Используется через `export const generateMetadata = createPageMetadata("home")`.
 */
export function createPageMetadata(pageKey: string, path?: string) {
  return async function generateMetadata({
    params,
  }: {
    params: Promise<{ locale: Locale }>;
  }): Promise<Metadata> {
    const { locale } = await params;
    const seo = PAGE_SEO[pageKey]?.[locale] ?? PAGE_SEO[pageKey]?.ru;

    if (!seo) {
      return { title: "ROKACELL" };
    }

    const pagePath = path ? `/${locale}${path}` : `/${locale}`;

    return {
      title: seo.title,
      description: seo.description,
      alternates: { canonical: `${BASE_URL}${pagePath}` },
    };
  };
}
