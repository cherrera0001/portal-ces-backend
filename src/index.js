const { createServer } = require('http');
const { ApolloServer, PubSub } = require('apollo-server-express');
const { applyMiddleware } = require('graphql-middleware');
const createError = require('http-errors');
require('app-module-path/register');
const app = require('config/app');
const { debugApp } = require('config/debug');
const schemaDef = require('helpers/gqlSchemasExport');
const rollbar = require('config/rollbarConfig');
const { permissions, getUser } = require('./auth');
require('./config/mgConnect');

const { PORT, NODE_ENV } = process.env;
const apiPort = PORT || 8085;
const pubsub = new PubSub();
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
    return { req, res, rollbar, pubsub, user, claims };
  },
});

server.applyMiddleware({ app, path: '/graphql' });

app.use((req, res, next) => {
  next(createError(404));
});

const httpServer = createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen(apiPort, () => {
  debugApp("Let's rock!! 🤘🏻🚀");
  debugApp(`Server running at http://127.0.0.1:${apiPort}/`);
  debugApp(`graphQL server running at http://127.0.0.1:${apiPort}${server.graphqlPath}/`);
  debugApp(`🚀 Subscriptions ready at ws://127.0.0.1:${apiPort}${server.subscriptionsPath}`);
});

module.exports = app;
