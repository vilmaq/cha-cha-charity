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
    required: true,
  },
  day: {
    type: Date,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  organizer: {
    type: String,
  },
});

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
