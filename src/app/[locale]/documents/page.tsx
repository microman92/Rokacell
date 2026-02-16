import { IMAGES } from "@/assets/images";
import PageHero from "@/components/common/pageHero/PageHero";
import Passport from "@/components/sections/Documents/Passport/Passport";
import Certificates from "@/components/sections/Documents/Certificates/Certificates";
import Quality from "@/components/sections/Documents/Quality/Quality";

export default function DocumentsPage() {
  const heroData = {
    title: "They trust us because everything is transparent with us",
    description:
      "We value our clients' trust, so we provide complete documentation — from certificates to technical passports. Everything to ensure you are confident in every meter of our thermal insulation.",
    overlayImage: IMAGES.documents.documentsLogo,
  };

  return (
    <main className="main">
      <PageHero {...heroData} variant="documents" />
      <Passport />
      <Certificates />
      <Quality />
    </main>
  );
}
