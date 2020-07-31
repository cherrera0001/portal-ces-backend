const router = require('express-promise-router')();
const controller = require('eficar/controllers/params.controller');

router.route('').get(controller.all);
router.route('/updateCoreParams').post(controller.updateFromCore);

module.exports = router;
