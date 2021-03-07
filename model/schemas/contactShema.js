const mongoose = require("mongoose");
const { Schema, model, SchemaTypes } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Set email for contact"],
      unique: true,
      // min: 6,
      // max: 25,
    },
    phone: {
      type: String,
      required: [true, "Set phone for contact"],
      unique: true,
      // min: 6,
      // max: 25,
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.virtual("strName").get(function () {
  // виртуальное поле, которое нельзя записать но можно получить
  return `${this.name} контакт`;
});

contactSchema.plugin(mongoosePaginate);
const Contact = model("contact", contactSchema);

module.exports = Contact;
