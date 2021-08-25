const { AuthenticationError } = require("apollo-server");

const { User } = require("../models");
const { signToken } = require("../utils/auth");

const login = async (_, { input }) => {
  const { email, password } = input;

  const user = await User.findOne({ email });

  if (!user) {
    throw new AuthenticationError("User does not exist");
  }

  const isValidPassword = await user.validatePassword(password);

  if (!isValidPassword) {
    throw new AuthenticationError("Invalid password");
  }

  const token = signToken({
    id: user._id,
    email: user.email,
    username: user.username,
  });

  return {
    token,
    user,
  };
};

module.exports = login;
