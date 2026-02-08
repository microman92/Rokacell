import styles from "./MarqueeStrip.module.scss";
import { cn } from "@/lib/utils";

export interface MarqueeItem {
  icon?: string;
  text: string;
}

interface MarqueeStripProps {
  items: MarqueeItem[];
  className?: string;
}

export default function MarqueeStrip({ items, className }: MarqueeStripProps) {
  // Дублируем 4 раза для бесшовной анимации
  const duplicatedItems = [...items, ...items, ...items, ...items];

  return (
    <div className={cn(styles.strip, className)}>
      <div className={styles.strip__track}>
        {duplicatedItems.map((item, index) => (
          <div key={index} className={styles.strip__item}>
            {item.icon && <img src={item.icon} alt={item.text} className={styles.strip__icon} />}
            <span className={styles.strip__text}>{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
