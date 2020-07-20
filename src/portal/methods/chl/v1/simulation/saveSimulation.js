const { ApolloError } = require('apollo-server-express');
const HTTP = require('requests');
const { PATH_ENDPOINT_SAVE_SIMULATION } = require('portal/core.services');
const Simulation = require('portal/models/simulation.model');

const { CORE_URL } = process.env;

module.exports = async ({ data, rollbar }) => {
  try {
    const response = await HTTP.post(`${CORE_URL}${PATH_ENDPOINT_SAVE_SIMULATION}`, data.simulation);
    if (response.status !== 200) {
      throw new ApolloError(response.statusText, 'ERROR_SAVING_SIMULATION');
    }
    const simulation = await Simulation({ ...data.simulation, simulationId: response.data.simulationId });
    await simulation.save();
    return response.data;
  } catch (err) {
    rollbar.log(`src/methods/chl/v1/simulation/saveSimulation::ERROR: ${err.message}`);
    throw new Error(err.message);
  }
};
