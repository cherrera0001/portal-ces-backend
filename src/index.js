#!/usr/bin/env node
const { createServer } = require('http');
const { ApolloServer } = require('apollo-server-express');
const { applyMiddleware } = require('graphql-middleware');
const createError = require('http-errors');
const socketIo = require('socket.io');
require('app-module-path/register');

const app = require('app');
const { debugApp } = require('debugger');
const schemaDef = require('portal/helpers/gqlSchemasExport');
const rollbar = require('rollbar');
const { permissions, getUser } = require('portal/auth');
require('mongo')();

const { PORT, NODE_ENV } = process.env;
const apiPort = PORT || 8085;
const schema = applyMiddleware(schemaDef, permissions);

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
    const accessToken = req && req.headers ? req.headers['x-access-token'] : '';
    const refreshToken = req && req.headers ? req.headers['x-refresh-token'] : '';
    const { user, claims } = await getUser(accessToken, refreshToken, res);
    return { req, res, rollbar, user, claims };
  },
});

server.applyMiddleware({ app, path: '/graphql' });

app.use((req, res, next) => {
  next(createError(404));
});

const httpServer = createServer(app);

const io = socketIo(httpServer);

io.on('connection', (socket) => {
  console.log('New client connected');
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

httpServer.listen(apiPort, () => {
  debugApp("Let's rock!! 🤘🏻🚀");
  debugApp(`Server running at http://127.0.0.1:${apiPort}/`);
  debugApp(`graphQL server running at http://127.0.0.1:${apiPort}${server.graphqlPath}/`);
});

module.exports = app;
