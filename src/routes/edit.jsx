import { redirect, useLoaderData } from "react-router-dom";
import ContactForm from "../components/contact-form";

export async function action({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);

  await fetch(`/contacts/${params.contactId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updates),
  });

  return redirect(`/contacts/${params.contactId}`);
}

export default function Edit() {
  const contact = useLoaderData();

  return <ContactForm contact={contact} />;
}
