const router = require('express-promise-router')();
const controller = require('amices/controllers/checklist.controller');
const pubSubAuth = require('amices/middlewares/pubSubAuth.middleware');

router.route('/update').post(pubSubAuth, controller.update);

module.exports = router;
