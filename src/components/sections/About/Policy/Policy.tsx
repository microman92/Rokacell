import Container from "@/components/layout/Container/Container";
import AccordionItem from "@/components/ui/AccordionItem/AccordionItem";
import { IMAGES } from "@/assets/images";
import { ACCORDION_DATA } from "./constants";
import styles from "./Policy.module.scss";

export default function Policy() {
  return (
    <section className={styles.policy}>
      <Container>
        {/* Header */}
        <div className={styles.policy__header}>
          <h2 className={styles.policy__title}>POLICY</h2>
          <p className={styles.policy__subtitle}>
            Policy on quality, ecology, occupational health and safety
            <br />
            of JV, ROKACELL, LLC.
          </p>
        </div>

        {/* Vision & Mission */}
        <div className={styles.policy__mission}>
          <div className={styles.policy__mission_img}>
            <img src={IMAGES.about.companyPolicy} alt="Rokacell company policy" />
          </div>
          <div className={styles.policy__mission_text}>
            <h3 className={styles.policy__mission_title}>OUR VISIONS & MISSION</h3>
            <p>
              <span>JV „ ROKACELL „ LLC</span> , being one of the leading manufacturers of thermal insulation products made from elastomeric materials based on foamed synthetic rubbers in Central Asia, sets itself the task of:
              producing and ensuring the supply of various types of thermal insulation products to the domestic and foreign markets;
            </p>
            <p>
              fully complying with the requirements of consumers and regulatory legal documents; fulfilling orders for the purchase of products in the required volumes.
            </p>
            <p>
              Quality, environmental friendliness, production safety, and timeliness of product shipment are the main criteria for assessing the effectiveness of the management of JV „ ROKACELL „ LLC, which allow satisfying the interests and requests of Consumers.
            </p>
          </div>
        </div>

        {/* Main Areas of Activity */}
        <div className={styles.policy__areas}>

          <div className={styles.policy__areas_content}>
            <h3 className={styles.policy__areas_title}>MAIN AREAS OF ACTIVITY</h3>
            {/* Accordion (Left) */}
            <div className={styles.policy__activity}>
              <div className={styles.policy__accordion}>
                {ACCORDION_DATA.map((item) => (
                  <AccordionItem
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    content={item.content}
                    defaultOpen={item.id === 1}
                  />
                ))}
              </div>

              {/* Image (Right) */}
              <div className={styles.policy__areas_img}>
                <img src={IMAGES.about.warmBusiness} alt="The heart of a warm business" />
                <h3>The heart <span>of a warm business</span></h3>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Disclaimer */}
        <p className={styles.policy__disclaimer}>
          THIS POLICY HAS BEEN COMMUNICATED TO AND IS UNDERSTOOD BY EVERY EMPLOYEE OF JV, ROKACELL, LLC AND IS
          ANNUALLY REVIEWED BY ITS MANAGEMENT FOR SUITABILITY AND RELEVANCE.
        </p>
      </Container>
    </section>
  );
}
