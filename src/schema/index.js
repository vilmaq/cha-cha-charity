const { gql } = require("apollo-server");

const typeDefs = gql`
  type EventItem {
    id: ID!
    type: String!
    name: String!
    description: String!
    day: Date!
    street: String!
    postcode: String!
    city: String!
    country: String!
    organizer: String!
    creator: String!
    imageUrl: String!
  }

  type UserItem {
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

  input CreateEventItemInput {
    eventId: ID!
    type: String!
    name: String!
    description: String!
    day: Date!
    street: String!
    postcode: String!
    city: String!
    country: String!
    organizer: String!
    creator: String!
    imageUrl: String!
  }
  input UpdateEventItemInput {
    menuItemId: ID!
    menuId: ID!
    type: String!
    name: String!
    day: Date!
    street: String!
    postcode: String!
    city: String!
    country: String!
    organizer: String!
    creator: String!
  }
  input CreateUserInput {
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
    CreateEventItemInput(input: CreateEventItemInput!): EventItem!
    UpdateEventItemInput(input: UpdateEventItemInput!): EventItem!
    CreateUserInput(input: CreateUserInput!): User!
  }
`;

module.exports = typeDefs;
