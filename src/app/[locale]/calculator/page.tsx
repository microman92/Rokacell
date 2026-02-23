import { Locale } from "@/lib/locales";
import { getDictionary } from "@/lib/i18n";
import CalculatorPageClient from "./CalculatorPageClient";
import { createPageMetadata } from "@/lib/seo";

export const generateMetadata = createPageMetadata("calculator", "/calculator");

export default async function CalculatorPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return <CalculatorPageClient dict={dict.calculator} />;
}
