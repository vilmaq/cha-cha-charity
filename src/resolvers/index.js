const login = require("./login");
const signUp = require("./signUp");
const signUpToEvent = require("./signUpToEvent");
const createEvent = require("./createEvent");
const updateEvent = require("./updateEvent");
const deleteEvent = require("./deleteEvent");
const events = require("./events");
const event = require("./event");
const { GraphQLUpload, graphqlUploadExpress } = require("graphql-upload");
const imageUpload = require("./imageUpload");

const resolvers = {
  Query: {
    events,
    event,
  },

  Upload: GraphQLUpload,

  Mutation: {
    login,
    signUp,
    createEvent,
    updateEvent,
    deleteEvent,
    signUpToEvent,
    imageUpload,
  },
};

module.exports = resolvers;
