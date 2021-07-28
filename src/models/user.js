const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  user: {
    type: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
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
const User = mongoose.model("User", userSchema);
module.exports = User;
