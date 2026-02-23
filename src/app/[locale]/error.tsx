"use client";

import styles from "./error.module.scss";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className={styles.error}>
      <div className={styles.error__container}>
        <h1 className={styles.error__title}>Что-то пошло не так</h1>
        <p className={styles.error__description}>
          Произошла непредвиденная ошибка. Попробуйте перезагрузить страницу.
        </p>
        <button className={styles.error__button} onClick={() => reset()}>
          Попробовать снова
        </button>
      </div>
    </main>
  );
}
