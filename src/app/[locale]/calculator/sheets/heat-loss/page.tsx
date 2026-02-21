import HeatLossCalculator from '@/components/calculator/sheets/HeatLossCalculator';
import { Locale } from "@/lib/locales";
import { getDictionary } from "@/lib/i18n";

export default async function SheetHeatLossPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return <HeatLossCalculator dict={dict.calculator?.calc} />;
}
