import styles from './CalculateSavings.module.scss';
import Container from '@/components/layout/Container/Container';
import Button from '@/components/ui/Button/Button';
import { Heading } from '@/components/ui/Heading/Heading';

export default function CalculateSavings() {
  return (
    <section className={styles.calculate}>
      <img
        src="/img/home-calculate.png"
        alt=""
        className={styles.calculate__bg}
      />

      {/* Content block */}
      <div className={styles.calculate__content}>
        <Container className={styles.calculate__container}>
          <div className={styles.calculate__text}>
            <Heading tag="h2" className={styles.calculate__title}>
              Calculate your savings
            </Heading>
            <p className={styles.calculate__description}>
              Select the ideal insulation solution and find out how much you'll save on energy. Our calculator will help in a minute!
            </p>
          </div>

          <Button href="/calculator" className={styles.calculate__button} variant='big'>
            Calculate now
          </Button>
        </Container>
      </div>
    </section>
  );
}
