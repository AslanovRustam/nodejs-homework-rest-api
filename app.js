const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");

const contactsRouter = require("./routes/api/contacts");
const usersRouter = require("./routes/api/users");
require("dotenv").config();

const app = express();

const AVATARS_OF_USERS = process.env.AVATARS_OF_USERS;
app.use(express.static(path.join(__dirname, AVATARS_OF_USERS)));

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(helmet());

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);
app.use("/api/users", usersRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, _req, res, _next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
