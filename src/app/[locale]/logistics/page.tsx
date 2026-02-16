import { IMAGES } from "@/assets/images";
import PageHero from "@/components/common/pageHero/PageHero";
import PackingDetails from "@/components/sections/Logistics/PackingDetails/PackingDetails";

export default function LogisticsPage() {

  const heroData = {
    title: "Delivery without delays or hassle",
    description:
      "We organize supplies throughout Central Asia and beyond. Logistics support",
    bgImage: IMAGES.logistics.hero,
  };

  return (
    <main className="main">
      <PageHero {...heroData} variant="logistics" />
      <PackingDetails />
    </main >
  );
}
