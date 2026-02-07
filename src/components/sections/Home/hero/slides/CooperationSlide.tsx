import Image from 'next/image';
import { IMAGES } from '@/assets/images';
import styles from '../Hero.module.scss';

/**
 * Слайд 3 — International Cooperation of Rokacell
 * Карта СНГ как фон, текст слева-внизу
 */
export default function CooperationSlide() {
  return (
    <>
      {/* Background — Map */}
      <Image
        src={IMAGES.home.hero.bg.international}
        alt="Map showing Rokacell international cooperation in CIS region"
        fill
        style={{ objectFit: 'cover' }}
        className={styles.slide__bg}
      />

      {/* Content — Left bottom */}
      <div className={`${styles.slide__content} ${styles.slide__content_leftBottom}`}>
        <h2 className={styles.slide__title}>
          INTERNATIONAL<br />
          COOPERATION OF ROKACELL
        </h2>
      </div>
    </>
  );
}
