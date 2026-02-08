import Image from "next/image";
import { IMAGES } from "@/assets/images";
import Container from "@/components/layout/Container/Container";
import MarqueeStrip from "@/components/ui/MarqueeStrip/MarqueeStrip";
import styles from "./Industries.module.scss";

const INDUSTRIES = [
  { image: IMAGES.home.applicationAreas.hotels, label: "HOTELS" },
  { image: IMAGES.home.applicationAreas.businessCenters, label: "BUSINESS CENTERS" },
  { image: IMAGES.home.applicationAreas.hospitals, label: "HOSPITALS" },
  { image: IMAGES.home.applicationAreas.construction, label: "CONSTRUCTION" },
  { image: IMAGES.home.applicationAreas.factories, label: "FACTORIES" },
  { image: IMAGES.home.applicationAreas.shoppingMalls, label: "SHOPPING MALLS" },
];

const APPLICATIONS = [
  { text: "VENTILATION DUCTS" },
  { text: "AIR CONDITIONING DUCTS" },
  { text: "AIR CONDITIONING PIPELINES" },
  { text: "HEATING PIPELINES" },
];

export default function Industries() {
  return (
    <section className={styles.industries}>
      <Container>
        <h2 className={styles.industries__title}>APPLICATION AREAS</h2>
      </Container>

      <div className={styles.industries__grid}>
        <Container>
          <div className={styles.industries__inner}>
            {INDUSTRIES.map((item, index) => (
              <div key={index} className={styles.industries__card}>
                <Image
                  src={item.image}
                  alt={item.label}
                  width={471}
                  height={281}
                  className={styles.industries__image}
                />
                <span className={styles.industries__label}>{item.label}</span>
              </div>
            ))}
          </div>
        </Container>
      </div>

      <MarqueeStrip items={APPLICATIONS} />

      <div className={styles.industries__imgBlock}>
        <Image
          src={IMAGES.home.engineering.ventilationDucts}
          alt="Ventilation ducts insulation"
          width={730}
          height={400}
          className={styles.industries__imgItem}
        />
        <Image
          src={IMAGES.home.engineering.hvacPipes}
          alt="HVAC pipes insulation"
          width={730}
          height={400}
          className={styles.industries__imgItem}
        />
      </div>
    </section>
  );
}
