import Container from "@/components/layout/Container/Container";
import styles from "./AboutVideo.module.scss";
import { Dictionary } from "@/lib/i18n";

interface AboutVideoProps {
  dict?: Dictionary['aboutVideo'];
}

export default function AboutVideo({ dict }: AboutVideoProps) {
  return (
    <div className={styles.aboutVideo}>
      <Container className={styles.aboutVideo__inner}>
        <video className={styles.aboutVideo__video} src="/video/Roka2.mp4" controls width={805}></video>
        <p className={styles.aboutVideo__text}>
          {dict?.text || "За каждым нашим продуктом стоит команда профессионалов и продуманные процессы."}
        </p>
      </Container>
    </div>
  )
}

