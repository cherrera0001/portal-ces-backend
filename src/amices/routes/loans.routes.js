const router = require('express-promise-router')();
const controller = require('amices/controllers/loans.controller');
const pubSubAuth = require('amices/middlewares/pubSubAuth.middleware');
const authenticate = require('middlewares/authenticate.middleware');

router.route('/update-status').post(pubSubAuth, controller.updateStatus);
router.route('/loan-status').get(authenticate, controller.findAllLoanStatus);

module.exports = router;
