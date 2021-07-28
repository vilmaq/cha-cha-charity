const { connect, disconnect } = require("../db");
const Event = require("../models/event");
const events = require("./events");
const User = require("../models/user");
const users = require("./users");

const init = async () => {
  await connect();

  const eventToParticipantMapper = {
    "Protect the rivers": ["customerservice@ikea.com"],
    "Protect the animals": ["customerservice@ikea.com"],
    "Protect the books": ["customerservice@ikea.com"],
    "Cancer Research UK": ["jack.smith@gmail.com", "customerservice@ikea.com"],
    "Grand Canyon Trust": [
      "sarah.james@gmail.com",
      "customerservice@morrisons.com",
      "living.lands@gmai.com",
    ],
    "Arizona Poised to Permit Canyon Uranium Mine": [
      "roxette.brooks@gmail.com",
      "living.lands@gmai.com",
    ],
    "BUY ART, GIVE ART": ["art.fund@gmail.com"],
  };

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

  // // seed participants
  // const participantsToSeed = events.map((event) => {
  //   const eventName = event.event.event;
  //   console.log(eventName);
  //   const participantsForUser = eventToParticipantMapper[eventName];
  //   console.log(participantsForUser);
  //   const participantIds = participantsForUser.map((participantForEvent) => {
  //     const { id } = eventsFromDb.find((event) => {
  //       return event.name === participantForEvent;
  //     });
  //     return id;
  //   });
  //   return {
  //     ...events,
  //     participants: participantIds,
  //   };
  // });

  await User.insertMany(participantsToSeed);

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
