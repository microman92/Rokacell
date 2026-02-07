import Link from "next/link";
import { ROUTES, href } from "@/lib/routes";
import { IMAGES } from "@/assets/images";
import { Locale } from "@/lib/locales";

interface LogoProps {
  locale: Locale;
}

export default function Logo({ locale }: LogoProps) {
  return (
    <Link href={href(locale, ROUTES.HOME)} aria-label="Главная страница">
      <img
        src={IMAGES.home.hero.logo}
        alt="Rokacell - Теплоизоляционные материалы"
        width="120"
        height="40"
      />
    </Link>
  );
}
