import HeroSection from "@/components/sections/Home/hero/HeroSection";
import FeaturesStrip from "@/components/sections/Home/FeaturesStrip/FeaturesStrip";
import Industries from "@/components/sections/Home/Industries/Industries";
import Branches from "@/components/sections/Home/Branches/Branches";

export default function Page() {
  return (
    <main className="main">
      <HeroSection />
      <FeaturesStrip />
      <Industries />
      <Branches />
    </main>
  );
}
