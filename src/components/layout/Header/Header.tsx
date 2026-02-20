import Logo from "@/components/ui/Logo";
import Container from "../Container/Container";
import Nav from "../Nav/Nav";
import LangSwitcher from "../../ui/LangSwitcher/LangSwitcher";
import styles from "./Header.module.scss";
import { LocaleProps } from "@/types";

import { getDictionary } from "@/lib/i18n";

export default async function Header({ locale }: LocaleProps) {
  const dict = await getDictionary(locale);

  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.header__inner}>
          <Logo locale={locale} />

          <div className={styles.header__links}>
            <Nav locale={locale} navDict={dict.nav} />
            <LangSwitcher />
          </div>
        </div>
      </Container>
    </header>
  );
}
