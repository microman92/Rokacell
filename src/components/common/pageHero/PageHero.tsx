import { ReactNode } from "react";
import Container from "@/components/layout/Container/Container";
import styles from "./PageHero.module.scss";
import { Heading } from "@/components/ui/Heading/Heading";
import { cn } from "@/lib/utils";

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
    <div className={styles.hero__overlay}>
      <img src={overlayImage} alt="" />
    </div>
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
        <div className={styles.hero__desc}>
          <Heading variant={variant === 'logistics' ? 'white' : 'black'} tag="h1" className={styles.hero__title}>{title}</Heading>
          {description && <p className={styles.hero__description}>{description}</p>}
        </div>

        {/* Overlay — в потоке (Documents и др.) */}
        {!isAbsoluteOverlay && overlayElement}
      </Container>
    </div>
  );
}
