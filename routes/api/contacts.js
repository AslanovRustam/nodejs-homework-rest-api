const express = require("express");
const router = express.Router();
const Contacts = require("../../model/contacts");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await Contacts.listContacts();
    return res.json({
      status: "success",
      code: 200,
      data: {
        contacts,
      },
    });
  } catch (e) {
    next(e);
  }
});

router.get("/:contactId", async (req, res, next) => {
  // try {
  //   const cat = await Cats.getById(req.params.id);
  //   if (cat) {
  //     return res.json({
  //       status: "success",
  //       code: 200,
  //       data: {
  //         cat,
  //       },
  //     });
  //   } else {
  //     return res.status(404).json({
  //       status: "error",
  //       code: 404,
  //       data: "Not Found",
  //     });
  //   }
  // } catch (e) {
  //   next(e);
  // }
});

router.post("/", async (req, res, next) => {
  try {
    const contact = await Contacts.addContact(req.body);
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        contact,
      },
    });
  } catch (e) {
    next(e);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  //  try {
  //    const cat = await Cats.remove(req.params.id);
  //    if (cat) {
  //      return res.json({
  //        status: "success",
  //        code: 200,
  //        data: {
  //          cat,
  //        },
  //      });
  //    } else {
  //      return res.status(404).json({
  //        status: "error",
  //        code: 404,
  //        data: "Not Found",
  //      });
  //    }
  //  } catch (e) {
  //    next(e);
  //  }
});

router.patch("/:contactId", async (req, res, next) => {
  // try {
  //   const cat = await Cats.update(req.params.id, req.body);
  //   if (cat) {
  //     return res.json({
  //       status: "success",
  //       code: 200,
  //       data: {
  //         cat,
  //       },
  //     });
  //   } else {
  //     return res.status(404).json({
  //       status: "error",
  //       code: 404,
  //       data: "Not Found",
  //     });
  //   }
  // } catch (e) {
  //   next(e);
  // }
});

module.exports = router;
