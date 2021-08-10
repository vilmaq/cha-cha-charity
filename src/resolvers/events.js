const { Event } = require("../models");

const events = async (_, { userId }) => {
  let events;
  if (userId) {
    events = await Event.find({ user: userId }).populate("creator");
  } else {
    events = await Event.find({}).populate("creator");
    console.log(JSON.stringify(events, null, 2));
  }
  return events;
};

module.exports = events;
