const router = require('express-promise-router')();
const controller = require('eficar/controllers/auction.controller');
const validate = require('eficar/middlewares/validate.middleware');
const schema = require('eficar/validations/auction.validation');
const coreAuth = require('eficar/middlewares/coreAuth.middleware');
const authenticate = require('middlewares/authenticate.middleware');

router.route('').get(authenticate, controller.all);
router.route('/:id').get(authenticate, controller.get);
router.route('/send-response').post(authenticate, controller.sendResponse);

// CORE URLS
router.route('').post(coreAuth, validate(schema.create), controller.create);
router.route('/:rut').post(coreAuth, validate(schema.create), controller.create);
router.route('/update/:rut').post(coreAuth, controller.update);
router.route('/granted/:rut').post(coreAuth, controller.granted);

module.exports = router;
