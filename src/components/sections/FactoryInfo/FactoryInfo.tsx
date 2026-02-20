import Container from "@/components/layout/Container/Container";
import styles from "./FactoryInfo.module.scss";
import { IMAGES } from "@/assets/images";

export default function FactoryInfo() {
  return (
    <div className={styles.factoryInfo}>
      <Container className={styles.factoryInfo__content}>

        <div className={styles.factoryInfo__img}>
          <img src={IMAGES.about.plant} alt="" width={941} height={529} />
        </div>

        <div className={styles.factoryInfo__description}>
          <p className={styles.factoryInfo__text}>Based in Tashkent, Uzbekistan, <span>Rokacell</span> is the first producer of elastomeric rubber foam in Central Asia, with an annual production capacity of 3,000 MT.</p>
          <p className={styles.factoryInfo__text}><span>Rokacell</span> acts as a reliable solution partner in the HVAC sector, providing an extensive product range tailored to various project needs.</p>
          <p className={styles.factoryInfo__text}><span>Rokacell</span> is committed to investing in research and development to further enhance production quality, supported by its team of highly experienced engineers.</p>
        </div>

      </Container>
    </div>
  )
}
