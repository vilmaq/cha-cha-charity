const { ApolloServer } = require("apollo-server");
// const { GraphQLUpload, graphqlUploadExpress } = require("graphql-upload");
const express = require("express");
// const { ApolloServer, gql } = require("apollo-server-express");
const db = require("./config/connection");

const resolvers = require("./resolvers");
const typeDefs = require("./schema");
const context = require("./context");

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  uploads: {
    maxFileSize: 10000000, // 10 MB
    maxFiles: 20,
  },
});

db.once("open", () => {
  console.log("connected to db");
  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
});
