"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./PackingDetails.module.scss";
import Container from "@/components/layout/Container/Container";
import { PACKING_DATA, PackingItem } from "@/data/packingData";
import { Dictionary } from "@/lib/i18n";

// --- Components ---

const PackingCard = ({ item, dict }: { item: PackingItem; dict?: Dictionary["logistics"] }) => {
  const title = dict?.transport?.[item.titleKey as keyof typeof dict.transport] || item.titleKey;
  const subtitle = item.subtitleKey
    ? dict?.subtitles?.[item.subtitleKey as keyof typeof dict.subtitles] || item.subtitleKey
    : undefined;

  return (
    <div className={styles.card}>
      {/* Text Content */}
      <motion.div
        className={styles.card__content}
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <h3 className={styles.card__title}>{title}</h3>
        {subtitle && <p className={styles.card__subtitle}>{subtitle}</p>}

        <div className={styles.card__specs}>
          {item.specs.map((spec, i) => (
            <div key={i} className={styles.card__specRow}>
              <span className={styles.card__paramTitle}>
                {dict?.labels?.[spec.labelKey as keyof typeof dict.labels] || spec.labelKey}
              </span>
              <div className={styles.card__values}>
                {spec.values.map((val, j) => (
                  <div key={j} className={styles.card__valueRow}>
                    {val.dim && <span className={styles.card__valueDim}>{val.dim}</span>}
                    <span className={styles.card__valueQty}>
                      {val.value}{" "}
                      {val.unit
                        ? dict?.units?.[val.unit as keyof typeof dict.units] || val.unit
                        : ""}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Image */}
      <motion.div
        className={styles.card__imageWrapper}
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <Image src={item.image} alt={title} width={600} height={570} quality={90} />
      </motion.div>
    </div>
  );
};

export default function PackingDetails({ dict }: { dict?: Dictionary["logistics"] }) {
  return (
    <section className={styles.packingDetails}>
      <Container>
        {PACKING_DATA.map((category, catIndex) => {
          const categoryTrans =
            dict?.categories?.[category.categoryKey as keyof typeof dict.categories];
          return (
            <div key={catIndex} className={styles.category}>
              {/* Header */}
              <motion.div
                className={styles.category__header}
                initial={{ opacity: 0, y: -50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className={styles.category__title}>
                  {categoryTrans?.title || category.categoryKey}
                </h2>
                <p className={styles.category__desc}>{categoryTrans?.description}</p>
              </motion.div>

              {/* Cards */}
              <div className={styles.category__items}>
                {category.items.map((item) => (
                  <PackingCard key={item.key} item={item} dict={dict} />
                ))}
              </div>
            </div>
          );
        })}
      </Container>
    </section>
  );
}
