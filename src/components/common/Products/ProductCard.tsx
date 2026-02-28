import { memo } from 'react';
import type { Product } from '@/data/products';
import styles from './Products.module.scss';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
  readMoreText?: string;
}

const ProductCard = memo(function ProductCard({ product, onClick, readMoreText = "читать далее..." }: ProductCardProps) {
  return (
    <article
      className={styles.card}
      onClick={() => onClick(product)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(product);
        }
      }}
    >
      <div className={styles.card__imageWrapper}>
        <img
          src={product.image}
          alt={product.name}
          width={205}
          height={194}
          className={styles.card__image}
          loading="lazy"
        />
      </div>
      <div className={styles.card__content}>
        <h3 className={styles.card__title}>{product.name}</h3>
        <p className={styles.card__description}>
          {product.description}
        </p>
        <span className={styles.card__moreBtn}> {readMoreText}</span>
      </div>
    </article>
  );
});

export default ProductCard;
