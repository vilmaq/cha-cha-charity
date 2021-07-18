const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const companySchema = new Schema({
  company: [
    {
      type: {
        type: String,
      },
      company_name: {
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
  interests: [
    {
      animals: {
        type: boolean,
        required: "true",
      },
      environmental: {
        type: boolean,
        required: "true",
      },
      international: {
        type: boolean,
        required: "true",
      },
      health: {
        type: boolean,
        required: "true",
      },
      education: {
        type: boolean,
        required: "true",
      },
      art_culture: {
        type: boolean,
        required: "true",
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
const Company = mongoose.model("Company", companySchema);
module.exports = Company;
