import { notFound } from "next/navigation";
import { Locale } from "@/lib/locales";
import { getNewsById, getOtherNews, getFullMediaUrl, cleanDescription } from "@/services/news";
import { getDictionary } from "@/lib/i18n";
import styles from "./newsDetail.module.scss";
import Link from "next/link";
import type { Metadata } from "next";
import { OtherNewsSlider } from "./OtherNewsSlider";
import Heading from "@/components/ui/Heading/Heading";

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


export default async function NewsDetailPage({ params }: PageParams) {
  const { locale, id } = await params;
  const dict = await getDictionary(locale);

  const newsItem = await getNewsById(id, locale);

  if (!newsItem) {
    notFound();
  }

  const mainImage = getFullMediaUrl(newsItem.photo_1);
  const secondImage = getFullMediaUrl(newsItem.photo_2);
  const cleanedContent = cleanDescription(newsItem.full_description);

  // Получить другие новости для слайдера
  const otherNews = await getOtherNews(id, locale);



  return (
    <main className="main">
      <section className={styles.detail}>
        <Link href={`/`} className={styles.detail__link}>
          {dict.news?.backToNews || "←"}
        </Link>

        <Heading tag="h1" variant="black" className={styles.detail__title}>{newsItem.title}</Heading>

        <div className={styles.detail__image}>
          {mainImage && (
            <img
              src={mainImage}
              alt={newsItem.title}
              className={styles.heroImage}
              width={670}
              height={700}
            />
          )}
        </div>

        <div className={styles.content} dangerouslySetInnerHTML={{ __html: cleanedContent }}>

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
      </section>

      {otherNews.length > 0 && dict.news && (
        <OtherNewsSlider news={otherNews} title={dict.news.otherNews || ""} dict={dict.news} />
      )}
    </main>
  );
}
