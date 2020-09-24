const router = require('express-promise-router')();
const controller = require('eficar/controllers/config.controller');
const authenticate = require('middlewares/authenticate.middleware');

router.route('/').get(authenticate, controller.get);

module.exports = router;
