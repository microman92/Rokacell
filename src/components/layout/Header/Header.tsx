import Logo from "@/components/ui/Logo";
import Container from "../Container/Container";
import Nav from "../Nav/Nav";
import LangSwitcher from "../../ui/LangSwitcher/LangSwitcher";
import styles from "./Header.module.scss";
import { LocaleProps } from "@/types";

export default function Header({ locale }: LocaleProps) {
  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.header__inner}>
          <Logo locale={locale} />

          <div className={styles.header__links}>
            <Nav locale={locale} />
            <LangSwitcher />
          </div>
        </div>
      </Container>
    </header>
  );
}
