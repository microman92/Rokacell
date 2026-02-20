
import { IMAGES } from "@/assets/images";
import Container from "@/components/layout/Container/Container";
import MarqueeStrip from "@/components/ui/MarqueeStrip/MarqueeStrip";
import styles from "./Industries.module.scss";
import { Heading } from "@/components/ui/Heading/Heading";
import { Locale } from "@/lib/locales";
import { getDictionary } from "@/lib/i18n";

interface IndustriesProps {
  locale: Locale;
}

export default async function Industries({ locale }: IndustriesProps) {
  const dict = await getDictionary(locale);

  const INDUSTRIES = [
    { image: IMAGES.home.applicationAreas.hotels, label: dict.industries?.areas?.hotels || "HOTELS" },
    { image: IMAGES.home.applicationAreas.businessCenters, label: dict.industries?.areas?.businessCenters || "BUSINESS CENTERS" },
    { image: IMAGES.home.applicationAreas.hospitals, label: dict.industries?.areas?.hospitals || "HOSPITALS" },
    { image: IMAGES.home.applicationAreas.construction, label: dict.industries?.areas?.construction || "CONSTRUCTION" },
    { image: IMAGES.home.applicationAreas.factories, label: dict.industries?.areas?.factories || "FACTORIES" },
    { image: IMAGES.home.applicationAreas.shoppingMalls, label: dict.industries?.areas?.shoppingMalls || "SHOPPING MALLS" },
  ];

  const APPLICATIONS = [
    { text: dict.industries?.applications?.ventilationDucts || "VENTILATION DUCTS" },
    { text: dict.industries?.applications?.airConditioningDucts || "AIR CONDITIONING DUCTS" },
    { text: dict.industries?.applications?.airConditioningPipelines || "AIR CONDITIONING PIPELINES" },
    { text: dict.industries?.applications?.heatingPipelines || "HEATING PIPELINES" },
  ];

  return (
    <section className={styles.industries}>
      <Container>
        <Heading variant="black" tag="h2" className={styles.industries__title}>
          {dict.industries?.title || "APPLICATION AREAS"}
        </Heading>
      </Container>

      <div className={styles.industries__grid}>
        <Container>
          <div className={styles.industries__inner}>
            {INDUSTRIES.map((item, index) => (
              <div key={index} className={styles.industries__card}>
                <img
                  src={item.image}
                  alt={item.label}
                  width={471}
                  height={281}
                  className={styles.industries__image}
                  loading="lazy"
                />
                <span className={styles.industries__label}>{item.label}</span>
              </div>
            ))}
          </div>
        </Container>
      </div>

      <MarqueeStrip items={APPLICATIONS} />

      <div className={styles.industries__imgBlock}>
        <img
          src={IMAGES.home.engineering.ventilationDucts}
          alt="Ventilation ducts insulation"
          width={805}
          height={370}
          className={styles.industries__imgItem}
          loading="lazy"
        />
        <img
          src={IMAGES.home.engineering.hvacPipes}
          alt="HVAC pipes insulation"
          width={805}
          height={370}
          className={styles.industries__imgItem}
          loading="lazy"
        />
      </div>
    </section>
  );
}

