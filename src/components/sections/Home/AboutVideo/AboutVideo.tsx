"use client";

import Container from "@/components/layout/Container/Container";
import { motion } from "framer-motion";
import styles from "./AboutVideo.module.scss";
import { Dictionary } from "@/lib/i18n";

interface AboutVideoProps {
  dict?: Dictionary["aboutVideo"];
}

export default function AboutVideo({ dict }: AboutVideoProps) {
  return (
    <div className={styles.aboutVideo}>
      <Container className={styles.aboutVideo__inner}>
        <motion.video
          className={styles.aboutVideo__video}
          src="/video/Roka2.mp4"
          controls
          width={805}
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
        />
        <motion.p
          className={styles.aboutVideo__text}
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
        >
          {dict?.text ||
            "За каждым нашим продуктом стоит команда профессионалов и продуманные процессы."}
        </motion.p>
      </Container>
    </div>
  );
}
