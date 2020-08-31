const router = require('express-promise-router')();
const controller = require('eficar/controllers/auction.controller');
const validate = require('eficar/middlewares/validate.middleware');
const schema = require('eficar/validations/auction.validation');
const authenticate = require('middlewares/authenticate.middleware');

router.route('').get(authenticate, controller.all);
router.route('/:id').get(authenticate, controller.get);
router.route('/send-response').post(authenticate, controller.sendResponse);
router.route('/update/:rut').post(authenticate, controller.update);
router.route('/granted/:rut').post(authenticate, controller.granted);
router.route('').post(authenticate, validate(schema.create), controller.create);
router.route('/:rut').post(authenticate, validate(schema.create), controller.create);

module.exports = router;
