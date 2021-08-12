const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  type: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  day: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  postcode: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: false,
  },
  country: {
    type: String,
    required: true,
  },
  organizer: {
    type: String,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  imageUrl: {
    type: String,
    required: true,
  },

  participants: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
