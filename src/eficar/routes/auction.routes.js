const router = require('express-promise-router')();
const controller = require('eficar/controllers/auction.controller');
const validate = require('eficar/middlewares/validate.middleware');
const schema = require('eficar/validations/auction.validation');
const authenticate = require('middlewares/authenticate.middleware');

router.route('').get(authenticate, controller.all);
router.route('/:id').get(authenticate, controller.get);
router.route('/checklist/:stage/:loanSimulationDataId').get(authenticate, controller.checklist);
router.route('/customerHistory/:rut').get(authenticate, controller.getCustomerHistory);
router.route('/sendResponse').post(authenticate, controller.sendResponse);
router.route('/update/:rut').post(controller.auctionUpdate);
router.route('/granted/:rut').post(controller.auctionGranted);
router.route('').post(validate(schema.create), controller.create);
router.route('/:rut').post(validate(schema.create), controller.create);

module.exports = router;
