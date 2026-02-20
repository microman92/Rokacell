import Contacts from "@/components/common/Contacts/Contacts";
import { Heading } from "@/components/ui/Heading/Heading";
import Container from "@/components/layout/Container/Container";
import { BRANCHES } from "@/data/branches.data";
import styles from "./contacts.module.scss";

export default function ContactsPage() {
  return (
    <main className="main">

      <Container className={styles.contacts}>
        <Heading variant="black" tag="h1" className={styles.contacts__title}>Our Contacts</Heading>
        <div className={styles.contacts__branches}>
          {
            BRANCHES.map((branch) => (
              <Contacts key={branch.id} data={branch} />
            ))
          }
        </div>
      </Container>

    </main>
  );
}
