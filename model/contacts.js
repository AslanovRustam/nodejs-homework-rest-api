// const fs = require("fs/promises");
// const contactsPath = require("./contacts.json");
// const path = require("path");
const shortid = require("shortid");
const db = require("./db");

// const contactsPath = path.join(__dirname, "./model", "./contacts.json");

const listContacts = async () => {
  return await db.value();
};

const getContactById = async (contactId) => {
  // const contacts = await listContacts();
  // const contactToFind = contacts.find(
  //   (contact) => String(contact.id) === contactId
  // );
  // return contactToFind;
  const normalizeId = (id) => Number(id) || id;
  const id = normalizeId(contactId);
  // const id = String(contactId);
  return await db.find({ id }).value();
};

const removeContact = async (contactId) => {
  // const contacts = await listContacts();
  // let deletedContact = {};
  // const newContacts = contacts.filter((contact) => {
  //   if (contact.id.toString() === contactId) {
  //     deletedContact = {
  //       ...contact,
  //     };
  //     return false;
  //   } else {
  //     return true;
  //   }
  // });
  // await fs.writeFile(contactsPath, JSON.stringify(newContacts), (err) =>
  //   console.log(err)
  // );
  // return deletedContact;
  const [record] = await db.remove({ contactId }).write();
  return record;
};

const addContact = async (body) => {
  // const contacts = await listContacts();
  // const newContactBody = {
  //   ...body,
  //   id: shortid.generate(),
  // };

  // const newData = [...contacts, newContactBody];

  // await fs.writeFile(contactsPath, JSON.stringify(newData), (err) =>
  //   console.log(err)
  // );

  // return newContactBody;
  const id = shortid();
  const record = {
    id,
    ...body,
  };
  // db.get("contacts").push(record).write();
  db.push(record).write();

  return record;
};

const updateContact = async (contactId, body) => {
  // const contacts = await listContacts();
  // let newContact = {};
  // const newContacts = contacts.map((contact) => {
  //   if (contact.id.toString() === contactId) {
  //     newContact = {
  //       ...contact,
  //       ...body,
  //     };
  //     return newContact;
  //   } else {
  //     return contact;
  //   }
  // });
  // await fs.writeFile(contactsPath, JSON.stringify(newContacts), (err) =>
  //   console.log(err)
  // );
  // return newContact;

  // const record = db.find({ contactId }).assign(body).write();
  const record = await db.find({ contactId }).assign(body).value();
  db.write();
  return record.contactId ? record : null;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
