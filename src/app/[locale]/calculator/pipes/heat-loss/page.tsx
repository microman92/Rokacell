import HeatLossCalculator from "@/components/calculator/pipes/HeatLossCalculator";
import { Locale } from "@/lib/locales";
import { getDictionary } from "@/lib/i18n";

export default async function PipeHeatLossPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return <HeatLossCalculator dict={dict.calculator?.calc} />;
}
