const { Event } = require("../models");

const events = async (_, { userId }) => {
  let events;
  if (userId) {
    events = await Event.find({ user: userId })
      .populate("creator")
      .populate("participants")
      .exec();
  } else {
    events = await Event.find({})
      .populate("creator")
      .populate("participants")
      .exec();
    console.log(JSON.stringify(events, null, 2));
  }
  return events;
};

module.exports = events;
