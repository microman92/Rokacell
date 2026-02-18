
import { IMAGES } from "@/assets/images";
import styles from "../Hero.module.scss";
import Container from "@/components/layout/Container/Container";
import { Heading } from "@/components/ui/Heading/Heading";

/**
 * Слайд 2 — The Benchmark of Quality in Insulation
 * Текст слева, логотип справа, 3 рулона внизу + голубая полоса
 */
export default function QualitySlide() {
  return (
    <>
      {/* Background */}
      <img
        src={IMAGES.home.hero.bg.energyEfficiency}
        alt="Dark background with geometric lines"
        width={950}
        height={700}
        className={styles.slide__decor}
        loading="lazy"
      />

      <div className={styles.hero__content}>
        <Container className={`${styles.slide__content} ${styles.slide__content_splitLeft}`}>
          <div className={`${styles.slide__content_desc}`}>
            <Heading tag="h2" className={styles.slide__title}>THE BENCHMARK OF QUALITY IN INSULATION</Heading>
            <p className={styles.slide__text}>
              ROKACELL TUBES AND ROLLS — RELIABLE PROTECTION AGAINST HEAT LOSS AND CONDENSATION IN
              ANY OPERATING CONDITIONS
            </p>
          </div>
          <div className={styles.slide__logo}>
            <img
              src={IMAGES.home.hero.overlay.insulationsLogo}
              alt="Rokacell Insulation logo"
              loading="lazy"
            />
          </div>
        </Container>
        {/* Blue bar — Bottom */}
        <div className={styles.slide__bottomBar}>
          <Container className={styles.slide__products}>
            <img
              src={IMAGES.home.hero.overlay.foilRoll}
              alt="Foil covered insulation roll"
              className={styles.productRoll}
              loading="lazy"
            />
            <img
              src={IMAGES.home.hero.overlay.rubberSheet}
              alt="Rubber sheet insulation"
              className={styles.productRoll}
              loading="lazy"
            />
            <img
              src={IMAGES.home.hero.overlay.blackRoll}
              alt="Black elastomeric rubber roll"
              className={styles.productRoll}
              loading="lazy"
            />
          </Container>
        </div>
      </div>
    </>
  );
}
