const login = require("./login");
const signUp = require("./signUp");
const signUpToEvent = require("./signUpToEvent");
const createEvent = require("./createEvent");
const updateEvent = require("./updateEvent");
const deleteEvent = require("./deleteEvent");
const events = require("./events");
const event = require("./event");
const users = require("./users");
const user = require("./user");
const { GraphQLUpload, graphqlUploadExpress } = require("graphql-upload");

const resolvers = {
  Query: {
    events,
    event,
    users,
    user,
  },

  Mutation: {
    login,
    signUp,
    createEvent,
    updateEvent,
    deleteEvent,
    signUpToEvent,
  },
};

module.exports = resolvers;
