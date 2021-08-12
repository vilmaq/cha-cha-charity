const login = require("./login");
const signUp = require("./signUp");
const createEvent = require("./createEvent");
const updateEvent = require("./updateEvent");
const deleteEvent = require("./deleteEvent");
const events = require("./events");
const event = require("./event");

const resolvers = {
  Query: {
    events,
    event,
  },
  Mutation: {
    login,
    signUp,
    createEvent,
    updateEvent,
    deleteEvent,
  },
};

module.exports = resolvers;
