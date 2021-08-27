const { User } = require("../models");

const users = async () => {
  const users = await User.find().exec();
  return users;
};

module.exports = users;
