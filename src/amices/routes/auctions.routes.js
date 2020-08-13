const router = require('express-promise-router')();
const controller = require('amices/controllers/auctions.controller');

router.route('/start').post(controller.start);
router.route('/responses').post(controller.responses);
router.route('/finish').post(controller.finish);

module.exports = router;
