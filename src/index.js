import { ApolloServer } from 'apollo-server-express';
import 'app-module-path/register';

import app from 'config/app';
import { debugApp } from 'config/debug';
import schema from 'helpers/gqlSchemasExport';
import rollbar from 'config/rollbarConfig';

import './config/mgConnect';

const { PORT, NODE_ENV } = process.env;
const apiPort = PORT || 8085;
const server = new ApolloServer({
  schema,
  playground: NODE_ENV !== 'production',
  context: () => ({ rollbar }),
});

server.applyMiddleware({ app, path: '/gql' });

app.listen(apiPort, () => {
  debugApp("Let's rock!! 🤘🏻🚀");
  debugApp(`Server running at http://127.0.0.1:${apiPort}/`);
  debugApp(`graphQL server running at http://127.0.0.1:${apiPort}${server.graphqlPath}/`);
});

module.exports = app;
