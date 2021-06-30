const { gql } = require("apollo-server");

module.exports = gql`
  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  type User {
    id: ID!
    username: String!
    email: String!
    token: String!
    createdAt: String!
  }
  type Post {
    id: ID!
    body: String!
    username: String!
    createdAt: String!
    likes: [Like]!
    comments: [Comment]!
    commentCount: Int!
    likeCount: Int!
  }

  type Like {
    createdAt: String!
    username: String!
    id: ID!
  }

  type Comment {
    id: ID!
    createdAt: String!
    username: String!
    body: String!
  }
  type Query {
    getPosts: [Post]!
    getPost(postId: ID): Post!
  }
  type Mutation {
    registerUser(registerInput: RegisterInput!): User!
    loginUser(username: String!, password: String!): User!
    createPost(body: String!): Post!
    deletePost(postId: ID!): String!
    createComment(postId: ID!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
    likePost(postId: ID!): Post!
  }
  type Subscription {
    newPost: Post!
  }
`;
