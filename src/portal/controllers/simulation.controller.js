const Simulation = require('portal/models/mg/Simulation');
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
