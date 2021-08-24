const { Event } = require("../models");

const event = async (_, { id }) => {
  const event = await Event.findById(id)
    .populate("creator")
    .populate("participants")
    .exec();
  return event;
};

module.exports = event;
