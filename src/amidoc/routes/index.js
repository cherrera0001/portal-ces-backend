const router = require('express-promise-router')();
const defaultController = require('amidoc/controllers/default.controller');

router.route('').get(defaultController.home);
router.use('/loan-application/auction', require('amidoc/routes/auction.routes'));

module.exports = router;
