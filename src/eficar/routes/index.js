const router = require('express-promise-router')();
const defaultController = require('eficar/controllers/default.controller');

router.route('').get(defaultController.home);
router.use('/auctions', require('eficar/routes/auction.routes'));

module.exports = router;
