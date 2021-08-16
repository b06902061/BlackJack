// import {PubSub, ApolloServer} from 'apollo-server-express';
import {GraphQLServer, PubSub} from 'graphql-yoga';
import 'dotenv-defaults/config.js';
import Query from './resolvers/Query.js';
import Mutation from './resolvers/Mutation.js';
import Subscription from './resolvers/Subscription.js';
import Game from './resolvers/Game.js';

const pubSub = new PubSub();
const rooms = new Map();
const port = process.env.PORT || 8000;

const server = new GraphQLServer({
    typeDefs: "./schema.graphql",
    resolvers: {
      Query,
      Mutation,
      Subscription,
      Game
    },
    context: {
      rooms,
      pubSub,
    },
});

server.start({port}, () => {
    console.log("The server is up on port " + port + ".");
})