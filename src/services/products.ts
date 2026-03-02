import { PRODUCTS, Product } from "@/data/products";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.rokacell.com/app/api/";

export interface ApiProduct {
  id: number;
  title: string;
  description: string;
  preview: string;
  category: {
    id: number;
    title: string;
    slug: string;
  };
}

/**
 * Получить базовый URL для медиа-файлов
 */
function getMediaBaseUrl(): string {
  try {
    const url = new URL(API_URL);
    return url.origin;
  } catch {
    return "https://api.rokacell.com";
  }
}

function decodeHtmlEntities(html: string): string {
  if (!html) return "";
  return html
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ");
}

/**
 * Убрать HTML-теги из строки
 */
function stripHtml(html: string): string {
  if (!html) return "";
  return decodeHtmlEntities(html)
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Привести данные из API к формату Product
 */
function mapApiToProduct(apiItem: ApiProduct): Product {
  const mediaBase = getMediaBaseUrl();
  const rawDesc = apiItem.description || "";

  return {
    id: String(apiItem.id),
    name: apiItem.title,
    description: stripHtml(rawDesc),
    fullDescription: decodeHtmlEntities(rawDesc),
    category: apiItem.category.slug as Product["category"],
    image: apiItem.preview.startsWith("http")
      ? apiItem.preview
      : `${mediaBase}${apiItem.preview}`,
  };
}

/**
 * Получить список продуктов
 */
export async function getProducts(locale: string): Promise<Product[]> {
  try {
    const res = await fetch(`${API_URL}products/`, {
      headers: {
        "Accept-Language": locale,
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      },
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }

    const data: ApiProduct[] = await res.json();
    return data.map(mapApiToProduct);
  } catch (error) {
    return PRODUCTS;
  }
}
