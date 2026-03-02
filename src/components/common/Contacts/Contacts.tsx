"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/index";
import type { Branch } from "@/data/branches.data";
import styles from "./Contacts.module.scss";

interface ContactsProps {
  data: Branch;
  index?: number;
}

export default function Contacts({ data, index = 0 }: ContactsProps) {
  const isPhotoVariant = data.variant === "photo";

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className={styles.contacts}
    >
      {isPhotoVariant && <img src={data.image} alt={data.city} className={styles.contacts__bg} />}

      <div
        className={cn(
          styles.contacts__visual,
          isPhotoVariant ? styles["contacts__visual--photo"] : styles["contacts__visual--products"]
        )}
      >
        {data.logo && (
          <img
            src={data.logo}
            alt="Rokacell Logo"
            className={cn(
              styles.contacts__logo,
              isPhotoVariant && styles["contacts__logo--overlay"]
            )}
          />
        )}

        {!isPhotoVariant && (
          <img
            src={data.image}
            alt={`${data.city} products`}
            className={styles.contacts__productImage}
          />
        )}
      </div>

      <div className={cn(styles.contacts__info, isPhotoVariant && styles["photo"])}>
        {data.companyName && <h4 className={styles.contacts__company}>{data.companyName}</h4>}
        <h3 className={styles.contacts__city}>{data.city}</h3>
        {data.address && (
          <p className={cn(styles.contacts__link, data.id === "baku" && styles["contacts__link--small"])}>
            {data.address}
          </p>
        )}
        <div className={styles.contacts__phones}>
          {data.phones.map((phone, i) => (
            <a
              key={i}
              href={`tel:${phone}`}
              className={cn(styles.contacts__link, data.id === "baku" && styles["contacts__link--small"])}
            >
              {phone}
            </a>
          ))}
        </div>
        {data.emails && data.emails.length > 0 && (
          <div className={styles.contacts__phones}>
            {data.emails.map((email, i) => (
              <a
                key={i}
                href={`mailto:${email}`}
                className={cn(styles.contacts__link, data.id === "baku" && styles["contacts__link--small"])}
              >
                {email}
              </a>
            ))}
          </div>
        )}
        {data.website && (
          <a
            href={data.website.startsWith('http') ? data.website : `https://${data.website}`}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(styles.contacts__link, data.id === "baku" && styles["contacts__link--small"])}
          >
            {data.website}
          </a>
        )}
      </div>
    </motion.div>
  );
}
