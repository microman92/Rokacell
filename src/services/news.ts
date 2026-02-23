import { NEWS_DATA, type NewsItem } from "@/data/news";

export async function getNews(_locale: string): Promise<NewsItem[]> {
  
  return NEWS_DATA;
}
