import type { PhotoBranch } from '../branches.data';
import styles from '../Branches.module.scss';

interface BranchPhotoSlideProps {
  data: PhotoBranch;
}

/**
 * Слайд филиала с фото завода на фоне (Tashkent)
 */
export default function BranchPhotoSlide({ data }: BranchPhotoSlideProps) {
  return (
    <div className={`${styles.branches__slide} ${styles['branches__slide--photo']}`}>
      {/* Фото на абсолюте как фон */}
      <img
        src={data.image}
        alt={data.city}
        className={styles.branches__bg}
      />

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
