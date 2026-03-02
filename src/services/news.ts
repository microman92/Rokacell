import { NewsItem } from "@/data/news";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.rokacell.com/app/api/";

export interface ApiNewsItem {
  id: number;
  title: string;
  slug: string;
  preview: string;
  short_description: string;
}

export interface ApiNewsDetail {
  id: number;
  title: string;
  full_description: string;
  photo_1: string | null;
  photo_2: string | null;
  posts: ApiNewsItem[];
}

export function getMediaBaseUrl(): string {
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

function stripHtml(html: string): string {
  if (!html) return "";
  return decodeHtmlEntities(html)
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function getFullMediaUrl(path: string | null): string | null {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  return `${getMediaBaseUrl()}${path}`;
}

export function cleanDescription(raw: string): string {
  if (!raw) return "";
  let html = raw.replace(/<\/?pre>/gi, "").replace(/<\/?div>/gi, "");
  html = decodeHtmlEntities(html);
  html = html.replace(/\s*class="[^"]*"/gi, "");
  html = html.replace(/\\r\\n/g, "").replace(/\r\n/g, "");

  return html.trim();
}

function mapApiToNewsItem(apiItem: ApiNewsItem): NewsItem {
  const mediaBase = getMediaBaseUrl();
  return {
    id: String(apiItem.id),
    title: apiItem.title,
    description: stripHtml(apiItem.short_description),
    slug: String(apiItem.id),
    image: apiItem.preview.startsWith("http")
      ? apiItem.preview
      : `${mediaBase}${apiItem.preview}`,
    date: "",
  };
}

export async function getNews(locale: string): Promise<NewsItem[]> {
  try {
    const res = await fetch(`${API_URL}posts/`, {
      headers: {
        "Accept-Language": locale,
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      },
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }

    const data: ApiNewsItem[] = await res.json();
    return data.map(mapApiToNewsItem);
  } catch (error) {
    const { NEWS_DATA } = await import("@/data/news");
    return NEWS_DATA;
  }
}

export async function getNewsById(
  id: string,
  locale: string
): Promise<ApiNewsDetail | null> {
  try {
    const res = await fetch(`${API_URL}posts/${id}/`, {
      headers: {
        "Accept-Language": locale,
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      },
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }

    const data: ApiNewsDetail = await res.json();
    return data;
  } catch (error) {
    const { NEWS_DATA } = await import("@/data/news");
    const fallbackItem = NEWS_DATA.find((item) => item.id === id);
    if (!fallbackItem) return null;

    return {
      id: Number(fallbackItem.id),
      title: fallbackItem.title,
      full_description: fallbackItem.description || "",
      photo_1: fallbackItem.image?.src || fallbackItem.image || null,
      photo_2: null,
      posts: []
    } as ApiNewsDetail;
  }
}

export async function getOtherNews(
  currentId: string,
  locale: string
): Promise<NewsItem[]> {
  const allNews = await getNews(locale);
  return allNews.filter((item) => item.id !== currentId);
}
