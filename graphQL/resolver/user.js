const { gql } = require("apollo-server");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");
const { SECRET_KEY } = require("../../config");
const { UserInputError } = require("apollo-server");
const { validateRegister, validateLogin } = require("../../util/validate");

const generateToken = user => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    SECRET_KEY,
    { expiresIn: "1h" }
  );
};

module.exports = {
  Mutation: {
    async loginUser(_, { username, password }, context, info) {
      const { errors, valid } = validateLogin(username, password);
      if (!valid) {
        throw new UserInputError("errors", { errors });
      }
      const user = await User.findOne({ username });
      if (!user) {
        errors.general = "user not found";
        throw new UserInputError("user not found", { errors });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.general = "wrong credential";
        throw new UserInputError("wrong credential", { errors });
      }
      const token = generateToken(user);
      return { ...user._doc, id: user.id, token };
    },
    async registerUser(
      _,
      { registerInput: { password, username, confirmPassword, email } },
      context,
      info
    ) {
      //todo: validate user data
      const { errors, valid } = validateRegister(
        password,
        username,
        confirmPassword,
        email
      );
      if (!valid) {
        throw new UserInputError("errors", { errors });
      }
      //todo: unique username
      const user = await User.findOne({ username });
      if (user) {
        throw new UserInputError("this username is taken ", {
          errors: {
            username: "the username is taken",
          },
        });
      }

      //todo: token
      password = await bcrypt.hash(password, 12);
      const newUser = new User({
        email: email,
        password: password,
        username: username,
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();

      const token = generateToken(res);

      return { ...res._doc, id: res.id, token };
    },
  },
};
