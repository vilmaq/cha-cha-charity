const { ApolloServer } = require("apollo-server");
const db = require("./config/connection");

const resolvers = require("./resolvers");
const typeDefs = require("./schema");

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

db.once("open", () => {
  console.log("connected to db");
  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
});
