const { AuthenticationError } = require("apollo-server-express");
const { Event, User } = require("../models");

const deleteEvent = async (_, { eventId }, context) => {
  if (context.user) {
    const { id } = context.user;

    const user = await User.findByIdAndUpdate(
      id,
      {
        $pull: {
          savedEvents: { eventId },
        },
      },
      { new: true }
    ).populate("createEvents");

    return user;
  } else {
    throw new AuthenticationError(
      "You are not authorized to perform this operation"
    );
  }
};

module.exports = deleteEvent;
