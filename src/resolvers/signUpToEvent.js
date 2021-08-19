const { Event } = require("../models");
const { signToken } = require("../utils/auth");

const signUpToEvent = async (_, { userId, eventId }) => {
  console.log(input);
  const event = await Event.findOneAndUpdate(
    { _id: eventId },
    {
      $push: {
        participants: userId,
      },
    }
  );
  return event;
};

module.exports = signUpToEvent;
