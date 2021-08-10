const { gql } = require("apollo-server");

const typeDefs = gql`
  type Event {
    id: ID!
    type: String!
    name: String!
    description: String!
    day: String!
    street: String!
    postcode: String!
    city: String!
    country: String!
    organizer: String!
    creator: User!
    imageUrl: String!
    participants: [User]
  }

  type User {
    id: ID!
    type: String!
    name: String!
    last_name: String
    password: String!
    imageUrl: String
    email: String!
    phone_number: String!
    street: String!
    postcode: String!
    city: String!
    country: String!
    socials: String
    bio: String
    animals: Boolean
    environmental: Boolean
    international: Boolean
    health: Boolean
    education: Boolean
    art_culture: Boolean
  }

  type Query {
    events(sortBy: String, top: Int): [Event]
    event(id: ID!): Event
    users(sortBy: String, top: Int): [User]
    user(id: ID!): User
  }

  input EventInput {
    eventId: ID!
    type: String!
    name: String!
    description: String!
    day: String!
    street: String!
    postcode: String!
    city: String!
    country: String!
    organizer: String!
    creator: User!
    imageUrl: String!
  }

  input UserInput {
    type: String!
    name: String!
    last_name: String
    password: String!
    imageUrl: String
    email: String!
    phone_number: String!
    street: String!
    postcode: String!
    city: String!
    country: String!
    socials: String
    bio: String
    animals: Boolean!
    environmental: Boolean!
    international: Boolean!
    health: Boolean!
    education: Boolean!
    art_culture: Boolean!
  }

  type Mutation {
    createEvent(input: EventInput!): Event!
    updateEvent(input: EventInput!): Event!
    deleteEvent(id: ID!): ID!
    signUp(input: UserInput!): User!
    login(input: UserInput!): User!
  }
`;

module.exports = typeDefs;
