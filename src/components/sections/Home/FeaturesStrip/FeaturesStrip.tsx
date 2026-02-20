import MarqueeStrip from "@/components/ui/MarqueeStrip/MarqueeStrip";
import { getDictionary } from "@/lib/i18n";
import { Locale } from "@/lib/locales";

interface FeaturesStripProps {
  locale: Locale;
}

export default async function FeaturesStrip({ locale }: FeaturesStripProps) {
  const dict = await getDictionary(locale);

  const FEATURES = [
    {
      icon: "/svg/ekologichnost-teploizolyacii.svg",
      text: dict.features?.eco || "ENVIRONMENTAL FRIENDLINESS",
    },
    {
      icon: "/svg/dolgovochnost-rokacell.svg",
      text: dict.features?.durability || "DURABILITY",
    },
    {
      icon: "/svg/pojarobezopasnost-materiala.svg",
      text: dict.features?.fireSafety || "FIRE SAFETY",
    },
    {
      icon: "/svg/energoeffektivnost-uteplitelya.svg",
      text: dict.features?.energyEfficiency || "ENERGY EFFICIENCY",
    },
  ];

  return <MarqueeStrip items={FEATURES} />;
}
