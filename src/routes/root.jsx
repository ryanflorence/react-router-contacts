import { useEffect } from "react";
import {
  redirect,
  useNavigate,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import { Form, NavLink, Outlet, useLoaderData } from "react-router-dom";
import { createContact, getContacts } from "../contacts";
import { Contact } from "./contact";

export async function action() {
  let contact = await createContact();
  return redirect(`/contacts/${contact.id}/edit`);
}

export async function loader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const contacts = await getContacts(q);
  return {
    contacts,
    q,
    firstContact: q ? contacts[0] : null,
  };
}

export default function Root() {
  const { contacts, q, firstContact } = useLoaderData();

  const submit = useSubmit();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const searching =
    navigation.state === "loading" &&
    navigation.location.search.startsWith("?q");

  useEffect(() => {
    let searchInput = document.getElementById("q");
    if (q && !searchInput.value) {
      // only update it if it's empty
      searchInput.value = q;
    } else if (!q) {
      searchInput.value = "";
    }
  }, [q]);

  return (
    <div id="root">
      <div id="sidebar">
        <Form
          id="search-form"
          role="search"
          onSubmit={event => {
            if (firstContact) {
              navigate(`/contacts/${firstContact.id}`, {
                replace: true,
                state: { takeFocus: true },
              });
              event.preventDefault();
            }
          }}
        >
          <input
            id="q"
            className={searching ? "loading" : ""}
            onChange={event => {
              submit(event.currentTarget.form, {
                replace: q != null,
              });
            }}
            aria-label="Search contacts"
            placeholder="Search"
            type="search"
            name="q"
            defaultValue={q}
          />
          <div id="search-spinner" aria-hidden="polite" hidden={!searching} />
          <div className="sr-only" aria-live="polite">
            {q ? `${contacts.length} results for ${q}` : ""}
          </div>
        </Form>
        <nav>
          <ul>
            {contacts.map(contact => (
              <li key={contact.id}>
                <NavLink
                  className={({ isActive, isPending }) =>
                    isActive ? "active" : isPending ? "pending" : ""
                  }
                  to={`contacts/${contact.id}`}
                  replace={Boolean(q)}
                >
                  {contact.first || contact.last ? (
                    <>
                      {contact.first} {contact.last} {contact.favorite && "★"}
                    </>
                  ) : (
                    <i>No Name</i>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <Form method="post" id="new-contact-form">
          <button type="submit" id="new-contact-button">
            New Contact
          </button>
        </Form>
      </div>
      <div id="detail" className={navigation.state !== "idle" ? "loading" : ""}>
        {firstContact ? <Contact contact={firstContact} /> : <Outlet />}
      </div>
    </div>
  );
}
