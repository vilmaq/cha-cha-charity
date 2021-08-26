const { AuthenticationError } = require("apollo-server");
const { Event } = require("../models");

// const { finished } = require("stream/promises");

const createEvent = async (_, { input }, context) => {
  console.log(input);
  if (context.user) {
    const {
      type,
      name,
      description,
      day,
      time,
      street,
      postcode,
      city,
      country,
      organizer,
      creator,
      imageUrl,
    } = input;

    if (creator === context.user.id) {
      let event = await Event.create({
        type,
        name,
        description,
        day,
        time,
        street,
        postcode,
        city,
        country,
        organizer,
        creator,
        imageUrl,
      });
      event = await event.populate("creator").execPopulate();
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

module.exports = createEvent;
