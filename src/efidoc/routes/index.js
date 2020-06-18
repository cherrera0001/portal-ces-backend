const router = require('express-promise-router')();
const defaultController = require('../controllers/default.controller');

router.use('', defaultController.home);
router.use('loan-application/auction', require('./auction.routes'));

module.exports = router;
