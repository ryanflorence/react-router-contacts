import { redirect } from "react-router-dom";

export async function action({ params }) {
  await fetch(`/contacts/${params.contactId}`, {
    method: "DELETE",
  });

  return redirect("/");
}
