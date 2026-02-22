"use client";

import { Dictionary } from "@/lib/i18n";
import { motion } from "framer-motion";
import styles from "./AboutInfo.module.scss";

type AboutInfoProps = {
  dict: Dictionary["about"];
};

export default function AboutInfo({ dict }: AboutInfoProps) {
  const info = dict?.info;

  return (
    <div className={styles.about}>
      <motion.h2
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className={styles.about__title}
      >
        {info?.title || "About the company"}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className={styles.about__text}
      >
        <span>ROKACELL</span>
        {info?.p1_1 || " "}
        <span>ROKAFLEX</span>
        {info?.p1_2 || ""}
      </motion.p>

      <motion.p
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className={styles.about__text}
      >
        {info?.p2_1 || ""}
        <span>ROKACELL</span>
        {info?.p2_2 || ""}
        <span>Roka Yalıtım A.Ş.</span>
        {info?.p2_3 || ""}
        <span>Aysel Inshaat</span>
        {info?.p2_4 || ""}
      </motion.p>
    </div>
  );
}
