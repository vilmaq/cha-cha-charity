const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  user: [
    {
      first_name: {
        type: String,
        required: "true",
      },
      last_name: {
        type: String,
        required: "true",
      },
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
const User = mongoose.model("User", userSchema);
module.exports = User;
