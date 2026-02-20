'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Nav.module.scss";
import { getNavLinks } from "@/lib/routes";
import { Locale } from "@/lib/locales";
import { cn } from "@/lib/utils";

interface NavProps {
  locale: Locale;
  navDict?: any; // Dictionary['nav'] passed from parent
  className?: string;
}

export default function Nav({ locale, navDict, className }: NavProps) {
  const links = getNavLinks(locale);
  const rawPathname = usePathname();

  // Убираем локаль из пути: /ru/about -> /about, /en/about -> /about
  const stripLocale = (path: string) => path.replace(/^\/(ru|en|uz)/, '') || '/';
  const pathname = stripLocale(rawPathname);

  return (
    <nav className={cn(styles.nav, className)} aria-label="Основная навигация">
      <ul className={styles.nav__list}>
        {links.map((link) => {

          const isActive = pathname === stripLocale(link.path);

          return (
            <li key={link.key}>
              <Link
                href={link.path}
                className={cn(
                  styles.nav__link,
                  isActive && styles['active']
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                {navDict?.[link.key] ?? link.key}
              </Link>
            </li>
          );
        })}

      </ul>
    </nav>
  );
}
