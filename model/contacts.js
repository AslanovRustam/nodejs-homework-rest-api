// const fs = require("fs/promises");
// const contactsPath = require("./contacts.json");
// const path = require("path");
const shortid = require("shortid");
const db = require("./db");
const normalizeId = require("./normalize");
// const contactsPath = path.join(__dirname, "./model", "./contacts.json");

const listContacts = async () => {
  return await db.value();
};

const getContactById = async (contactId) => {
  const id = normalizeId(contactId);
  return await db.find({ id }).value();
};

const removeContact = async (contactId) => {
  const id = normalizeId(contactId);
  const [record] = await db.remove({ id }).write();
  return record;
};

const addContact = async (body) => {
  const id = shortid();
  const record = {
    id,
    ...body,
  };
  db.push(record).write();

  return record;
};

const updateContact = async (contactId, body) => {
  const id = normalizeId(contactId);
  // const record = await db.find({ id }).assign(body).write();
  const record = await db.find({ id }).assign(body).value();
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
