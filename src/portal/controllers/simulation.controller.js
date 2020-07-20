const Simulation = require('portal/models/simulation.model');
const errors = require('eficar/errors');

const one = async (req, res) => {
  const simulation = await Simulation.findOne({
    simulationId: req.params.simulationId,
  });
  if (!simulation) {
    return errors.notFound(res);
  }
  res.json(simulation);
};

module.exports = { one };
