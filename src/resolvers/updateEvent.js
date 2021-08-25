const { AuthenticationError } = require("apollo-server");

const { Event } = require("../models");

const updateEvent = async (_, { input }, context) => {
  if (context.user) {
    const {
      type,
      name,
      description,
      day,
      street,
      postcode,
      city,
      country,
      organizer,
      //creator,
      user,
      eventId,
    } = input;

    if (user === context.user.id) {
      // //const newEvent = await Event.findOne({
      //   _id: eventId,
      // });
      //console.log(newEvent);
      const event = await Event.findByIdAndUpdate(
        eventId,
        {
          type,
          name,
          description,
          day,
          street,
          postcode,
          city,
          country,
          organizer,
          //creator,
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
