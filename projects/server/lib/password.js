const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const SECRET_KEY = `${process.env.SECRET_KEY}`;

const signToken = (payload) => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
};
const decodeToken = (token) => {
  return jwt.decode(token, SECRET_KEY);
};

module.exports = { signToken, decodeToken };
