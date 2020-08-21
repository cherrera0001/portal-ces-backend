const router = require('express-promise-router')();
const controller = require('eficar/controllers/auction.controller');
const validate = require('eficar/middlewares/validate.middleware');
const schema = require('eficar/validations/auction.validation');
const authenticate = require('middlewares/authenticate.middleware');

router.route('').get(authenticate, controller.all);
router.route('/:id').get(authenticate, controller.get);
router.route('/checklist/:stage/:loanSimulationDataId').get(authenticate, controller.checklist);
router.route('/send-response').post(authenticate, controller.sendResponse);
router.route('/update/:rut').post(controller.auctionUpdate);
router.route('/granted/:rut').post(controller.auctionGranted);
router.route('/checklist-reception/:rut').post(controller.checklistReception);
router.route('/checklist-confirmation/:rut').post(controller.checklistConfirmation);
router.route('/checklist/download-document').post(authenticate, controller.downloadDocument);
router.route('').post(validate(schema.create), controller.create);
router.route('/:rut').post(validate(schema.create), controller.create);

module.exports = router;
