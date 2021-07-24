const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const charitySchema = new Schema({
  charity: {
    type: {
      type: String,
      required: "true",
    },
    charity_name: {
      type: String,
      required: "true",
    },
    password: {
      type: String,
      required: "true",
    },
    imageUrl: {
      type: String,
      required: "false",
    },
  },

  contact: {
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

  events: [
    {
      type: Schema.Types.ObjectId,
      ref: "Event",
    },
  ],
});
const Charity = mongoose.model("Charity", charitySchema);
module.exports = Charity;
