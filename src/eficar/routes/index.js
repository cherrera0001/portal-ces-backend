const router = require('express-promise-router')();
const defaultController = require('eficar/controllers/default.controller');

router.route('').get(defaultController.home);
router.use('/chl/v1/auctions', require('eficar/routes/auction.routes'));

module.exports = router;
