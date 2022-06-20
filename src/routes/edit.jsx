import { useEffect, useRef } from "react";
import {
  Form,
  redirect,
  useLoaderData,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { updateContact } from "../contacts";

export async function action({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateContact(params.contactId, updates);
  return redirect(`/contacts/${params.contactId}`);
}

export default function Edit() {
  const contact = useLoaderData();
  const navigate = useNavigate();
  const location = useLocation();
  const focusRef = useRef();

  useEffect(() => {
    focusRef.current.select();
  }, [contact]);

  return (
    <Form method="post" id="contact-form" key={contact.id}>
      <p>
        <span>Name</span>
        <input
          ref={focusRef}
          placeholder="First"
          aria-label="First name"
          type="text"
          name="first"
          defaultValue={contact.first}
        />
        <input
          placeholder="Last"
          aria-label="Last name"
          type="text"
          name="last"
          defaultValue={contact.last}
        />
      </p>
      <label>
        <span>Twitter</span>
        <input
          type="text"
          name="twitter"
          placeholder="@jack"
          defaultValue={contact.twitter}
        />
      </label>
      <label>
        <span>Avatar URL</span>
        <input
          placeholder="https://example.com/avatar.jpg"
          aria-label="Avatar URL"
          type="text"
          name="avatar"
          defaultValue={contact.avatar}
        />
      </label>
      <label>
        <span>Notes</span>
        <textarea name="notes" defaultValue={contact.notes} rows={6} />
      </label>
      <p>
        <button type="submit">Save</button>

        <button
          type="button"
          onClick={() => {
            if (location.key === "default") {
              navigate("..", {
                replace: true,
                relative: "pathname",
              });
            } else {
              navigate(-1);
            }
          }}
        >
          Cancel
        </button>
      </p>
    </Form>
  );
}
