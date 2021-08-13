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
    city
    street,
    postcode,
    country,
  } = user;

  const token = signToken({
    fullName,
    email,
    id,
    password,
    street,
    postcode,
    phoneNumber,
    country,
    city
  });

  return {
    token,
    user,
  };
};

module.exports = signUp;
