const { gql } = require("apollo-server");

const typeDefs = gql`
  type Event {
    id: ID!
    type: String!
    name: String!
    description: String!
    day: String!
    time: String
    street: String!
    postcode: String!
    city: String!
    country: String!
    organizer: String!
    creator: User!
    participants: [User]
    imageUrl: String
  }

  type User {
    id: ID
    type: String!
    fullName: String!
    password: String!
    email: String!
    phoneNumber: String!
    street: String!
    postcode: String!
    city: String!
    country: String!
    imageUrl: String
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
    events(category: String!, creatorId: ID): [Event]
    event(id: ID!): Event
    users(sortBy: String, top: Int): [User]
    user(id: ID!): User
  }

  enum TaskStateEnum {
    VOLUNTEER
    BUSINESS
    CHARITY
  }

  input EventInput {
    ID: ID
    type: String!
    name: String!
    description: String!
    day: String!
    time: String
    street: String!
    postcode: String!
    city: String!
    country: String!
    organizer: String!
    creator: ID!
    imageUrl: String
  }

  input UpdateEvent {
    eventId: ID!
    name: String!
    description: String!
    street: String!
    postcode: String!
  }

  input LoginInput {
    password: String
    email: String!
  }

  input SignUpInput {
    id: ID
    type: String!
    fullName: String!
    password: String!
    email: String!
    phoneNumber: String!
    street: String!
    postcode: String!
    city: String!
    country: String!
    imageUrl: String
    bio: String
    animals: Boolean
    environmental: Boolean
    international: Boolean
    health: Boolean
    education: Boolean
    artCulture: Boolean
  }

  type Mutation {
    createEvent(input: EventInput!): Event!
    updateEvent(input: UpdateEvent!): Event!
    deleteEvent(id: ID!): ID!
    signUp(input: SignUpInput!): Auth
    signUpToEvent(userId: ID!, eventId: ID!): Event!
    login(input: LoginInput!): Auth
  }
`;

module.exports = typeDefs;
