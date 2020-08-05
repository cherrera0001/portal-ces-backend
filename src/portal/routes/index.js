const router = require('express-promise-router')();
const defaultController = require('portal/controllers/default.controller');

router.route('').get(defaultController.home);
<<<<<<< HEAD
router.use('/loans-applications', require('portal/routes/loansApplications.routes'));
router.use('/loans-applications-fe', require('portal/routes/loansApplicationsFE.routes'));
router.use('/simulations', require('portal/routes/simulation.routes'));
=======
router.use('/chl/v1/loans-applications', require('portal/routes/loansApplications.routes'));
router.use('/chl/v1/auctions', require('portal/routes/auctions.routes'));
>>>>>>> 0a01489fda6a4650ca5e8eeec0ad3d45c9e4306b

module.exports = router;
