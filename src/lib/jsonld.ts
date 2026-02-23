/**
 * JSON-LD schema builders for ROKACELL.
 * Used on pages for Google structured data (rich results).
 */

const BASE_URL = "https://rokacell.com";

/** Organization + Local Business schema */
export function organizationSchema(locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness", "Manufacturer"],
    "@id": `${BASE_URL}/#organization`,
    name: "ROKACELL",
    legalName: 'СП ООО "ROKACELL"',
    url: `${BASE_URL}/${locale}`,
    logo: {
      "@type": "ImageObject",
      url: `${BASE_URL}/logo.svg`,
      width: 200,
      height: 60,
    },
    image: `${BASE_URL}/og-image.jpg`,
    description:
      "Первый производитель эластомерной теплоизоляции в Центральной Азии. Изделия из вспененного синтетического каучука (NBR/PVC) для систем HVAC.",
    foundingDate: "2021",
    numberOfEmployees: { "@type": "QuantitativeValue", value: 50 },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Обихает кучаси, 17",
      addressLocality: "Ташкент",
      addressRegion: "Ташкент",
      addressCountry: "UZ",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 41.2995,
      longitude: 69.2401,
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: ["Russian", "Uzbek", "English"],
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Теплоизоляционные материалы",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: "ROKAFLEX ROLL STD",
            description:
              "Эластомерная изоляция из вспененного каучука в рулонах. Стандарт EN 14304.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: "ROKAFLEX TUBE",
            description: "Эластомерные трубки для изоляции трубопроводов HVAC систем. EN 14304.",
          },
        },
      ],
    },
    sameAs: [
      "https://www.instagram.com/rokacell",
      "https://www.facebook.com/rokacell",
      "https://t.me/rokacell",
    ],
  };
}

/** BreadcrumbList schema */
export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/** Product schema for products page */
export function productListSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Продукция ROKACELL",
    description:
      "Теплоизоляционные материалы из вспененного эластомерного каучука для систем HVAC",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@type": "Product",
          name: "ROKAFLEX ROLL STD",
          brand: { "@type": "Brand", name: "ROKACELL" },
          manufacturer: { "@type": "Organization", name: "ROKACELL" },
          category: "Теплоизоляция / Рулоны",
          description:
            "Рулонная эластомерная теплоизоляция из вспененного каучука NBR. Высокое сопротивление диффузии водяного пара. Соответствует EN 14304.",
          material: "NBR / Синтетический каучук",
          countryOfOrigin: "UZ",
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@type": "Product",
          name: "ROKAFLEX TUBE",
          brand: { "@type": "Brand", name: "ROKACELL" },
          manufacturer: { "@type": "Organization", name: "ROKACELL" },
          category: "Теплоизоляция / Трубки",
          description:
            "Трубчатая эластомерная теплоизоляция для изоляции трубопроводов HVAC систем. Стандарт EN 14304.",
          material: "NBR / Синтетический каучук",
          countryOfOrigin: "UZ",
        },
      },
    ],
  };
}

/** FAQ schema for home page — часто ищут в Узбекистане */
export function faqSchema(locale: string) {
  const faqs: Record<string, Array<{ q: string; a: string }>> = {
    ru: [
      {
        q: "Где купить теплоизоляцию ROKACELL в Ташкенте?",
        a: "ROKACELL расположена в Ташкенте — Сергелийский район, Обихает кучаси, 17. Свяжитесь с нами для заказа.",
      },
      {
        q: "Какие сертификаты есть у продукции ROKACELL?",
        a: "Продукция ROKACELL сертифицирована по ISO 9001, ISO 14001, ISO 45001 и соответствует европейскому стандарту EN 14304.",
      },
      {
        q: "Для чего применяется эластомерная теплоизоляция?",
        a: "Для изоляции трубопроводов, воздуховодов и оборудования систем HVAC (отопление, вентиляция, кондиционирование).",
      },
    ],
    uz: [
      {
        q: "Toshkentda ROKACELL izolyatsiyasini qayerdan sotib olish mumkin?",
        a: "ROKACELL Toshkentda joylashgan — Sergeli tumani, Obihaet ko'chasi, 17. Buyurtma berish uchun biz bilan bog'laning.",
      },
      {
        q: "ROKACELL mahsulotlari qanday sertifikatlarga ega?",
        a: "ROKACELL mahsulotlari ISO 9001, ISO 14001, ISO 45001 va Evropa standarti EN 14304 bo'yicha sertifikatlangan.",
      },
    ],
    en: [
      {
        q: "Where to buy ROKACELL insulation in Tashkent?",
        a: "ROKACELL is located in Tashkent — 17 Obihaet Street, Sergeli District. Contact us to place an order.",
      },
      {
        q: "What certifications does ROKACELL hold?",
        a: "ROKACELL products are certified under ISO 9001, ISO 14001, ISO 45001 and comply with EN 14304 European standard.",
      },
    ],
  };

  const items = faqs[locale] ?? faqs.ru ?? [];
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}
