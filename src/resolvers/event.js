const { Event } = require("../models");

const event = async (_, { id }) => {
  const event = await Event.findById(id).populate("user");
  return event;
};

module.exports = event;
