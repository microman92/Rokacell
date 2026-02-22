"use client";

import { ReactNode } from "react";
import Container from "@/components/layout/Container/Container";
import styles from "./PageHero.module.scss";
import { Heading } from "@/components/ui/Heading/Heading";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface PageHeroProps {
  title: ReactNode;
  description?: string;
  bgImage?: string;
  overlayImage?: string;
  variant: "about" | "products" | "documents" | "calculator" | "logistics" | "contacts";
}

export default function PageHero({
  title,
  description,
  bgImage,
  overlayImage,
  variant,
}: PageHeroProps) {
  const variantClass = {
    about: styles.about,
    documents: styles.documents,
    products: styles.products,
    calculator: styles.calculator,
    logistics: styles.logistics,
    contacts: styles.contacts,
  };

  // Варианты с абсолютным overlay (декоративный фон, вне Container)
  const isAbsoluteOverlay = variant === "about" || variant === "logistics";

  const overlayElement = overlayImage && (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7 }}
      className={styles.hero__overlay}
    >
      <img src={overlayImage} alt="" />
    </motion.div>
  );

  return (
    <div className={cn(styles.hero, variantClass[variant])}>
      {/* Background image */}
      {bgImage && (
        <div className={styles.hero__bg}>
          <img src={bgImage} alt="" />
        </div>
      )}

      {/* Overlay — абсолютный (About, Logistics) */}
      {isAbsoluteOverlay && overlayElement}

      <Container className={styles.hero__content}>
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7 }}
          className={styles.hero__desc}
        >
          <Heading
            variant={variant === "logistics" ? "white" : "black"}
            tag="h1"
            className={styles.hero__title}
          >
            {title}
          </Heading>
          {description && <p className={styles.hero__description}>{description}</p>}
        </motion.div>

        {/* Overlay — в потоке (Documents и др.) */}
        {!isAbsoluteOverlay && overlayElement}
      </Container>
    </div>
  );
}
