import "./index.css";
import React from "react";
import { createRoot } from "react-dom/client";
import { DataBrowserRouter, Route } from "react-router-dom";
import Root, {
  loader as rootLoader,
  action as rootAction,
} from "./routes/root";
import Index from "./routes";
import Contact, {
  loader as contactLoader,
  action as contactAction,
} from "./routes/contact";
import Edit, { action as editAction } from "./routes/edit";
import { action as destroyAction } from "./routes/destroy";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DataBrowserRouter>
      <Route
        path="/"
        element={<Root />}
        loader={rootLoader}
        action={rootAction}
      >
        <Route path="contacts/:contactId">
          <Route
            index
            element={<Contact />}
            loader={contactLoader}
            action={contactAction}
          />
          <Route
            path="edit"
            element={<Edit />}
            loader={contactLoader}
            action={editAction}
          />
        </Route>
        <Route index element={<Index />} />
        <Route path="contacts/:contactId/destroy" action={destroyAction} />
      </Route>
      <Route path="*" element={<div>Not found</div>} />
    </DataBrowserRouter>
  </React.StrictMode>,
);
