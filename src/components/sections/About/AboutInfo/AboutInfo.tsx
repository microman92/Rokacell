import { Dictionary } from "@/lib/i18n";
import styles from "./AboutInfo.module.scss";

type AboutInfoProps = {
  dict: Dictionary["about"];
};

export default function AboutInfo({ dict }: AboutInfoProps) {
  const info = dict?.info;

  return (
    <div className={styles.about}>
      <h2 className={styles.about__title}>{info?.title || "About the company"}</h2>
      <p className={styles.about__text}>
        <span>ROKACELL</span>
        {info?.p1_1 || " "}
        <span>ROKAFLEX</span>
        {info?.p1_2 || ""}
      </p>
      <p className={styles.about__text}>
        {info?.p2_1 || ""}
        <span>ROKACELL</span>
        {info?.p2_2 || ""}
        <span>Roka Yalıtım A.Ş.</span>
        {info?.p2_3 || ""}
        <span>Aysel Inshaat</span>
        {info?.p2_4 || ""}
      </p>
    </div>
  );
}
