const { ApolloServer } = require('apollo-server');
const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutations');
const { getUserId } = require('./utils');


  const resolvers = {
    Query,
    Mutation
  };

const server = new ApolloServer({
    typeDefs: fs.readFileSync(
        path.join(__dirname, 'schema.graphql'),
        'utf8'
    ),
    introspection: true,
    playground: true,
    resolvers,
    context: ({ req }) => {
      return {
        ...req,
        prisma,
        userId:
          req && req.headers.authorization
            ? getUserId(req)
            : null
      };
    }
})

server
    .listen(process.env.PORT || 5000)
    .then(({ url }) => {
        console.log(`Server is running on ${url}`)
    })