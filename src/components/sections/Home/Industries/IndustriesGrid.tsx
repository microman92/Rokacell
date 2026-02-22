"use client";

import { motion } from "framer-motion";
import styles from "./Industries.module.scss";

interface IndustriesGridProps {
  industries: {
    image: string;
    label: string;
  }[];
}

export default function IndustriesGrid({ industries }: IndustriesGridProps) {
  return (
    <div className={styles.industries__inner}>
      {industries.map((item, index) => (
        <motion.div
          key={index}
          className={styles.industries__card}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: index * 0.15 }}
        >
          <img
            src={item.image}
            alt={item.label}
            width={471}
            height={281}
            className={styles.industries__image}
            loading="lazy"
          />
          <span className={styles.industries__label}>{item.label}</span>
        </motion.div>
      ))}
    </div>
  );
}
