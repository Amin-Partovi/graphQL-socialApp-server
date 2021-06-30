const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const AuthenticationError = require("apollo-server");

module.exports = context => {
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split("Bearer ")[1];

    if (token) {
      try {
        const user = jwt.verify(token, SECRET_KEY);
        return user;
      } catch (err) {
        throw new Error("expired/invalid token");
      }
    }
    throw new Error("authentication token must be a bearer token");
  }
  throw new Error("authorization header must be provided");
};
