const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const companySchema = new Schema({
  business: {
    type: {
      type: String,
    },
    company_name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: false,
    },
  },

  contact: {
    email: {
      type: String,
      required: true,
    },
    phone_number: {
      type: String,
      required: true,
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

  interests: {
    animals: {
      type: Boolean,
      required: true,
    },
    environmental: {
      type: Boolean,
      required: true,
    },
    international: {
      type: Boolean,
      required: true,
    },
    health: {
      type: Boolean,
      required: true,
    },
    education: {
      type: Boolean,
      required: true,
    },
    art_culture: {
      type: Boolean,
      required: true,
    },
  },

  events: [
    {
      type: Schema.Types.ObjectId,
      ref: "Event",
    },
  ],
});
const Company = mongoose.model("Company", companySchema);
module.exports = Company;
