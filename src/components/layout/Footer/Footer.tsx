import styles from "./Footer.module.scss";
import Logo from "@/components/ui/Logo";
import Container from "../Container/Container";
import { LocaleProps } from "@/types";
import { getDictionary } from "@/lib/i18n";

import Nav from "../Nav/Nav";

export default async function Footer({ locale }: LocaleProps) {
  const dict = await getDictionary(locale);

  return (
    <footer className={styles.footer}>
      <Container>
        <Logo locale={locale} />

        <div className={styles.footer__inner}>
          {/* Контакты */}
          <div className={styles.footer__contacts}>
            
            <div className={styles.footer__block}>
              <span className={styles.footer__label}>{dict.footer?.operatingHours || "Operating hours:"}</span>
              <p className={styles.footer__value}>{dict.footer?.workingDays || "MON-FRI FROM 9:00 TO 18:00"}</p>
            </div>

            <div className={styles.footer__block}>
              <span className={styles.footer__label}>{dict.footer?.contacts || "Contacts:"}</span>
              <a href="tel:+998957787132" className={styles.footer__value}>
                +998 95 778-71-32
              </a>
              <a href="tel:+998772920099" className={styles.footer__value}>
                +998 77 292-00-99
              </a>
            </div>

            <div className={styles.footer__block}>
              <span className={styles.footer__label}>{dict.footer?.addressText || "Address:"}</span>
              <a
                href="https://www.google.com/maps/place/Rokacell+Insulation/@41.2180139,69.2326055,17z/data=!3m1!4b1!4m6!3m5!1s0x38ae61fc1d6b7f27:0xc4b2e314ed03c305!8m2!3d41.21801!4d69.2374764!16s%2Fg%2F11jz0g4m4x?entry=ttu&g_ep=EgoyMDI2MDIwMy4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.footer__value}
              >
                {dict.branches?.tashkent?.address || "17 OBIHAET STREET, SERGELI DISTRICT"}
              </a>
            </div>

          </div>

          {/* Навигация */}
          <Nav locale={locale} navDict={dict.nav} className={styles.footer__nav} />



          {/* Соцсети */}
          <div className={styles.footer__social}>
            <span className={styles.footer__label}>{dict.footer?.socials || "We are on social media:"}</span>
            <div className={styles.footer__icons}>
              <a
                href="https://www.instagram.com/rokacell_uz/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.footer__icon}
                aria-label="Instagram"
              >
                <img
                  src="/svg/rokacell-instagram-official.svg"
                  alt="Instagram"
                  width={70}
                  height={70}
                  loading="lazy"
                />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.footer__icon}
                aria-label="Facebook"
              >
                <img
                  src="/svg/facebook-rokacell-community.svg"
                  alt="Facebook"
                  width={70}
                  height={70}
                  loading="lazy"
                />
              </a>
            </div>
          </div>
        </div>

      </Container>
      <div className={styles.footer__bottom}>
        <p className={styles.footer__bottom__text}>
          {dict.footer?.rights || "© 2026 ROKACELL. ALL RIGHTS RESERVED."}
        </p>
      </div>
    </footer>
  );
}

