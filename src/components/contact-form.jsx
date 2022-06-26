import { useRef, useEffect } from "react";
import { Form, useLocation, useNavigate } from "react-router-dom";

export default function ContactForm({ contact = {} }) {
  const focusRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    focusRef.current.select();
  }, [contact]);

  return (
    <Form method="post" id="contact-form">
      <p>
        <span>Name</span>
        <input
          ref={focusRef}
          placeholder="First"
          aria-label="First name"
          type="text"
          name="first"
          defaultValue={contact.first || ""}
        />
        <input
          placeholder="Last"
          aria-label="Last name"
          type="text"
          name="last"
          defaultValue={contact.last || ""}
        />
      </p>
      <label>
        <span>Twitter</span>
        <input
          type="text"
          name="twitter"
          placeholder="@jack"
          defaultValue={contact.twitter || ""}
        />
      </label>
      <label>
        <span>Avatar URL</span>
        <input
          placeholder="https://example.com/avatar.jpg"
          aria-label="Avatar URL"
          type="text"
          name="avatar"
          defaultValue={contact.avatar || ""}
        />
      </label>
      <label>
        <span>Notes</span>
        <textarea name="notes" defaultValue={contact.notes || ""} rows={6} />
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
