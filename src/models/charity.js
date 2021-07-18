const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const charitySchema = new Schema({
  charity: [
    {
      type: {
        type: String,
        required: "true",
      },
      charity_name: {
        type: String,
        required: "true",
      },
    },
  ],
  contact: [
    {
      email: {
        type: String,
        required: "true",
      },
      phone_number: {
        type: String,
        required: "true",
      },
      address: {
        type: String,
      },
      socials: {
        type: String,
      },
      bio: {
        type: String,
      },
    },
  ],
  events: [
    {
      type: {
        type: String,
        required: "true",
      },
      event_name: {
        type: String,
        required: "true",
      },
      event_description: {
        type: String,
        required: "true",
      },
      event_day: {
        type: Date,
        required: "true",
      },
      event_address: {
        type: String,
        required: "true",
      },
      event_organizer: {
        type: String,
      },
    },
  ],
});
const Charity = mongoose.model("Charity", charitySchema);
module.exports = Charity;
