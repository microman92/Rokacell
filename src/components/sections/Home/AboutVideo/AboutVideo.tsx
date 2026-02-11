import Container from "@/components/layout/Container/Container";
import styles from "./AboutVideo.module.scss";



export default function AboutVideo() {


  return (
    <div className={styles.aboutVideo}>
      <Container className={styles.aboutVideo__inner}>
        <video className={styles.aboutVideo__video} src="/video/Roka2.mp4" controls width={805}></video>
        <p className={styles.aboutVideo__text}>Behind each of our products is a term of professionals and well-thought-out processes</p>
      </Container>
    </div>
  )


}
