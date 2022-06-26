import { rest } from "msw";
import localforage from "localforage";
import { db } from "./db";

function persist() {
  let contacts = db.contact.getAll();

  // override the persisted list with the new one
  localforage.setItem("contacts", contacts);
}

export const handlers = [
  rest.get("/contacts", async (req, res, ctx) => {
    const q = req.url.searchParams.get("q");

    let contacts = db.contact.findMany({
      where: q
        ? {
            first: {
              contains: q,
            },
          }
        : null,
      orderBy: {
        createdAt: "asc",
      },
    });

    return res(ctx.status(200), ctx.json(contacts));
  }),
  rest.get("/contacts/:id", (req, res, ctx) => {
    let contact = db.contact.findFirst({
      where: {
        id: {
          equals: req.params.id,
        },
      },
    });

    return res(ctx.status(200), ctx.json(contact));
  }),
  rest.post("/contacts", (req, res, ctx) => {
    let contact = db.contact.create({ ...req.body, createdAt: new Date() });

    persist();

    return res(ctx.status(201), ctx.json(contact));
  }),
  rest.patch("/contacts/:id", (req, res, ctx) => {
    let contact = db.contact.update({
      where: {
        id: { equals: req.params.id },
      },
      data: req.body,
    });

    persist();

    return res(ctx.status(202), ctx.json(contact));
  }),
  rest.delete("/contacts/:id", (req, res, ctx) => {
    let contact = db.contact.delete({
      where: {
        id: { equals: req.params.id },
      },
      data: req.body,
    });

    persist();

    return res(ctx.status(204));
  }),
];
