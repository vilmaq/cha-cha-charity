const events = require("./events");
const user = require("./user");
const createEventItemInput = require("./createEventItemInput");
const updateEventItemInput = require("./updateEventItemInput");
const createUserInput = "./createUserInput.js";

const resolvers = {
  Query: {
    events,
    user,
  },
  Mutation: {
    createEventItemInput,
    updateEventItemInput,
    createUserInput,
  },
};

module.exports = resolvers;
