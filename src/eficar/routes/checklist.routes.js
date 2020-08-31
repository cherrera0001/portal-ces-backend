const router = require('express-promise-router')();
const controller = require('eficar/controllers/checklist.controller');
const authenticate = require('middlewares/authenticate.middleware');

router.route('/:stage/:loanSimulationDataId').get(authenticate, controller.checklist);
router.route('/reception/:rut').post(authenticate, controller.reception);
router.route('/confirmation/:rut').post(authenticate, controller.confirmation);
router.route('/download-document').post(authenticate, controller.downloadDocument);
router.route('/document-status').post(authenticate, controller.documentStatus);

module.exports = router;
