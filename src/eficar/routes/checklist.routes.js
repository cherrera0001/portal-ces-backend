const router = require('express-promise-router')();
const controller = require('eficar/controllers/checklist.controller');
const authenticate = require('middlewares/authenticate.middleware');
const coreAuth = require('eficar/middlewares/coreAuth.middleware');

router.route('/:stage/:loanSimulationDataId').get(authenticate, controller.checklist);
router.route('/download-document').post(authenticate, controller.downloadDocument);
router.route('/document-status-change').post(authenticate, controller.documentStatusChange);
router.route('/document-status-update/:rut').post(coreAuth, controller.documentStatusUpdate);
router.route('/confirmation/:rut').post(coreAuth, controller.confirmation);
router.route('/reception/:rut').post(coreAuth, controller.reception);
router.route('/approvement-letter').post(coreAuth, controller.approvementLetter);

module.exports = router;
