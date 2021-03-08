const Contact = require("./schemas/contactShema");
// const shortid = require("shortid");
// const db = require("./db");
// const normalizeId = require("./normalize");

const listContacts = async (
  userId,
  { sortBy, sortByDesc, filter, limit = "5", offset = "0" }
) => {
  const results = await Contact.paginate(
    { owner: userId },
    {
      limit,
      offset,
      sort: {
        ...(sortBy ? { [`${sortBy}`]: 1 } : {}), // if sortBy = email => email : 1
        ...(sortByDesc ? { [`${sortByDesc}`]: -1 } : {}), // email: -1
      },
      select: filter ? filter.split("|").join(" ") : "",
      populate: {
        path: "owner",
        select: "name email ",
      },
    }
  );

  const { docs: contacts, totalDocs: total } = results;

  return { total: total.toString(), limit, offset, contacts };
};

const getContactById = async (id, userId) => {
  const result = await Contact.findOne({ _id: id, owner: userId }).populate({
    path: "owner",
    select: "name email",
  });
  // console.log(result.id);
  // console.log(result._id);
  return result;
};

const addContact = async (body) => {
  const result = await Contact.create(body);
  return result;
};

const updateContact = async (id, body, userId) => {
  const result = await Contact.findOneAndUpdate(
    { _id: id, owner: userId },
    { ...body },
    { new: true }
  );
  return result;
};

const removeContact = async (id, userId) => {
  const result = await Contact.findOneAndRemove({ _id: id, owner: userId });
  return result;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
