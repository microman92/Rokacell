
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
      <div className={styles.cooperation}>
        <video className={styles.slide__video} src="/video/international.mp4" autoPlay loop muted></video>


        {/* Content — Left bottom */}
        <Container className={`${styles.slide__international}`}>
          <h2 className={cn(styles.slide__title, styles.slide__international_title)}>
            INTERNATIONAL COOPERATION OF ROKACELL
          </h2>
        </Container>
      </div >
    </>
  );
}
