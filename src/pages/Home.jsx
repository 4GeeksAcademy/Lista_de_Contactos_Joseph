import { useEffect, useState } from "react";
import ContactCard from "../components/ContactCard";

const AGENDA = "joseph";

export default function Home() {
  const [contacts, setContacts] = useState([]);

  const loadContacts = async () => {
    const resp = await fetch(
      `https://playground.4geeks.com/contact/agendas/${AGENDA}/contacts`
    );
    const data = await resp.json();
    setContacts(data.contacts || []);
  };

  const deleteContact = async (id) => {
    await fetch(
      `https://playground.4geeks.com/contact/agendas/${AGENDA}/contacts/${id}`,
      { method: "DELETE" }
    );
    loadContacts();
  };

  useEffect(() => {
    loadContacts();
  }, []);

  return (
    <div className="container mt-4">
      {contacts.map(contact => (
        <ContactCard
          key={contact.id}
          contact={contact}
          onDelete={deleteContact}
        />
      ))}
    </div>
  );
}