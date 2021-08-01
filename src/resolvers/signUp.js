const { User } = require("../models");
// const { signToken } = require("../utils/auth");

const signUp = async (_, { input }) => {
  const user = await User.create(input);

  const { firstName, lastName, email, _id: id } = user;

  // const token = signToken({ firstName, lastName, email, id });

  return {
    // token,
    user,
  };
};

module.exports = signUp;
