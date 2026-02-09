import Image from 'next/image';
import type { ProductBranch } from '../branches.data';
import styles from '../Branches.module.scss';

interface BranchProductSlideProps {
  data: ProductBranch;
}

/**
 * Слайд филиала с продукцией и логотипом (Almaty, Moscow)
 */
export default function BranchProductSlide({ data }: BranchProductSlideProps) {
  return (
    <div className={`${styles.branches__slide} ${styles['branches__slide--products']}`}>
      {/* Левая часть: логотип + картинка продукции */}
      <div className={styles.branches__visual}>
        <img
          src={data.logo}
          alt="Rokacell logo"
          className={styles.branches__logo}
          width={525}
          height={170}
        />
        <Image
          src={data.image}
          alt={data.city}
          className={styles.branches__productImage}
          width={525}
          height={170}
        />
      </div>

      {/* Информация о филиале */}
      <div className={styles.branches__info}>
        <h3 className={styles.branches__city}>{data.city}</h3>
        {data.address && (
          <p className={styles.branches__address}>{data.address}</p>
        )}
        <p className={styles.branches__email}>{data.email}</p>
        {data.phones.map((phone, i) => (
          <p key={i} className={styles.branches__phones}>{phone}</p>
        ))}
      </div>
    </div>
  );
}
