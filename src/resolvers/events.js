const { Event } = require("../models");

const events = async (_, { creatorId, category }) => {
  const options = {};
  let events;

  if (category !== "all") {
    options.type = category;
  }

  if (creatorId) {
    events = await Event.find({ creator: creatorId })
      .populate("creator")
      .populate("participants")
      .exec();
  } else {
    events = await Event.find(options)
      .populate("creator")
      .populate("participants")
      .exec();
    console.log(JSON.stringify(events, null, 2));
  }
  return events;
};

module.exports = events;
