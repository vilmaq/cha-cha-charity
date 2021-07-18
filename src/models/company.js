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
        address: { 
            type: String,
            required: "true",
        },
        phone_number: {
            type: String,
            required: "true",
          },
        email: {
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
          event_name: {
            type: String,
            required: "true",
          },
          description: {
            type: String,
            required: "true",
          },
          day: {
            type: Date,
            required: "true",
          },
          address: {
            type: String,
            required: "true",
          },
        },
      ],
  });
  const Company = mongoose.model("Company", companySchema);
  module.exports = Company;