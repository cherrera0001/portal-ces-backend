const router = require('express-promise-router')();
const controller = require('amices/controllers/checklist.controller');
const pubSubAuth = require('amices/middlewares/pubSubAuth.middleware');
const authenticate = require('middlewares/authenticate.middleware');

router.route('/update').post(pubSubAuth, controller.update);
router.route('/assistances').post(authenticate, controller.assistances);

module.exports = router;
