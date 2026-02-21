import CondensationCalculator from '@/components/calculator/pipes/CondensationCalculator';
import { Locale } from "@/lib/locales";
import { getDictionary } from "@/lib/i18n";

export default async function PipeCondensationPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return <CondensationCalculator dict={dict.calculator?.calc} />;
}
