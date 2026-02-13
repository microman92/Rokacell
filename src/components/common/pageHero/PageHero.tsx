import Container from "@/components/layout/Container/Container";
import styles from "./PageHero.module.scss";
import { cn } from "@/lib/utils";


interface PageHeroProps {
  title: string;
  description: string;
  bgImage: string;
  overlayImage: string;
  variant: "about" | "products" | "documents" | "calculator" | "logistics" | "contacts";
}


export default function PageHero({ title, description, bgImage, overlayImage, variant }: PageHeroProps) {

  const variantClass = {
    about: styles.about,
    documents: styles.documents,
    products: styles.products,
    calculator: styles.calculator,
    logistics: styles.logistics,
    contacts: styles.contacts,
  }

  return (
    <div className={cn(styles.hero, variantClass[variant])}>
      <div className={styles.hero__bg}>

        <div className={styles.hero__bg_img}>
          <img src={bgImage} alt="" />
        </div>

        <div className={styles.hero__bg_overlay}>
          <img src={overlayImage} alt="" />
        </div>

      </div>

      <Container className={styles.hero__content}>
        <div className={styles.hero__desc}>
          <h1 className={styles.hero__title}>{title}</h1>
          <p className={styles.hero__description}>{description}</p>
        </div>
      </Container>

    </div>
  )
}
