import Link from "next/link";
import { ROUTES, href } from "@/lib/routes";
import { IMAGES } from "@/assets/images";
import { Locale } from "@/lib/locales";
import styles from "../layout/Header/Header.module.scss";

interface LogoProps {
  locale: Locale;
}

export default function Logo({ locale }: LogoProps) {
  return (
    <Link href={href(locale, ROUTES.HOME)} aria-label="Главная страница" className={styles.logo}>
      <img
        src={IMAGES.home.hero.logo}
        alt="Rokacell - Теплоизоляционные материалы"
        width={218}
        height={71}
      />
    </Link>
  );
}
