const router = require('express-promise-router')();
const controller = require('portal/controllers/simulation.controller');

router.route('/:simulationId').get(controller.one);

module.exports = router;
