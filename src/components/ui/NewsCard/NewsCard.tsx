import styles from "./NewsCard.module.scss";
import type { NewsItem } from "@/data/news";

interface NewsCardProps {
  item: NewsItem;
}

export const NewsCard = ({ item }: NewsCardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={item.image} alt={item.title} className={styles.image} width={515} height={564} loading="lazy" />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{item.title}</h3>
        <p className={styles.description}>
          {item.description}
          <span className={styles.more}>more...</span>
        </p>
      </div>
    </div>
  );
};
