import { useEffect, useRef } from "react";
import { Form, useFetcher, useLoaderData, useLocation } from "react-router-dom";
import { getContact, updateContact } from "../contacts";

export function loader({ params }) {
  return getContact(params.contactId);
}

export async function action({ request, params }) {
  let formData = await request.formData();
  return updateContact(params.contactId, {
    favorite: formData.get("favorite") === "true" ? true : false,
  });
}

export default function ContactRoute() {
  const contact = useLoaderData();
  return <Contact contact={contact} />;
}

export function Contact({ contact }) {
  const location = useLocation();
  const headingRef = useRef();

  useEffect(() => {
    if (location.state?.takeFocus) {
      headingRef.current?.focus();
    }
  }, [location]);

  return (
    <div id="contact">
      <div>
        <img key={contact.avatar} src={contact.avatar || null} />
      </div>

      <div>
        <h1 ref={headingRef} tabIndex="-1">
          {contact.first} {contact.last}
        </h1>

        {contact.twitter && (
          <p>
            <a target="_blank" href={`https://twitter.com/${contact.twitter}`}>
              {contact.twitter}
            </a>
          </p>
        )}

        {contact.notes && <p>{contact.notes}</p>}

        <div id="contact-actions">
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={event => {
              if (!confirm("Are you sure you want to delete this record?")) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
          <Favorite contact={contact} />
        </div>
      </div>
    </div>
  );
}

function Favorite({ contact }) {
  const fetcher = useFetcher();
  let favorite = contact.favorite;
  if (fetcher.formData) {
    favorite = fetcher.formData.get("favorite") === "true" ? true : false;
  }

  return (
    <fetcher.Form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      >
        {favorite ? "★" : "☆"}
      </button>
    </fetcher.Form>
  );
}
