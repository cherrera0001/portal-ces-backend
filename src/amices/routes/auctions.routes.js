const router = require('express-promise-router')();
const controller = require('amices/controllers/auctions.controller');
const pubSubAuth = require('amices/middlewares/pubSubAuth.middleware');

router.route('/start').post(pubSubAuth, controller.start);
router.route('/responses').post(pubSubAuth, controller.responses);
router.route('/finish').post(pubSubAuth, controller.finish);

module.exports = router;
