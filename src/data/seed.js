const { connect, disconnect } = require("../db");
const Event = require("../models/event");
const events = require("./events");
console.log(Event);
const init = async () => {
  await connect();

  // seed events
  // await Event.deleteMany({});
  await Event.insertMany(events);

  console.log("--- Successfully seeded events ---");

  await disconnect();
};

init();
