import { useEffect } from "react";
import { useNavigate, useNavigation, useSubmit } from "react-router-dom";
import { Form, NavLink, Outlet, useLoaderData } from "react-router-dom";
import { Contact } from "./contact";

export async function loader({ request }) {
  let url = new URL(request.url);

  let q = url.searchParams.get("q");

  let contacts = await fetch("/contacts?" + url.searchParams).then((res) =>
    res.json()
  );

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

  const searching = navigation.location
    ? new URLSearchParams(navigation.location.search).has("q")
    : false;

  useEffect(() => {
    let searchInput = document.getElementById("q");
    if (q && !searchInput.value) {
      searchInput.value = q;
    } else if (!q) {
      searchInput.value = "";
    }
  }, [q]);

  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <Form
            id="search-form"
            role="search"
            onSubmit={(event) => {
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
              onChange={(event) => {
                let isFirstSearch = q == null;
                submit(event.currentTarget.form, {
                  replace: !isFirstSearch,
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
          <button onClick={() => navigate("/contacts/new")}>New</button>
        </div>
        <nav>
          <ul>
            {contacts.map((contact) => (
              <li key={contact.id}>
                <NavLink
                  className={({ isActive, isPending }) =>
                    isActive ? "active" : isPending ? "pending" : ""
                  }
                  to={`contacts/${contact.id}`}
                  replace={q != null}
                >
                  {contact.first || contact.last ? (
                    <>
                      {contact.first} {contact.last}
                    </>
                  ) : (
                    <i>No Name</i>
                  )}{" "}
                  {contact.favorite && <span>★</span>}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div id="detail" className={navigation.state !== "idle" ? "loading" : ""}>
        {firstContact ? <Contact contact={firstContact} /> : <Outlet />}
      </div>
    </>
  );
}
