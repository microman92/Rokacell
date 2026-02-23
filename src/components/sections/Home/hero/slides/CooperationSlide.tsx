import styles from "../Hero.module.scss";
import Container from "@/components/layout/Container/Container";
import { cn } from "@/lib/utils";
import { Heading } from "@/components/ui/Heading/Heading";

interface SlideProps {
  dict?: { title: string; subtitle?: string };
}


export default function CooperationSlide({ dict }: SlideProps) {
  return (
    <>
      {}
      <div className={styles.cooperation}>
        <video className={styles.slide__video} src="/video/international.mp4" autoPlay loop muted></video>


        {}
        <Container className={`${styles.slide__international}`}>
          <Heading tag="h2" className={cn(styles.slide__title, styles.slide__international_title)}>
            {dict?.title || "INTERNATIONAL COOPERATION OF ROKACELL"}
          </Heading>
        </Container>
      </div >
    </>
  );
}
