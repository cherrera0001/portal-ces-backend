const Config = require('eficar/models/config.model');

const findLoanStatus = async (status) => {
  const config = await Config.findOne();
  if (!config) return { code: 'SIMULATION_SENT', status: 'No accesada', color: 'black' };
  return config.loanStatus.find((el) => el.code === status);
};

module.exports = findLoanStatus;
