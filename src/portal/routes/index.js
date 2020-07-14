const router = require('express-promise-router')();
const defaultController = require('portal/controllers/default.controller');

router.route('').get(defaultController.home);
router.use('/loans-applications', require('portal/routes/loansApplications.routes'));
router.use('/simulations', require('portal/routes/simulation.routes'));

module.exports = router;
