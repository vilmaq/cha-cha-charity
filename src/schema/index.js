const { gql } = require("apollo-server");

const typeDefs = gql`
  type CharityItem {
    name: String!
    password: String!
    imageURL: String!
  }

  #events will be define in js

  type BusinessItem {
    name: String!
    password: String!
    imageUrl: String!
  }

  type Contact {
    email: String!
    phone_number: String!
    address: String!
    socials: String!
    bio: String!
  }

  type Interests {
    animals: Boolean
    environmental: Boolean
  }

  type Query{}
`;

module.exports = typeDefs;
