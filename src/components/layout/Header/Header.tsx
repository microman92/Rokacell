
import Logo from "@/components/ui/Logo";
import Container from "../Container/Container";
import Nav from "../Nav/Nav";
import styles from "./Header.module.scss";
import LangSwitcher from "../LangSwitcher/LangSwitcher";


export default function Header() {
  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.header__inner}>

          <Logo />


          <Nav />

          <LangSwitcher />

        </div>
      </Container>
    </header>
  )
}
