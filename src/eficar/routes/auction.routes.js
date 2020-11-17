const router = require('express-promise-router')();
const controller = require('eficar/controllers/auction.controller');
const validate = require('eficar/middlewares/validate.middleware');
const schema = require('eficar/validations/auction.validation');
const coreAuth = require('eficar/middlewares/coreAuth.middleware');
const authenticate = require('middlewares/authenticate.middleware');

router.route('/loan/status').get(authenticate, controller.findAllLoanStatus);
router.route('/:page').get(authenticate, controller.all);
router.route('/get/:id').get(authenticate, controller.get);
router.route('/customer-history/:rut/:page').get(authenticate, controller.getCustomerHistory);
router.route('/send-response').post(authenticate, controller.sendResponse);
router.route('').post(coreAuth, validate(schema.create), controller.create);
router.route('/:rut').post(coreAuth, validate(schema.create), controller.create);
router.route('/update/:rut').post(coreAuth, controller.update);
router.route('/granted/:rut').post(coreAuth, controller.granted);

module.exports = router;
