// const { AuthenticationError } = require("apollo-server");

// const { Event, User } = require("../models");

// const createEvent = async (_, { input }, context) => {
//   if (context.user) {
//     const {
//       name,
//       last_name,
//       password,
//       imageUrl,
//       street,
//       phone_number,
//       postcode,
//       city,
//       country,
//       email,
//       socials,
//       bio,
//       animals,
//       environmental,
//       international,
//       health,
//       education,
//       art_culture,
//     } = input;

//     const user = await User.create({
//       name: [],
//       last_name: [],
//       password: [],
//       imageUrl: [],
//       street: [],
//       phone_number: [],
//       postcode: [],
//       city: [],
//       country: [],
//       email: [],
//       socials: [],
//       bio: [],
//       animals: [],
//       environmental: [],
//       international: [],
//       health: [],
//       education: [],
//       art_culture: [],
//     });

//     return await Event.create({
//       name,
//       day,
//       postCode,
//       street,
//       city,
//       country,
//       organizer,
//       creator,
//       imageUrl,
//       description,
//       user,
//       user: context.user.id,
//     });
//   } else {
//     throw new AuthenticationError("Not authorized");
//   }
// };

// // id: "123",
// // title: "New Event",
// // content: "This is a new Event!!",

// module.exports = createEvent;
