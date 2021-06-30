const postResolver = require("./post");
const userResolver = require("./user");
const commentResolver = require("./comment");
const post = require("../../models/post");

module.exports = {
  Post: {
    commentCount: parent => parent.comments.length,
    likeCount: parent => parent.likes.length,
  },
  Query: { ...postResolver.Query },
  Mutation: {
    ...userResolver.Mutation,
    ...postResolver.Mutation,
    ...commentResolver.Mutation,
  },
  Subscription: {
    ...postResolver.Subscription,
  },
};
