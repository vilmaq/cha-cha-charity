const { AuthenticationError } = require("apollo-server");

const { Event, User } = require("../models");

const createEvent = async (_, { input }, context) => {
  if (context.user) {
    const {
      name,
      fullName,
      password,
      imageUrl,
      street,
      phoneNumber,
      postcode,
      city,
      country,
      email,
      bio,
      animals,
      environmental,
      international,
      health,
      education,
      artCulture,
    } = input;

    const user = await User.create({
      name: [],
      fullName: [],
      password: [],
      imageUrl: [],
      street: [],
      phoneNumber: [],
      postcode: [],
      city: [],
      country: [],
      email: [],
      bio: [],
      animals: [],
      environmental: [],
      international: [],
      health: [],
      education: [],
      artCulture: [],
    });

    return await Event.create({
      name,
      day,
      postCode,
      street,
      city,
      country,
      organizer,
      creator,
      imageUrl,
      description,
      user,
      user: context.user.id,
    });
  } else {
    throw new AuthenticationError("Not authorized");
  }
};

// id: "123",
// title: "New Event",
// content: "This is a new Event!!",

module.exports = createEvent;
