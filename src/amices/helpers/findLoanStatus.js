const Configs = require('amices/models/configs.model');

const findLoanStatus = async (status = 'DRAFT_SIMULATION') => {
  const config = await Configs.findOne();
  if (!config) return { code: 'DRAFT_SIMULATION', status: 'Simulación guardada', color: 'black' };
  return config.loanStatus.find((el) => el.code === status);
};

module.exports = findLoanStatus;
