const { Event } = require("../models");

const events = async (_, { creatorId }) => {
  let events;
  if (creatorId) {
    events = await Event.find({ creator: creatorId })
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
