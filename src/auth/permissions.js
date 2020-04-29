import { rule, shield, and, or, not } from 'graphql-shield';

const isAuthenticated = rule()(async (parent, args, ctx, info) => {
  return ctx.claims !== null;
});

// example of a query restricted to certain roles
// const canReadMetrics = rule()(async (parent, args, ctx, info) => {
//   return ctx.claims && ctx.claims.includes('read-metrics');
// });

export default shield(
  {
    Query: {
      dashboard: isAuthenticated,
      // metrics: and(isAuthenticated, canReadMetrics),
    },
  },
  {
    allowExternalErrors: true,
  },
);
