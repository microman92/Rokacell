import Image from 'next/image';
import { IMAGES } from '@/assets/images';
import styles from '../Hero.module.scss';

/**
 * Слайд 2 — The Benchmark of Quality in Insulation
 * Текст слева, логотип справа, 3 рулона внизу + голубая полоса
 */
export default function QualitySlide() {
  return (
    <>
      {/* Background */}
      <Image
        src={IMAGES.home.hero.bg.energyEfficiency}
        alt="Dark background with geometric lines"
        fill
        style={{ objectFit: 'cover' }}
        className={styles.slide__bg}
      />

      {/* Content — Left side */}
      <div className={`${styles.slide__content} ${styles.slide__content_splitLeft}`}>
        <h2 className={styles.slide__title}>
          THE BENCHMARK OF<br />
          QUALITY IN INSULATION
        </h2>
        <p className={styles.slide__text}>
          ROKACELL TUBES AND ROLLS — RELIABLE PROTECTION AGAINST HEAT LOSS AND CONDENSATION IN ANY OPERATING CONDITIONS
        </p>
      </div>

      {/* Logo — Right side */}
      <div className={styles.slide__logo}>
        <Image
          src={IMAGES.home.hero.overlay.insulationsLogo}
          alt="Rokacell Insulation logo"
          width={400}
          height={150}
        />
      </div>

      {/* Product rolls — Bottom */}
      <div className={styles.slide__products}>
        <Image
          src={IMAGES.home.hero.overlay.blackRoll}
          alt="Black elastomeric rubber roll"
          width={280}
          height={350}
          className={styles.productRoll}
        />
        <Image
          src={IMAGES.home.hero.overlay.rubberSheet}
          alt="Rubber sheet insulation"
          width={280}
          height={350}
          className={styles.productRoll}
        />
        <Image
          src={IMAGES.home.hero.overlay.foilRoll}
          alt="Foil covered insulation roll"
          width={280}
          height={350}
          className={styles.productRoll}
        />
      </div>

      {/* Blue bar — Bottom */}
      <div className={styles.slide__bottomBar} />
    </>
  );
}
