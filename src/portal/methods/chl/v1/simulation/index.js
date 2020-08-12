const HTTP = require('requests');
const { PATH_ENDPOINT_SIMULATION } = require('portal/core.services');
const CoreParamsModel = require('portal/models/coreParams.model');

const { CORE_URL } = process.env;

module.exports = async ({ data, rollbar }) => {
  try {
    const { simulation } = data;
    const response = await HTTP.post(`${CORE_URL}${PATH_ENDPOINT_SIMULATION}`, {
      ...simulation,
      loan: {
        ...simulation.loan,
        rateType: simulation.loan.rateType.externalCode,
      },
    });

    const coreParamsRateTypes = await CoreParamsModel.find({
      type: 'RATE_TYPE',
    });

    const fixedResponse = response.data.map((scenario) => {
      scenario.finalLoanValues.rateType = coreParamsRateTypes.find(
        (rate) => rate.externalCode === scenario.finalLoanValues.rateType,
      );
      return scenario;
    });

    return fixedResponse;
  } catch (err) {
    rollbar.log(`src/methods/chl/v1/simulation/index::ERROR: ${err.message}`);
    throw new Error(err.message);
  }
};
