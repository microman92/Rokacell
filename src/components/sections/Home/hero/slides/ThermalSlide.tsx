import { IMAGES } from "@/assets/images";
import styles from "../Hero.module.scss";
import Container from "@/components/layout/Container/Container";
import { Heading } from "@/components/ui/Heading/Heading";

interface SlideProps {
  dict?: { title: string; subtitle?: string };
}


export default function ThermalSlide({ dict }: SlideProps) {
  return (
    <>
      {}
      <img
        src={IMAGES.home.hero.bg.insulation}
        alt={dict?.title || "Rokacell efficient thermal insulation"}
        width={3840}
        height={1998}
        style={{ position: 'absolute', width: '100%', height: '100%', inset: 0, objectFit: 'cover' }}
        className={styles.slide__bg}
        loading="eager"
        fetchPriority="high"
      />

      <Container className={`${styles.slide__content} ${styles.slide__content_leftTop}`}>
        <Heading tag="h2" className={styles.slide__title}>{dict?.title || "EFFICIENT THERMAL INSULATION"}</Heading>
        {dict?.subtitle && <p className={styles.slide__text}>{dict.subtitle}</p>}
        {!dict?.subtitle && <p className={styles.slide__text}>ELASTOMERIC RUBBER FOAM PRODUCTS</p>}
      </Container>
    </>
  );
}

