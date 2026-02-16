import PageHero from "@/components/common/pageHero/PageHero";
import Products from "@/components/common/Products";

export default function ProductsPage() {

  const heroData = {
    title: (
      <>
        Effective <span>thermal insulation </span>  for any task
      </>
    ),
    description:
      "From ventilation and air conditioning systems to complex engineering networks — ROKACELL products protect against heat loss, condensation, and noise. Quality proven by time and climate.",
  };

  return (
    <main className="main">
      <PageHero {...heroData} variant="products" />
      <Products variant="page" defaultTab="rolls" />
      <p className="products__text">ROKACELL materials are made from foamed synthetic rubber (NBR/PVC) and comply with international quality and safety standards.</p>
    </main >
  );
}
