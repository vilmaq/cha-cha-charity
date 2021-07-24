const { connect, disconnect } = require("../db");
const Event = require("../models/event");
const events = require("./events");
const Charity = require("../models/charity");
const charities = require("./charities");

const init = async () => {
  await connect();

  const charityToEventMapper = {
    "360Degrees": ["Protect the rivers", "Protect the animals"],
  };

  // seed events
  await Event.deleteMany({});
  await Event.insertMany(events);

  console.log("--- Successfully seeded events ---");

  const eventsFromDb = await Event.find({});
  //seed charities
  const charitiesToSeed = charities.map((charity) => {
    const charityName = charity.charity.charity_name;
    const eventsForCharity = charityToEventMapper[charityName];
    const eventIds = eventsForCharity.map((eventForCharity) => {
      const { id } = eventsFromDb.find((event) => {
        return event.event_name === eventForCharity;
      });
      return id;
    });
    return {
      ...charity,
      events: eventIds,
    };
  });
  await Charity.insertMany(charitiesToSeed);

  await disconnect();
};

init();
