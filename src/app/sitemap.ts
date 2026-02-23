import { MetadataRoute } from "next";

const BASE_URL = "https://rokacell.com";
const LOCALES = ["ru", "uz", "en"] as const;

const STATIC_PAGES = [
  { path: "", priority: 1.0, changeFrequency: "weekly" as const },
  { path: "/products", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/contacts", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/documents", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/logistics", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/calculator", priority: 0.6, changeFrequency: "monthly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const page of STATIC_PAGES) {
    
    const alternates: Record<string, string> = {};
    for (const locale of LOCALES) {
      alternates[locale] = `${BASE_URL}/${locale}${page.path}`;
    }

    for (const locale of LOCALES) {
      entries.push({
        url: `${BASE_URL}/${locale}${page.path}`,
        lastModified: new Date(),
        changeFrequency: page.changeFrequency,
        priority: locale === "ru" ? page.priority : page.priority - 0.05,
        alternates: { languages: alternates },
      });
    }
  }

  return entries;
}
