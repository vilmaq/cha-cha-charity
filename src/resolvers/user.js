const { User } = require("../models");

const user = async (_, { id }) => {
  const user = await User.findById(id).exec();
  return user;
};

module.exports = user;
