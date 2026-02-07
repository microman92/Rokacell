'use client';

import styles from "./LangSwitcher.module.scss";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { locales, LOCALE_CODES, type Locale } from "@/lib/locales";
import { switchLocale } from "@/lib/routes";
import { useCurrentLocale } from "@/hooks/useCurrentLocale";
import { useClickOutside } from "@/hooks/useClickOutside";
import { cn } from "@/lib/utils";

export default function LangSwitcher() {
  const currentLocale = useCurrentLocale();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const dropdownRef = useClickOutside<HTMLDivElement>(() => setIsOpen(false));

  const handleLangChange = (locale: Locale) => {
    const newPath = switchLocale(pathname, locale);
    router.push(newPath);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={cn(styles.lang, isOpen && styles.lang__open)}
      ref={dropdownRef}
      role="button"
      aria-expanded={isOpen}
      aria-haspopup="true"
      aria-label="Выбор языка"
      tabIndex={0}
      onClick={toggleDropdown}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleDropdown();
        }
      }}
    >
      <span className={styles.lang__current}>
        {LOCALE_CODES[currentLocale]}
      </span>

      {isOpen && (
        <div
          className={styles.lang__options}
          role="menu"
          aria-label="Список языков"
        >
          {locales
            .filter((locale) => locale !== currentLocale)
            .map((locale) => (
              <button
                key={locale}
                type="button"
                className={styles.lang__option}
                onClick={(e) => {
                  e.stopPropagation();
                  handleLangChange(locale);
                }}
                role="menuitem"
              >
                {LOCALE_CODES[locale]}
              </button>
            ))}
        </div>
      )}
    </div>
  );
}
