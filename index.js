const { ApolloServer, PubSub } = require("apollo-server");
const mongoose = require("mongoose");
const { MONGODB } = require("./config");
const typeDefs = require("./graphQL/typeDefs");
const resolvers = require("./graphQL/resolver");

const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub }),
});
const PORT = process.env.PORT || 5000;
mongoose
  .connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("mongoDb connected");
    return server.listen({ port: PORT });
  })
  .then(res => console.log(`server is running on ${res.url}`))
  .catch(err => {
    console.log(err);
  });
