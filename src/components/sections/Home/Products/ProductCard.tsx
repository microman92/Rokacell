import Image from 'next/image';
import type { Product } from '@/data/products';
import styles from './Products.module.scss';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <article
      className={styles.card}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <div className={styles.card__imageWrapper}>
        <Image
          src={product.image}
          alt={product.name}
          width={205}
          height={194}
          className={styles.card__image}
        />
      </div>
      <div className={styles.card__content}>
        <h3 className={styles.card__title}>{product.name}</h3>
        <p className={styles.card__description}>
          {product.description}
          <span className={styles.card__moreBtn}>more...</span>
        </p>
      </div>
    </article>
  );
}
