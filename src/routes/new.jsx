import { redirect } from "react-router-dom";
import ContactForm from "../components/contact-form";

export async function action({ request }) {
  let formData = await request.formData();
  let updates = Object.fromEntries(formData);

  let contact = await fetch("/contacts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updates),
  }).then((res) => res.json());

  return redirect(`/contacts/${contact.id}`);
}

export default function New() {
  return <ContactForm />;
}
