const router = require('express-promise-router')();
const defaultController = require('portal/controllers/default.controller');

router.route('').get(defaultController.home);
router.use('/loans-applications', require('portal/routes/loansApplications.routes'));
router.use('/loans-applications-fe', require('portal/routes/loansApplicationsFE.routes'));

module.exports = router;
