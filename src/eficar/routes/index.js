const router = require('express-promise-router')();
const defaultController = require('eficar/controllers/default.controller');

router.route('').get(defaultController.home);
router.use('', require('routes/security.routes'));
router.use('/auctions', require('eficar/routes/auction.routes'));
router.use('/params', require('eficar/routes/params.routes'));

module.exports = router;
