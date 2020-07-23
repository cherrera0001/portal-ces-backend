const { ApolloError } = require('apollo-server-express');
const HTTP = require('requests');
const { PATH_ENDPOINT_SAVE_SIMULATION } = require('portal/core.services');
const LoansApplication = require('portal/models/loansApplication.model');

const { CORE_URL } = process.env;

module.exports = async ({ data, rollbar }) => {
  try {
    const { simulation } = data;
    const response = await HTTP.post(`${CORE_URL}${PATH_ENDPOINT_SAVE_SIMULATION}`, simulation);
    if (response.status !== 200) {
      throw new ApolloError(response.statusText, 'ERROR_SAVING_SIMULATION');
    }

    const newLoan = await new LoansApplication({
      customer: {
        ...simulation.customer,
        identificationValue: simulation.customer.rut,
      },
      simulationId: response.data.simulationId,
      loan: { ...simulation.loan, ...simulation.selectedScenario },
      vehicleData: simulation.vehicle,
      externalIds: [simulation.transactionId],
    });
    await newLoan.save();
    return newLoan.simulationId;
  } catch (err) {
    rollbar.log(`src/methods/chl/v1/simulation/saveSimulation::ERROR: ${err.message}`);
    throw new Error(err.message);
  }
};
