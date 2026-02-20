import Container from "@/components/layout/Container/Container";
import styles from "./Quality.module.scss";
import { IMAGES } from "@/assets/images";
import { Dictionary } from "@/lib/i18n";

interface QualityProps {
  dict?: Dictionary["documents"];
}

export default function Quality({ dict }: QualityProps) {
  return (
    <div className={styles.quality}>
      <Container className={styles.quality__wrapper}>
        <div className={styles.quality__description}>
          <p className={styles.quality__text}>{dict?.quality?.text}</p>
        </div>
        <div className={styles.quality__img}>
          <img src={IMAGES.documents.qualityControl} alt="" width={669} height={377} />
        </div>
      </Container>
    </div>
  );
}
