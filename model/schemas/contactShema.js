const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
      unique: true,
    },
    email: {
      type: Number,
      required: [true, "Set email for contact"],
      unique: true,
      min: 6,
      max: 25,
    },
    phone: {
      type: Number,
      required: [true, "Set phone for contact"],
      unique: true,
      min: 6,
      max: 25,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.virtual("strName").get(function () {
  // виртуальное поле, которое нельзя записать но можно получить
  return `${this.name} контакт`;
});

const Contact = model("contact", contactSchema);

module.exports = Contact;
