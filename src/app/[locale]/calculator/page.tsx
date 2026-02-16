'use client';

import PageHero from "@/components/common/pageHero/PageHero";
import { useAccessStore } from "@/stores/accessStore";
import AccessForm from "@/components/calculator/AccessForm/AccessForm";
import Navigation from "@/components/calculator/navigation/Navigation";

export default function CalculatorPage() {
  const hasAccess = useAccessStore((s) => s.hasAccess);

  const heroData = {
    title: (
      <>
        OUR CALCULATOR WILL <span>HELP YOU</span> DETERMINE THE{' '}
        <span>OPTIMAL TYPE</span> OF PRODUCT.
      </>
    ),
  };

  return (
    <main className="main">
      {!hasAccess && <PageHero variant="calculator" {...heroData} />}
      {hasAccess ? <Navigation /> : <AccessForm />}
    </main>
  );
}