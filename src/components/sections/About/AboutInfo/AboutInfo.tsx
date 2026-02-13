import styles from "./AboutInfo.module.scss";

export default function AboutInfo() {
  return (
    <div className={styles.about}>
      <h2 className={styles.about__title}>About the company</h2>
      <p className={styles.about__text}><span>ROKACELL</span> is a dynamically developing company specializing in the production of technical thermal insulation made from synthetic rubber under the <span>ROKAFLEX</span>  brand. Our products are used in HVAC (heating, ventilation, and air conditioning) systems, ensuring reliability and energy efficiency.</p>
      <p className={styles.about__text}>The company <span>ROKACELL</span>  was founded in 2021 as a result of cooperation between <span>Roka Yalıtım A.Ş.</span> (Istanbul, Turkey) — a leading manufacturer with more than 20 years of experience in the field of insulation materials, and <span>Aysel Inshaat</span> (Tashkent, Uzbekistan) — one of the country's authoritative construction companies.</p>
    </div>
  )
}
