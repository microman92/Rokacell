import styles from "./not-found.module.scss";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className={styles.notFound}>
      <div className={styles.notFound__container}>
        <span className={styles.notFound__code}>404</span>
        <h1 className={styles.notFound__title}>Страница не найдена</h1>
        <p className={styles.notFound__description}>
          Запрашиваемая страница не существует или была перемещена.
        </p>
        <Link href="/ru" className={styles.notFound__link}>
          На главную
        </Link>
      </div>
    </main>
  );
}
