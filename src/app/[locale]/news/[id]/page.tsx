import { notFound } from "next/navigation";
import { Locale } from "@/lib/locales";
import { getNewsById, getOtherNews } from "@/services/news";
import { getDictionary } from "@/lib/i18n";
import Container from "@/components/layout/Container/Container";
import styles from "./newsDetail.module.scss";
import Link from "next/link";
import type { Metadata } from "next";
import { OtherNewsSlider } from "./OtherNewsSlider";

export const revalidate = 60;

interface PageParams {
  params: Promise<{ locale: Locale; id: string }>;
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { locale, id } = await params;
  const newsItem = await getNewsById(id, locale);

  if (!newsItem) {
    return { title: "Новость не найдена" };
  }

  return {
    title: newsItem.title,
    description: newsItem.title,
  };
}

/**
 * Получить базовый URL для медиа-файлов
 */
function getMediaBaseUrl(): string {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.rokacell.com/app/api/";
  try {
    const url = new URL(API_URL);
    return url.origin;
  } catch {
    return "https://api.rokacell.com";
  }
}

/**
 * Очистить HTML от экранированных тегов из <pre>, оставив чистый текст с p-тегами
 */
function cleanDescription(raw: string): string {
  // Убираем <pre> и </pre> обёртки
  let html = raw
    .replace(/<\/?pre>/gi, "")
    .replace(/<\/?div>/gi, "");

  // Декодируем HTML-сущности (&lt; &gt; &amp; и т.д.)
  html = html
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");

  // Убираем class атрибуты
  html = html.replace(/\s*class="[^"]*"/gi, "");

  // Убираем \r\n и лишние пробелы внутри тегов
  html = html.replace(/\\r\\n/g, "").replace(/\r\n/g, "");

  return html.trim();
}

export default async function NewsDetailPage({ params }: PageParams) {
  const { locale, id } = await params;
  const dict = await getDictionary(locale);

  const newsItem = await getNewsById(id, locale);

  if (!newsItem) {
    notFound();
  }

  const mediaBase = getMediaBaseUrl();

  const mainImage = newsItem.photo_1
    ? newsItem.photo_1.startsWith("http")
      ? newsItem.photo_1
      : `${mediaBase}${newsItem.photo_1}`
    : null;

  const secondImage = newsItem.photo_2
    ? newsItem.photo_2.startsWith("http")
      ? newsItem.photo_2
      : `${mediaBase}${newsItem.photo_2}`
    : null;

  const cleanedContent = cleanDescription(newsItem.full_description);

  // Получить другие новости для слайдера
  const otherNews = await getOtherNews(id, locale);

  const backText =
    locale === "ru" ? "← Назад к новостям" : locale === "uz" ? "← Yangiliklarga qaytish" : "← Back to news";

  const otherNewsTitle =
    locale === "ru" ? "ДРУГИЕ НОВОСТИ" : locale === "uz" ? "BOSHQA YANGILIKLAR" : "OTHER NEWS";

  return (
    <main className="main">
      <section className={styles.newsDetail}>
        <Container>
          <Link href={`/news`} className={styles.backLink}>
            {backText}
          </Link>

          <div className={styles.header}>
            <h1 className={styles.title}>{newsItem.title}</h1>
          </div>

          {mainImage && (
            <img
              src={mainImage}
              alt={newsItem.title}
              className={styles.heroImage}
              width={1200}
              height={600}
            />
          )}

          <div className={styles.content}>
            <div dangerouslySetInnerHTML={{ __html: cleanedContent }} />

            {secondImage && (
              <img
                src={secondImage}
                alt={newsItem.title}
                className={styles.secondImage}
                width={1200}
                height={500}
              />
            )}
          </div>
        </Container>
      </section>

      {otherNews.length > 0 && (
        <OtherNewsSlider news={otherNews} title={otherNewsTitle} dict={dict.news} />
      )}
    </main>
  );
}
