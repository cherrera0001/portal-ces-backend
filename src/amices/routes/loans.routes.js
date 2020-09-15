const router = require('express-promise-router')();
const controller = require('amices/controllers/loans.controller');
const pubSubAuth = require('amices/middlewares/pubSubAuth.middleware');

router.route('/update-status').post(pubSubAuth, controller.updateStatus);

module.exports = router;
