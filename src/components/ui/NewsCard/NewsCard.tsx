import styles from "./NewsCard.module.scss";
import type { NewsItem } from "@/data/news";

import { cn } from "@/lib/utils";

interface NewsCardProps {
  item: NewsItem;
  isDynamicCard?: boolean;
}

export const NewsCard = ({ item, isDynamicCard }: NewsCardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img
          src={item.image}
          alt={item.title}
          className={styles.image}
          width={515}
          height={564}
          loading="lazy"
        />
      </div>
      <div className={cn(styles.content, isDynamicCard && styles.dynamicContent)}>
        <h3 className={styles.title}>{item.title}</h3>
        <p className={styles.description}>
          {item.description}
          <span className={styles.more}>ещё...</span>
        </p>
      </div>
    </div>
  );
};
