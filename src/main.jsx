import "./index.css";
import React from "react";
import { createRoot } from "react-dom/client";
import { DataBrowserRouter, Route } from "react-router-dom";
import Root, { loader as rootLoader } from "./routes/root";
import Index from "./routes";
import Contact, {
  loader as contactLoader,
  action as contactAction,
} from "./routes/contact";
import New, { action as newAction } from "./routes/new";
import Edit, { action as editAction } from "./routes/edit";
import { action as destroyAction } from "./routes/destroy";
import { worker } from "./mocks/browser";

worker.start();

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DataBrowserRouter>
      <Route path="/" element={<Root />} loader={rootLoader}>
        <Route path="contacts/new" element={<New />} action={newAction} />
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
  </React.StrictMode>
);
