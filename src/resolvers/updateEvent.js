const { AuthenticationError } = require("apollo-server");

const { Event } = require("../models");

const updateEvent = async (_, { input }, context) => {
  if (context.user) {
    const { name, description, street, postcode, user, eventId } = input;

    if (user === context.user.id) {
      // //const newEvent = await Event.findOne({
      //   _id: eventId,
      // });
      //console.log(newEvent);
      const event = await Event.findByIdAndUpdate(
        eventId,
        {
          name,
          description,
          street,
          postcode,
        },
        { new: true }
      ).populate("participants");

      console.log(event);

      return event;
    } else {
      throw new AuthenticationError(
        "User not authorised to perform this action."
      );
    }
  } else {
    throw new AuthenticationError(
      "User not authorised to perform this action."
    );
  }
};

module.exports = updateEvent;
