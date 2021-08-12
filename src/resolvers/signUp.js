const { User } = require("../models");
const { signToken } = require("../utils/auth");

const signUp = async (_, { input }) => {
  console.log(input);
  const user = await User.create(input);

  const {
    fullName,
    email,
    _id: id,
    password,
    phoneNumber,
    street,
    postcode,
    country,
  } = user;

  const token = signToken({ fullName, email, id });

  return {
    token,
    user,
  };
};

module.exports = signUp;
