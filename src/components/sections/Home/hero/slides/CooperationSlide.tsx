import Image from "next/image";
import { IMAGES } from "@/assets/images";
import styles from "../Hero.module.scss";
import Container from "@/components/layout/Container/Container";
import { cn } from "@/lib/utils";

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
        style={{ objectFit: "cover" }}
        className={styles.slide__bg}
      />

      {/* Content — Left bottom */}
      <Container className={`${styles.slide__international}`}>
        <h2 className={cn(styles.slide__title, styles.slide__international_title)}>
          INTERNATIONAL COOPERATION OF ROKACELL
        </h2>
      </Container>
    </>
  );
}
