const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const charitySchema = new Schema({
  volunteer: {},
  company: [
    {
      type: {
        type: String,
        required: "true",
      },
      companyName: {
        type: String,
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
      eventName: {
        type: String,
        required: "true",
      },
    },
  ],
});
const Charity = mongoose.model("Charity", charitySchema);
module.exports = Charity;
