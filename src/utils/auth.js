const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET || "my local secret";
const expiresIn = process.env.JWT_EXPIRES_IN || "1h";

const signToken = (payload) => {
  return jwt.sign(payload, secret, { expiresIn });
};

const verifyToken = (token) => {
  return jwt.verify(token, secret, { maxAge: expiresIn });
};

module.exports = { signToken, verifyToken };
