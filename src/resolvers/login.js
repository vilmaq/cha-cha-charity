const { AuthenticationError } = require("apollo-server");

const { User } = require("../models");
const { signToken } = require("../utils/auth");

const login = async (_, { input }) => {
  const user = await User.findOne({ email: input.email });

  if (!user) {
    throw new AuthenticationError("User does not exist");
  }

  const isValidPassword = await user.validatePassword(input.password);

  if (!isValidPassword) {
    throw new AuthenticationError("Invalid password");
  }

  const { password, email, _id: id } = user;

  const token = signToken({ password, email, id });

  return {
    token,
    user,
  };
};

module.exports = login;
