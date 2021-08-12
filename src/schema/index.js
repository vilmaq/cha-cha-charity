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
    id: ID
    type: String!
    fullName: String!
    password: String!
    imageUrl: String
    email: String!
    phoneNumber: String!
    street: String!
    postcode: String!
    city: String!
    country: String!
    bio: String
    animals: Boolean
    environmental: Boolean
    international: Boolean
    health: Boolean
    education: Boolean
    artCulture: Boolean
  }

  type Auth {
    token: ID!
    user: User
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
    creator: ID!
    imageUrl: String!
  }

  input LoginInput {
    password: String!
    email: String!
  }

  input SignUpInput {
    fullName: String!
    password: String!
    email: String!
  }

  type Mutation {
    createEvent(input: EventInput!): Event!
    updateEvent(input: EventInput!): Event!
    deleteEvent(id: ID!): ID!
    signUp(input: SignUpInput!): Auth
    login(input: LoginInput!): Auth
  }
`;

module.exports = typeDefs;
