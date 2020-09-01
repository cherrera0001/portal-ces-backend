const Configs = require('eficar/models/configs.model');

const findLoanStatus = async (status = 'SIMULATION_SENT') => {
  const config = await Configs.findOne();
  if (!config) return { code: 'SIMULATION_SENT', status: 'No accesada', color: 'black' };
  return config.loanStatus.find((el) => el.code === status);
};

module.exports = findLoanStatus;
