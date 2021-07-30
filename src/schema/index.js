const { gql } = require("apollo-server");

const typeDefs = gql`
  type EventItem {
    type:String!
    name: String!
    description: String!
    day: Date!
    street: String!
    postcode: String!
    organizer: String!
    creator: String!
  }

  type UserItem {
    type: String!
    name: String!
    last_name: String
    password: String!
    imageUrl: String
  }

  type Contact {
    email: String!
    phone_number: String!
    street: String!
    postcode:String!
    city: String!
    country:String!
    socials: String
    bio: String
  }

  type Interests {
    animals: Boolean
    environmental: Boolean
    international: Boolean
    health:Boolean
    education:Boolean
    art_culture: Boolean
  }

  type Query{}

  type Mutation{}
`;

module.exports = typeDefs;
