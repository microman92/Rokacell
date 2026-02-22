"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Nav.module.scss";
import { getNavLinks } from "@/lib/routes";
import { Locale } from "@/lib/locales";
import { cn } from "@/lib/utils";
import Logo from "@/components/ui/Logo";

interface NavProps {
  locale: Locale;
  navDict?: any; // Dictionary['nav'] passed from parent
  className?: string;
  isHeader?: boolean;
}

export default function Nav({ locale, navDict, className, isHeader = false }: NavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const links = getNavLinks(locale);
  const rawPathname = usePathname();

  // Убираем локаль из пути: /ru/about -> /about, /en/about -> /about
  const stripLocale = (path: string) => path.replace(/^\/(ru|en|uz)/, "") || "/";
  const pathname = stripLocale(rawPathname);

  // Закрывать меню при смене роута
  useEffect(() => {
    if (isHeader) {
      setIsOpen(false);
    }
  }, [pathname, isHeader]);

  // Блокировать скролл на мобильном устройстве при открытом меню
  useEffect(() => {
    if (isHeader && isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, isHeader]);

  return (
    <nav className={cn(styles.nav, className)} aria-label="Основная навигация">
      {/* Кнопка открытия бургер-меню (видна только < 992px) */}
      {isHeader && (
        <button className={styles.burger} onClick={() => setIsOpen(true)} aria-label="Отрыть меню">
          <span></span>
          <span></span>
          <span></span>
        </button>
      )}

      {/* Десктопный список ссылок */}
      <ul className={styles.nav__list}>
        {links.map((link) => {
          const isActive = pathname === stripLocale(link.path);
          return (
            <li key={link.key}>
              <Link
                href={link.path}
                className={cn(styles.nav__link, isActive && styles["active"])}
                aria-current={isActive ? "page" : undefined}
              >
                {navDict?.[link.key] ?? link.key}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Мобильное полноэкранное меню */}
      {isHeader && (
        <div
          className={cn(styles.mobileMenu, isOpen && styles["active"])}
          onClick={() => setIsOpen(false)}
        >
          <div className={styles.mobileMenu__header}>
            <div className={styles.mobileMenu__logoWrapper} onClick={() => setIsOpen(false)}>
              <Logo locale={locale} />
            </div>
            <button
              className={styles.mobileMenu__close}
              onClick={() => setIsOpen(false)}
              aria-label="Закрыть меню"
            >
              &times;
            </button>
          </div>
          <div className={styles.mobileMenu__content}>
            <ul className={styles.mobileMenu__links}>
              {links.map((link) => {
                const isActive = pathname === stripLocale(link.path);
                return (
                  <li key={link.key}>
                    <Link
                      href={link.path}
                      className={cn(styles.mobileMenu__link, isActive && styles["active"])}
                      aria-current={isActive ? "page" : undefined}
                      onClick={() => setIsOpen(false)}
                    >
                      {navDict?.[link.key] ?? link.key}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
}
