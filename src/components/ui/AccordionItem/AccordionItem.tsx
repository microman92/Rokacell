"use client";

import { useState } from "react";
import { IMAGES } from "@/assets/images";
import styles from "./AccordionItem.module.scss";

interface AccordionItemProps {
  id: number;
  title: string;
  content: React.ReactNode;
  defaultOpen?: boolean;
}

export default function AccordionItem({ id, title, content, defaultOpen = false }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={`${styles.accordion__item} ${isOpen ? styles.accordion__item_active : ""}`}>
      <button
        className={styles.accordion__header}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className={styles.accordion__headerText}>
          {id}. {title}
        </span>
        <span className={`${styles.accordion__icon} ${isOpen ? styles.accordion__icon_active : ""}`}>
          <img src={IMAGES.about.downArrow} alt="toggle arrow" />
        </span>
      </button>

      <div className={`${styles.accordion__body} ${isOpen ? styles.accordion__body_open : ""}`}>
        <div className={styles.accordion__bodyInner}>
          {content}
        </div>
      </div>
    </div>
  );
}
