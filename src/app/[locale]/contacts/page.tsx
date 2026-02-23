import Contacts from "@/components/common/Contacts/Contacts";
import { Heading } from "@/components/ui/Heading/Heading";
import Container from "@/components/layout/Container/Container";
import { BRANCHES } from "@/data/branches.data";
import styles from "./contacts.module.scss";
import { getDictionary, Dictionary } from "@/lib/i18n";
import { Locale } from "@/lib/locales";
import { createPageMetadata } from "@/lib/seo";

export const generateMetadata = createPageMetadata("contacts", "/contacts");

export default async function ContactsPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const branchesDict = dict.branches;

  return (
    <main className="main">
      <Container className={styles.contacts}>
        <Heading variant="black" tag="h1" className={styles.contacts__title}>
          {branchesDict?.title || "НАШИ ФИЛИАЛЫ"}
        </Heading>
        <div className={styles.contacts__branches}>
          {BRANCHES.map((branch, index) => {
            const translatedBranch = { ...branch };
            
            const t =
              branchesDict?.[branch.id as keyof Omit<NonNullable<Dictionary["branches"]>, "title">];

            if (t) {
              if (t.city) translatedBranch.city = t.city;
              if (t.address !== undefined) translatedBranch.address = t.address;
            }

            return <Contacts key={branch.id} index={index} data={translatedBranch as never} />;
          })}
        </div>
      </Container>
    </main>
  );
}
