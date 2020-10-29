const router = require('express-promise-router')();
const controller = require('eficar/controllers/params.controller');
const authenticate = require('middlewares/authenticate.middleware');

router.route('').get(authenticate, controller.all);
router.route('/lists').get(authenticate, controller.lists);

module.exports = router;
