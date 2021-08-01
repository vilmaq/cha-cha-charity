const { Event } = require("../models");

const events = async (_, { userId }) => {
  let events;
  if (userId) {
    events = await Event.find({ user: userId }).populate("user");
  } else {
    events = await Event.find({}).populate("user");
  }
  return events;
};

module.exports = events;
