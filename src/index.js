#!/usr/bin/env node
const { createServer } = require('http');
const { ApolloServer } = require('apollo-server-express');
const { applyMiddleware } = require('graphql-middleware');
const createError = require('http-errors');
const socketIo = require('socket.io');
require('app-module-path/register');

const app = require('app');
const { debugApp } = require('debugger');
const schemaDef = require('amices/helpers/gqlSchemasExport');
const rollbar = require('rollbar');

require('mongoAmices')();
require('mongoEficar')();

const { PORT, NODE_ENV } = process.env;
const apiPort = PORT || 8085;
const schema = applyMiddleware(schemaDef);

const server = new ApolloServer({
  schema,
  playground: NODE_ENV !== 'production',
  formatError: (err) => {
    if (err.message.startsWith('Database Error: ')) {
      return new Error('Internal server error');
    }
    return err;
  },
  context: async ({ req, res }) => {
    return { req, res, rollbar };
  },
});

server.applyMiddleware({ app, path: '/graphql' });

app.use((req, res, next) => {
  next(createError(404));
});

const httpServer = createServer(app);

app.socketIo = socketIo(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

httpServer.listen(apiPort, () => {
  debugApp("Let's rock!! 🤘🏻🚀");
  debugApp(`Server running at http://127.0.0.1:${apiPort}/`);
  debugApp(`graphQL server running at http://127.0.0.1:${apiPort}${server.graphqlPath}/`);
});

module.exports = app;
