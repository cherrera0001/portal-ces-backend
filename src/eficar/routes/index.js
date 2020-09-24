const router = require('express-promise-router')();
const defaultController = require('eficar/controllers/default.controller');

router.route('').get(defaultController.home);
router.use('', require('routes/security.routes'));
router.use('/auctions', require('eficar/routes/auction.routes'));
router.use('/checklist', require('eficar/routes/checklist.routes'));
router.use('/params', require('eficar/routes/params.routes'));
router.use('/config', require('eficar/routes/config.routes'));
router.use('/documents-to-sign', require('eficar/routes/documentsToSign.routes'));

module.exports = router;
