const { AuthenticationError } = require("apollo-server");

const { Event } = require("../models");

const signUpToEvent = async (_, { userId, eventId }, context) => {
  if (context.user && userId === context.user.id) {
    const event = await Event.findOneAndUpdate(
      { _id: eventId },
      {
        $set: {
          participants: userId,
        },
      },
      { new: true }
    )
      .populate("creator")
      .populate("participants");
    console.log(event);
    return event;
  } else {
    throw new AuthenticationError(
      "User not authorised to perform this action."
    );
  }
};

module.exports = signUpToEvent;
