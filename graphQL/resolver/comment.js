const checkAuth = require("../../util/checkAuth");
const {
  userInputError,
  AuthenticationError,
  UserInputError,
} = require("apollo-server");
const Post = require("../../models/post");
const post = require("../../models/post");

module.exports = {
  Mutation: {
    createComment: async (_, { postId, body }, context) => {
      const { username } = checkAuth(context);

      if (body.trim() == "") {
        throw new userInputError("error", {
          errors: { body: "comment body should not be empty" },
        });
      }
      const post = await Post.findById(postId);
      if (post) {
        post.comments.unshift({
          body,
          username,
          createdAt: new Date().toISOString(),
        });
        console.log(post);
        await post.save();
        return post;
      } else throw new userInputError("post not found");
    },
    deleteComment: async (_, { postId, commentId }, context) => {
      const user = checkAuth(context);
      const post = await Post.findById(postId);
      if (post) {
        const commentIndex = post.comments.findIndex(c => c.id == commentId);
        if (user.username == post.comments[commentIndex].username) {
          post.comments.splice(commentIndex, 1);
          await post.save();
          return post;
        } else {
          throw new AuthenticationError("action not allowed");
        }
      } else {
        throw new UserInputError("post not found");
      }
    },
    async likePost(_, { postId }, context) {
      const { username } = checkAuth(context);
      const post = await Post.findById(postId);
      if (post) {
        if (post.likes.find(like => like.username === username)) {
          post.likes = post.likes.filter(like => like.username !== username);
          await post.save();
        } else {
          post.likes.push({
            username,
            createdAt: new Date().toISOString,
          });
        }
      } else new UserInputError("post not found");
      await post.save();
      return post;
    },
  },
};
