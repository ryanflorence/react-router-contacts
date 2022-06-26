import { faker } from "@faker-js/faker";
import localforage from "localforage";
import { factory, nullable, primaryKey } from "@mswjs/data";

export const db = factory({
  contact: {
    id: primaryKey(faker.datatype.uuid),
    first: faker.name.firstName,
    last: faker.name.lastName,
    twitter: nullable(String),
    avatar: faker.image.avatar,
    favorite: () => false,
    notes: faker.lorem.paragraph,
    createdAt: faker.date.past,
  },
});

let persistedContacts = await localforage.getItem("contacts");

// if we have something in the storage, use it to seed the db
if (persistedContacts && persistedContacts.length > 0) {
  persistedContacts.forEach(db.contact.create);
} else {
  // if we don't have anything in the storage, generate some fake data
  const initialContacts = Array.from({ length: 10 }).map(db.contact.create);

  // and persist to the storage
  localforage.setItem("contacts", initialContacts);
}
