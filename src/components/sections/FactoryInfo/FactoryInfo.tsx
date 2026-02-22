"use client";

import Container from "@/components/layout/Container/Container";
import { motion } from "framer-motion";
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
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className={styles.factoryInfo__img}
        >
          <img src={IMAGES.about.plant} alt="" width={941} height={529} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className={styles.factoryInfo__description}
        >
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
        </motion.div>
      </Container>
    </div>
  );
}
