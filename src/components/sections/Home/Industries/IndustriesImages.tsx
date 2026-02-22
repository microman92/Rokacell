"use client";

import { motion } from "framer-motion";
import { IMAGES } from "@/assets/images";
import styles from "./Industries.module.scss";

export default function IndustriesImages() {
  return (
    <div className={styles.industries__imgBlock}>
      <motion.img
        src={IMAGES.home.engineering.ventilationDucts}
        alt="Ventilation ducts insulation"
        width={805}
        height={370}
        className={styles.industries__imgItem}
        loading="lazy"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
      />
      <motion.img
        src={IMAGES.home.engineering.hvacPipes}
        alt="HVAC pipes insulation"
        width={805}
        height={370}
        className={styles.industries__imgItem}
        loading="lazy"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
      />
    </div>
  );
}
