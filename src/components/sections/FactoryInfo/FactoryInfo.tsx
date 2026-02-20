import Container from "@/components/layout/Container/Container";
import styles from "./FactoryInfo.module.scss";
import { IMAGES } from "@/assets/images";
import { Dictionary } from "@/lib/i18n";

type FactoryInfoProps = {
  dict: Dictionary["about"];
};

export default function FactoryInfo({ dict }: FactoryInfoProps) {
  const factory = dict?.factory;

  return (
    <div className={styles.factoryInfo}>
      <Container className={styles.factoryInfo__content}>
        <div className={styles.factoryInfo__img}>
          <img src={IMAGES.about.plant} alt="" width={941} height={529} />
        </div>

        <div className={styles.factoryInfo__description}>
          <p className={styles.factoryInfo__text}>
            {factory?.p1_1 || ""}
            <span>Rokacell</span>
            {factory?.p1_2 || ""}
          </p>
          <p className={styles.factoryInfo__text}>
            {factory?.p2_1 || ""}
            <span>Rokacell</span>
            {factory?.p2_2 || ""}
          </p>
          <p className={styles.factoryInfo__text}>
            {factory?.p3_1 || ""}
            <span>Rokacell</span>
            {factory?.p3_2 || ""}
          </p>
        </div>
      </Container>
    </div>
  );
}
