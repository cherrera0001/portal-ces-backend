const router = require('express-promise-router')();
const defaultController = require('amices/controllers/default.controller');

router.route('').get(defaultController.home);
router.use('', require('routes/security.routes'));
router.use('/loans', require('amices/routes/loans.routes'));
router.use('/loans-applications', require('amices/routes/loansApplications.routes'));
router.use('/auctions', require('amices/routes/auctions.routes'));
router.use('/checklist', require('amices/routes/checklist.routes'));
router.use('/documents-to-sign', require('amices/routes/documentsToSign.routes'));

module.exports = router;
