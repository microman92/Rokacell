import HeroSection from "@/components/sections/Home/hero/HeroSection";
import FeaturesStrip from "@/components/sections/Home/FeaturesStrip/FeaturesStrip";
import Industries from "@/components/sections/Home/Industries/Industries";
import Products from "@/components/sections/Home/Products";
import Branches from "@/components/sections/Home/Branches/Branches";
import CalculateSavings from "@/components/sections/Home/CalculateSavings";
import { News } from "@/components/sections/Home/News/News";
import AboutVideo from "@/components/sections/Home/AboutVideo/AboutVideo";

export default function Page() {
  return (
    <main className="main">
      <HeroSection />
      <FeaturesStrip />
      <Industries />
      <Products />
      <AboutVideo />
      <Branches />
      <CalculateSavings />
      <News />
    </main>
  );
}
