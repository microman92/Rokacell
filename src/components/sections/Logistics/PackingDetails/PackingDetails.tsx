import Image from 'next/image';
import styles from './PackingDetails.module.scss';
import Container from '@/components/layout/Container/Container';
import { PACKING_DATA, PackingItem } from '@/data/packingData';

// --- Components ---

const PackingCard = ({ item }: { item: PackingItem }) => {
  return (
    <div className={styles.card}>
      {/* Text Content */}
      <div className={styles.card__content}>
        <h3 className={styles.card__title}>{item.title}</h3>
        {item.subtitle && <p className={styles.card__subtitle}>{item.subtitle}</p>}

        <div className={styles.card__specs}>
          {item.specs.map((spec, i) => (
            <div key={i} className={styles.card__specRow}>
              <span className={styles.card__paramTitle}>{spec.label}</span>
              <div className={styles.card__values}>
                {spec.values.map((val, j) => (
                  <div key={j} className={styles.card__valueRow}>
                    {val.dim && <span className={styles.card__valueDim}>{val.dim}</span>}
                    <span className={styles.card__valueQty}>{val.qty}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Image */}
      <div className={styles.card__imageWrapper}>
        <Image
          src={item.image}
          alt={item.title}
          width={600}
          height={400}
          quality={90}
        />
      </div>
    </div>
  );
};

export default function PackingDetails() {
  return (
    <section className={styles.packingDetails}>
      <Container>
        {PACKING_DATA.map((category, catIndex) => (
          <div key={catIndex} className={styles.category}>
            {/* Header */}
            <div className={styles.category__header}>
              <h2 className={styles.category__title}>{category.title}</h2>
              <p className={styles.category__desc}>{category.description}</p>
            </div>

            {/* Cards */}
            <div className={styles.category__items}>
              {category.items.map((item) => (
                <PackingCard key={item.key} item={item} />
              ))}
            </div>
          </div>
        ))}
      </Container>
    </section>
  );
}
