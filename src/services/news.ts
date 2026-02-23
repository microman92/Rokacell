import { NEWS_DATA, type NewsItem } from "@/data/news";

export async function getNews(_locale: string): Promise<NewsItem[]> {
  // Временно возвращаем только локальные (захардкоженные) данные для MVP
  return NEWS_DATA;
}
