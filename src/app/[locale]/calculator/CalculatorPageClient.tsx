"use client";

import PageHero from "@/components/common/pageHero/PageHero";
import { useAccessStore } from "@/stores/accessStore";
import AccessForm from "@/components/calculator/AccessForm/AccessForm";
import Navigation from "@/components/calculator/navigation/Navigation";
import { Dictionary } from "@/lib/i18n";

interface Props {
  dict: Dictionary["calculator"];
}

export default function CalculatorPageClient({ dict }: Props) {
  const hasAccess = useAccessStore((s) => s.hasAccess);

  const heroData = {
    title: (
      <>
        {dict?.hero?.titlePart1} <span>{dict?.hero?.titleHighlight1}</span> {dict?.hero?.titlePart2}
        <span>{dict?.hero?.titleHighlight2}</span> {dict?.hero?.titlePart3}
      </>
    ),
  };

  return (
    <main className="main">
      {!hasAccess && <PageHero variant="calculator" {...heroData} />}
      {hasAccess ? <Navigation dict={dict?.navigation} /> : <AccessForm dict={dict?.form} />}
    </main>
  );
}
