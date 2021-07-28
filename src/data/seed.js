const { connect, disconnect } = require("../db");
const Event = require("../models/event");
const events = require("./events");
const User = require("../models/user");
const users = require("./users");

const init = async () => {
  await connect();

  const userToEventMapper = {
    "jack.smith@gmail.com": ["Cancer Research UK"],
    "sarah.james@gmail.com": ["Grand Canyon Trust"],
    "roxette.brooks@gmail.com": [
      "Arizona Poised to Permit Canyon Uranium Mine",
    ],
    "art.fund@gmail.com": ["BUY ART, GIVE ART"],
    "living.lands@gmai.com": [
      "Arizona Poised to Permit Canyon Uranium Mine",
      "Grand Canyon Trust",
    ],
    "customerservice@morrisons.com": [
      "Grand Canyon Trust",
      "Arizona Poised to Permit Canyon Uranium Mine",
    ],
    "customerservice@ikea.com": ["Cancer Research UK"],
  };

  // const companyToEventMapper = {
  //   Morrisons: [
  //     "Grand Canyon Trust",
  //     "Arizona Poised to Permit Canyon Uranium Mine",
  //   ],
  //   IKEA: ["Cancer Research UK"],
  //   Cisco: [
  //     "Arizona Poised to Permit Canyon Uranium Mine",
  //     "Grand Canyon Trust",
  //   ],
  //   Porsche: [],
  // };

  // const eventToUserMapper = {
  //   ["Cancer Research UK"]: "jack.smith@gmail.com",
  //   ["Grand Canyon Trust"]: "sarah.james@gmail.com",
  //   ["Arizona Poised to Permit Canyon Uranium Mine"]:
  //     "roxette.brooks@gmail.com",
  // };

  // clear database
  await Event.deleteMany({});
  await User.deleteMany({});
  //await Charity.deleteMany({});

  // seeds events
  await Event.insertMany(events);

  console.log("--- Successfully seeded events ---");

  const eventsFromDb = await Event.find({});

  // seed users
  const usersToSeed = users.map((user) => {
    const email = user.contact.email;
    const eventsForUser = userToEventMapper[email];
    const eventIds = eventsForUser.map((eventForUser) => {
      const { id } = eventsFromDb.find((event) => {
        return event.name === eventForUser;
      });
      return id;
    });
    return {
      ...user,
      events: eventIds,
    };
  });

  await User.insertMany(usersToSeed);

  console.log("--- Successfully seeded users ---");

  // seeds companies

  // const companiesToSeed = companies.map((company) => {
  //   const companyName = company.business.company_name;
  //   const eventsForCompany = companyToEventMapper[companyName];
  //   const eventIds = eventsForCompany.map((eventForCompany) => {
  //     const { id } = eventsFromDb.find((event) => {
  //       return event.name === eventForCompany;
  //     });
  //     return id;
  //   });
  //   return {
  //     ...company,
  //     events: eventIds,
  //   };
  // });

  // console.log(companiesToSeed);
  // await Company.insertMany(companiesToSeed);

  // console.log("--- Successfully seeded companies ---");

  // seeds users

  // const usersToSeed = users.map((user) => {
  //   const email = user.contact.email;
  //   const eventsForUser = userToEventMapper[email];
  //   const eventIds = eventsForUser.map((eventForUser) => {
  //     const { id } = eventsFromDb.find((event) => {
  //       return event.name === eventForUser;
  //     });
  //     return id;
  //   });
  //   return {
  //     ...user,
  //     events: eventIds,
  //   };
  // });

  // console.log(usersToSeed);
  // await User.insertMany(usersToSeed);

  // console.log("--- Successfully seeded users ---");

  await disconnect();
};

init();
