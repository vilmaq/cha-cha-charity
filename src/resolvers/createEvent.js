const { AuthenticationError } = require("apollo-server");
const { Event, User } = require("../models");
const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const { GraphQLUpload, graphqlUploadExpress } = require("graphql-upload");
// const { finished } = require("stream/promises");

const createEvent = async (_, { input }, context) => {
  if (context.user) {
    const {
      type,
      name,
      description,
      day,
      street,
      postcode,
      city,
      country,
      organizer,
      creator,
      phone_number,
      imageUrl,
      user,
    } = input;

    if (user === context.user.id) {
      const event = await Event.create({
        type,
        name,
        description,
        day,
        street,
        postcode,
        city,
        country,
        organizer,
        creator,
        phone_number,
        imageUrl,
      });
      return event;
    } else {
      throw new AuthenticationError(
        "User not authorised to perform this action."
      );
    }
  } else {
    throw new AuthenticationError(
      "User not authorised to perform this action."
    );
  }
};
module.exports = createEvent;
