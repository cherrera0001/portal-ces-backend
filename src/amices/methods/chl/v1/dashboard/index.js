const { ApolloError } = require('apollo-server-express');

module.exports = async ({ data, rollbar }) => {
  try {
    return {
      simulations: 0,
      awardedLoans: 0,
      approvedNotAwarded: 0,
    };
  } catch (err) {
    rollbar.log(`src/methods/chl/v1/dashboard/index::ERROR: ${err.message}`);
    throw new Error(err.message);
  }
};
