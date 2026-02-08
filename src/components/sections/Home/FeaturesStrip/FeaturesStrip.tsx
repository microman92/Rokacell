import MarqueeStrip from "@/components/ui/MarqueeStrip/MarqueeStrip";

const FEATURES = [
  {
    icon: "/svg/ekologichnost-teploizolyacii.svg",
    text: "ENVIRONMENTAL FRIENDLINESS",
  },
  {
    icon: "/svg/dolgovochnost-rokacell.svg",
    text: "DURABILITY",
  },
  {
    icon: "/svg/pojarobezopasnost-materiala.svg",
    text: "FIRE SAFETY",
  },
  {
    icon: "/svg/energoeffektivnost-uteplitelya.svg",
    text: "ENERGY EFFICIENCY",
  },
];

export default function FeaturesStrip() {
  return <MarqueeStrip items={FEATURES} />;
}
