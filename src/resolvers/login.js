const { AuthenticationError } = require("apollo-server");

const { User } = require("../models");
// const { signToken } = require("../utils/auth");

const login = async (_, { input }) => {
  const user = await User.findOne({ email: input.email });

  // if (!user) {
  //   throw new AuthenticationError("User does not exist");
  // }

  // const isValidPassword = await user.validatePassword(input.password);

  // if (!isValidPassword) {
  //   throw new AuthenticationError("Failed login");
  // }

  // const { firstName, lastName, email, _id: id } = user;

  // const token = signToken({ firstName, lastName, email, id });

  return {
    // token,
    user,
  };
};

module.exports = login;
