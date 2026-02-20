import Container from "@/components/layout/Container/Container";
import styles from "./Quality.module.scss";
import { IMAGES } from "@/assets/images";


export default function Quality() {




  return (
    <div className={styles.quality}>
      <Container className={styles.quality__wrapper}>
        <div className={styles.quality__description}>
          <p className={styles.quality__text}>Every batch of products undergoes strict control at all stages of production.</p>
        </div>
        <div className={styles.quality__img}>
          <img src={IMAGES.documents.qualityControl} alt="" width={669} height={377} />
        </div>
      </Container>
    </div>
  )
}
