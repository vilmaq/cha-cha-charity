const { connect, disconnect } = require("../db");
const Event = require("../models/event");
const events = require("./events");
const Charity = require("../models/charity");
const charities = require("./charities");
const Company = require("../models/company");
const companies = require("./companies");
const User = require("../models/user");
const users = require("./users");

const init = async () => {
  await connect();

  const charityToEventMapper = {
    "360Degrees": ["Protect the rivers", "Protect the animals"],
    "Cancer Research UK": ["Cancer Research UK"],
    "Art Fund": ["BUY ART, GIVE ART"],
    "Living Lands and Waters": [
      "Arizona Poised to Permit Canyon Uranium Mine",
      "Grand Canyon Trust",
    ],
  };

  const companyToEventMapper = {
    Morrisons: [
      "Grand Canyon Trust",
      "Arizona Poised to Permit Canyon Uranium Mine",
    ],
    IKEA: ["Cancer Research UK"],
    Cisco: [
      "Arizona Poised to Permit Canyon Uranium Mine",
      "Grand Canyon Trust",
    ],
    Porsche: [],
  };

  const userToEventMapper = {
    "jack.smith@gmail.com": ["Cancer Research UK"],
    "sarah.james@gmail.com": ["Grand Canyon Trust"],
    "roxette.brooks@gmail.com": [
      "Arizona Poised to Permit Canyon Uranium Mine",
    ],
  };

  // clear database
  await Event.deleteMany({});
  await Company.deleteMany({});
  await Charity.deleteMany({});

  // seeds events
  await Event.insertMany(events);

  console.log("--- Successfully seeded events ---");

  const eventsFromDb = await Event.find({});

  // seed charities
  const charitiesToSeed = charities.map((charity) => {
    const charityName = charity.charity.charity_name;
    const eventsForCharity = charityToEventMapper[charityName];
    const eventIds = eventsForCharity.map((eventForCharity) => {
      const { id } = eventsFromDb.find((event) => {
        return event.name === eventForCharity;
      });
      return id;
    });
    return {
      ...charity,
      events: eventIds,
    };
  });

  await Charity.insertMany(charitiesToSeed);

  console.log("--- Successfully seeded charities ---");

  // seeds companies

  const companiesToSeed = companies.map((company) => {
    const companyName = company.business.company_name;
    const eventsForCompany = companyToEventMapper[companyName];
    const eventIds = eventsForCompany.map((eventForCompany) => {
      const { id } = eventsFromDb.find((event) => {
        return event.name === eventForCompany;
      });
      return id;
    });
    return {
      ...company,
      events: eventIds,
    };
  });

  console.log(companiesToSeed);
  await Company.insertMany(companiesToSeed);

  console.log("--- Successfully seeded companies ---");

  // seeds users

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

  console.log(usersToSeed);
  await User.insertMany(usersToSeed);

  console.log("--- Successfully seeded users ---");

  await disconnect();
};

init();
