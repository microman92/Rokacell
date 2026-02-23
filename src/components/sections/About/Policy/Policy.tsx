"use client";

import Container from "@/components/layout/Container/Container";
import AccordionItem from "@/components/ui/AccordionItem/AccordionItem";
import { motion } from "framer-motion";
import { IMAGES } from "@/assets/images";
import styles from "./Policy.module.scss";
import { Dictionary } from "@/lib/i18n";

type PolicyProps = {
  dict: Dictionary["about"];
};

export default function Policy({ dict }: PolicyProps) {
  const policy = dict?.policy;

  return (
    <section className={styles.policy}>
      <Container>
        {}
        <motion.div
          className={styles.policy__header}
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className={styles.policy__title}>{policy?.header.title || "POLICY"}</h2>
          <p className={styles.policy__subtitle}>
            {policy?.header.subtitle.split("\n").map((line, i, arr) => (
              <span key={i}>
                {line}
                {i < arr.length - 1 && <br />}
              </span>
            ))}
          </p>
        </motion.div>

        {}
        <div className={styles.policy__mission}>
          <motion.div
            className={styles.policy__mission_img}
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src={IMAGES.about.companyPolicy}
              alt="Rokacell company policy"
              width={805}
              height={493}
            />
          </motion.div>
          <motion.div
            className={styles.policy__mission_text}
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className={styles.policy__mission_title}>
              {policy?.mission.title || "OUR VISIONS & MISSION"}
            </h3>
            <p>
              <span>{policy?.mission.p1_1}</span>
              {policy?.mission.p1_2}
            </p>
            <p>{policy?.mission.p2}</p>
            <p>
              {policy?.mission.p3_1}
              <span>{policy?.mission.p3_2}</span>
              {policy?.mission.p3_3}
            </p>
          </motion.div>
        </div>

        {}
        <div className={styles.policy__areas}>
          <div className={styles.policy__areas_content}>
            <h3 className={styles.policy__areas_title}>{policy?.areas.title}</h3>
            {}
            <div className={styles.policy__activity}>
              <motion.div
                className={styles.policy__accordion}
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6 }}
              >
                {policy?.areas.items.map((item) => (
                  <AccordionItem
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    content={
                      <>
                        <p>{item.content.p1}</p>
                        {item.content.list && (
                          <ul>
                            {item.content.list.map((li, idx) => (
                              <li key={idx}>{li}</li>
                            ))}
                          </ul>
                        )}
                        {item.content.p2 && <p>{item.content.p2}</p>}
                      </>
                    }
                    defaultOpen={item.id === 1}
                  />
                ))}
              </motion.div>

              {}
              <motion.div
                className={styles.policy__areas_img}
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6 }}
              >
                <img
                  src={IMAGES.about.warmBusiness}
                  alt="The heart of a warm business"
                  width={806}
                  height={1008}
                />
                <h3>
                  {policy?.areas.img_title_1} <span>{policy?.areas.img_title_2}</span>
                </h3>
              </motion.div>
            </div>
          </div>
        </div>

        {}
        <motion.p
          className={styles.policy__disclaimer}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          {policy?.disclaimer}
        </motion.p>
      </Container>
    </section>
  );
}
