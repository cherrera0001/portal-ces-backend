const router = require('express-promise-router')();
const controller = require('controllers/param.controller');

router.route('').get(controller.all);
router.route('/update').post(controller.updateFromCore);

module.exports = router;
