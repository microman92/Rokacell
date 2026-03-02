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

/**
 * Получить базовый URL для медиа-файлов (без /app/api/)
 */
export function getMediaBaseUrl(): string {
  // API_URL = "https://api.rokacell.com/app/api/"
  // Нам нужен "https://api.rokacell.com"
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
 * Получить полный URL для картинки (добавляет базовый домен, если нужно)
 */
export function getFullMediaUrl(path: string | null): string | null {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  return `${getMediaBaseUrl()}${path}`;
}

/**
 * Очистить HTML от экранированных тегов из <pre>, оставив чистый текст с p-тегами
 */
export function cleanDescription(raw: string): string {
  if (!raw) return "";

  // Убираем <pre> и </pre> обёртки, и <div>
  let html = raw.replace(/<\/?pre>/gi, "").replace(/<\/?div>/gi, "");

  // Декодируем HTML-сущности (&lt; &gt; &amp; и т.д.)
  html = decodeHtmlEntities(html);

  // Убираем class атрибуты
  html = html.replace(/\s*class="[^"]*"/gi, "");

  // Убираем \r\n и лишние пробелы внутри тегов
  html = html.replace(/\\r\\n/g, "").replace(/\r\n/g, "");

  return html.trim();
}

/**
 * Привести данные из API к формату NewsItem
 */
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

/**
 * Получить список всех новостей
 */
export async function getNews(locale: string): Promise<NewsItem[]> {
  try {
    const res = await fetch(`${API_URL}posts/`, {
      headers: {
        "Accept-Language": locale,
      },
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }

    const data: ApiNewsItem[] = await res.json();
    return data.map(mapApiToNewsItem);
  } catch (error) {
    console.error("Ошибка загрузки новостей из API:", error);
    // Фоллбэк на локальные данные
    const { NEWS_DATA } = await import("@/data/news");
    return NEWS_DATA;
  }
}

/**
 * Получить детальную информацию о новости по ID
 */
export async function getNewsById(
  id: string,
  locale: string
): Promise<ApiNewsDetail | null> {
  try {
    const res = await fetch(`${API_URL}posts/${id}/`, {
      headers: {
        "Accept-Language": locale,
      },
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }

    const data: ApiNewsDetail = await res.json();
    return data;
  } catch (error) {
    console.error("Ошибка загрузки новости из API:", error);
    return null;
  }
}

/**
 * Получить все новости кроме указанной (для "Другие новости")
 */
export async function getOtherNews(
  currentId: string,
  locale: string
): Promise<NewsItem[]> {
  const allNews = await getNews(locale);
  return allNews.filter((item) => item.id !== currentId);
}
