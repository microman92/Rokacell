import { Locale } from "@/lib/locales";
import { getDictionary } from "@/lib/i18n";
import CalculatorPageClient from "./CalculatorPageClient";

export default async function CalculatorPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return <CalculatorPageClient dict={dict.calculator} />;
}
