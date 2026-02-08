import Image from "next/image";
import { IMAGES } from "@/assets/images";
import styles from "../Hero.module.scss";

/**
 * Слайд 4 — Rokacell Products at Leading International Exhibitions
 * Фото выставки, голубая полоса-overlay по центру с текстом
 */
export default function ExhibitionSlide() {
  return (
    <>
      {/* Background — Exhibition photo */}
      <Image
        src={IMAGES.home.hero.bg.exhibition}
        alt="Rokacell exhibition stand at international construction materials fair"
        fill
        style={{ objectFit: "cover" }}
        className={styles.slide__bg}
      />

      {/* Blue overlay band */}
      <div className={styles.slide__overlay}>
        <div className={styles.slide__overlay_content}>
          <h2 className={styles.slide__overlay_title}>
            ROKACELL PRODUCTS AT LEADING INTERNATIONAL EXHIBITIONS
          </h2>
          <p className={styles.slide__overlay_text}>
            ROKACELL REGULARLY PARTICIPATES IN LEADING INTERNATIONAL EXHIBITIONS OF CONSTRUCTION AND
            INSULATION MATERIALS, SHOWCASING INNOVATIVE PRODUCTS AND ESTABLISHING NEW PARTNERSHIPS
            IN THE CIS REGION AND BEYOND.
          </p>
        </div>
      </div>
    </>
  );
}
