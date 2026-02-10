
import { IMAGES } from "@/assets/images";
import styles from "../Hero.module.scss";
import Container from "@/components/layout/Container/Container";

/**
 * Слайд 1 — Efficient Thermal Insulation
 * Тёмный фон с продуктом, текст слева-сверху
 */
export default function ThermalSlide() {
  return (
    <>
      {/* Background */}
      <img
        src={IMAGES.home.hero.bg.insulation}
        alt="Rokacell efficient thermal insulation"
        style={{ position: 'absolute', width: '100%', height: '100%', inset: 0, objectFit: 'cover' }}
        className={styles.slide__bg}
        loading="eager"
        fetchPriority="high"
      />

      <Container className={`${styles.slide__content} ${styles.slide__content_leftTop}`}>
        <h2 className={styles.slide__title}>EFFICIENT THERMAL INSULATION</h2>
        <p className={styles.slide__text}>ELASTOMERIC RUBBER FOAM PRODUCTS</p>
      </Container>
    </>
  );
}
