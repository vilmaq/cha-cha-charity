const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  type: {
    type: String,
    required: true,
  },
  event_name: {
    type: String,
    required: true,
  },
  event_description: {
    type: String,
    required: true,
  },
  event_day: {
    type: Date,
    required: true,
  },
  event_address: {
    type: String,
    required: true,
  },
  event_organizer: {
    type: String,
  },
});

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
