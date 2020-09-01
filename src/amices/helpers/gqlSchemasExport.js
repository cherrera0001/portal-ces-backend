const appRoot = require('app-root-path');
const path = require('path');
const fs = require('fs');
const merge = require('lodash/merge');
const { makeExecutableSchema } = require('graphql-tools');

// --------------------- GRAPHQL SCHEMA EXPORT ---------------------
const schemasExport = [];
const gqlSchemaPath = `${appRoot.path}/src/amices/graphQL/schemas`;
fs.readdirSync(gqlSchemaPath).forEach((file) => {
  if (file.indexOf('index.js') >= 0 || file.indexOf('.map') >= 0 || file.indexOf('.DS_Store') >= 0) return;
  const schema = fs.readFileSync(path.join(gqlSchemaPath, file), 'utf8');
  schemasExport.push(schema);
});
const typeDefs = schemasExport;

// --------------------- GRAPHQL RESOLVERS EXPORT ---------------------
const resolversExport = [];
const gqlResolversPath = `${appRoot.path}/src/amices/graphQL/resolvers`;
fs.readdirSync(gqlResolversPath).forEach((file) => {
  if (file.indexOf('index.js') >= 0 || file.indexOf('.map') >= 0 || file.indexOf('.DS_Store') >= 0) return;
  const { resolvers } = require(path.join(gqlResolversPath, file));
  resolversExport.push(resolvers);
});
const resolvers = merge(...resolversExport);

module.exports = makeExecutableSchema({ typeDefs, resolvers });
