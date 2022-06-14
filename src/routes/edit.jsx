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
      <div id="contact-form-avatar">
        <img src={contact.avatar || null} />
      </div>

      <div>
        <p>
          <input
            ref={focusRef}
            placeholder="First"
            aria-label="First name"
            type="text"
            name="first"
            defaultValue={contact.first}
          />{" "}
          <input
            placeholder="Last"
            aria-label="Last name"
            type="text"
            name="last"
            defaultValue={contact.last}
          />
        </p>
        <p>
          <label>
            Twitter:
            <br />
            <input type="text" name="twitter" defaultValue={contact.twitter} />
          </label>
        </p>
        <p>
          <label>
            Avatar URL:
            <br />
            <input
              placeholder="Avatar URL"
              aria-label="Avatar URL"
              type="text"
              name="avatar"
              defaultValue={contact.avatar}
            />
          </label>
        </p>
        <p>
          <label htmlFor="notes">Notes:</label>
          <br />
          <textarea name="notes" defaultValue={contact.notes} rows={6} />
        </p>
        <p id="edit-actions">
          <button type="submit">Save</button>

          {location.key !== "default" && (
            <button
              type="button"
              onClick={() => {
                navigate(-1);
              }}
            >
              Cancel
            </button>
          )}
        </p>
      </div>
    </Form>
  );
}
