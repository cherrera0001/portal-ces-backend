const router = require('express-promise-router')();
const defaultController = require('portal/controllers/default.controller');

router.route('').get(defaultController.home);
router.use('/chl/v1/loans-applications', require('portal/routes/loansApplications.routes'));

module.exports = router;
