import Contacts from "@/components/common/Contacts/Contacts";
import Container from "@/components/layout/Container/Container";
import { BRANCHES } from "@/data/branches.data";

export default function ContactsPage() {
  return (
    <main className="main">

      <Container>
        <h1>Our Contacts</h1>

        {
          BRANCHES.map((branch) => (
            <Contacts key={branch.id} data={branch} variant='ContactsPage' />
          ))
        }
      </Container>

    </main>
  );
}
