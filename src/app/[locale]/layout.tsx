import type { Metadata } from "next";
import { openSans, robotoCondensed, inter } from '@/lib/fonts';
import "@/styles/globals.scss";
import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";
import { Locale } from "@/lib/locales";

const BASE_URL = "https://rokacell.com";

const META: Record<Locale, { title: string; description: string; keywords: string }> = {
  ru: {
    title: "ROKACELL — Теплоизоляция из вспененного каучука в Узбекистане",
    description:
      "ROKACELL — производитель теплоизоляционных материалов из эластомерного каучука (NBR/PVC) в Центральной Азии. Рулоны, трубки и аксессуары для систем HVAC. Ташкент, Узбекистан.",
    keywords:
      "теплоизоляция Узбекистан, каучуковая изоляция, NBR изоляция, HVAC изоляция Ташкент, ROKACELL, рулоны изоляция, трубная изоляция, вспененный каучук",
  },
  uz: {
    title: "ROKACELL — O'zbekistonda elastomer izolyatsiya materiallari",
    description:
      "ROKACELL — Markaziy Osiyodagi elastomer kauchuk (NBR/PVC) asosidagi issiqlik izolyatsiyasining yetakchi ishlab chiqaruvchisi. HVAC tizimlari uchun rulonlar, quvurlar va aksessuarlar. Toshkent.",
    keywords:
      "issiqlik izolyatsiyasi O'zbekiston, kauchuk izolyatsiya, NBR izolyatsiya, HVAC izolyatsiya Toshkent, ROKACELL, rulonlar izolyatsiya, quvur izolyatsiya",
  },
  en: {
    title: "ROKACELL — Elastomeric Rubber Insulation Manufacturer in Uzbekistan",
    description:
      "ROKACELL is the leading manufacturer of elastomeric foam rubber insulation (NBR/PVC) in Central Asia. Rolls, tubes and accessories for HVAC systems. Tashkent, Uzbekistan.",
    keywords:
      "thermal insulation Uzbekistan, rubber insulation, NBR insulation, HVAC insulation Tashkent, ROKACELL, insulation rolls, pipe insulation, elastomeric foam",
  },
};

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const m = META[locale] ?? META.ru;

  return {
    title: {
      default: m.title,
      template: `%s | ROKACELL`,
    },
    description: m.description,
    keywords: m.keywords,
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        ru: `/ru`,
        uz: `/uz`,
        en: `/en`,
        "x-default": `/ru`,
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "uz" ? "uz_UZ" : locale === "en" ? "en_US" : "ru_RU",
      url: `${BASE_URL}/${locale}`,
      siteName: "ROKACELL",
      title: m.title,
      description: m.description,
      images: [
        {
          url: `${BASE_URL}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: "ROKACELL — Теплоизоляция из вспененного каучука",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: m.title,
      description: m.description,
      images: [`${BASE_URL}/og-image.jpg`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },
  };
}

export function generateStaticParams() {
  return [{ locale: "ru" }, { locale: "uz" }, { locale: "en" }];
}

export default async function LocalizedLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}>) {
  const { locale } = await params;
  return (
    <html lang={locale}>
      <body className={`${openSans.variable} ${robotoCondensed.variable} ${inter.variable}`}>

        <Header locale={locale} />

        {children}

        <Footer locale={locale} />

      </body>
    </html>
  );
}
