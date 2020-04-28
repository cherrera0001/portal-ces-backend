import { rule, shield, and, or, not } from 'graphql-shield';

const isAuthenticated = rule()(async (parent, args, ctx, info) => {
  return ctx.claims !== null;
});

const canReadMetrics = rule()(async (parent, args, ctx, info) => {
  return ctx.claims === 'read-metrics';
});

export default shield({
  Query: {
    dashboard: and(isAuthenticated),
    metrics: and(isAuthenticated, canReadMetrics),
  },
});
