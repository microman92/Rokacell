import { IMAGES } from "@/assets/images";
import { News } from "@/components/common/News/News";
import PageHero from "@/components/common/pageHero/PageHero";
import AboutInfo from "@/components/sections/About/AboutInfo/AboutInfo";
import Policy from "@/components/sections/About/Policy/Policy";
import FactoryInfo from "@/components/sections/FactoryInfo/FactoryInfo";



export default function AboutPage() {


  const heroData = {
    title: "We preserve heat and energy",
    description: "ROKACELL is the leading manufacturer of thermal insulation made from elastomeric materials in Central Asia. We create solutions that make buildings, production facilities, and Building mechanical systems more efficient and safer.",
    bgImage: IMAGES.about.HeroBg,
    overlayImage: IMAGES.about.heroVisual
  }

  return (
    <div>
      <PageHero {...heroData} variant="about" />
      <AboutInfo />
      <FactoryInfo />
      <News variant="about" />
      <Policy />
    </div >
  );
}
