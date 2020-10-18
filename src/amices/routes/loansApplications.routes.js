const router = require('express-promise-router')();
const controller = require('amices/controllers/loanApplications.controller');
const validate = require('amices/middlewares/validate.middleware');
const schema = require('amices/validations/loans-application.validation');
const authenticate = require('middlewares/authenticate.middleware');
const pubSubAuth = require('amices/middlewares/pubSubAuth.middleware');

router.route('/:page?').get(authenticate, controller.all);
router.route('/:id/status').get(authenticate, controller.status);
router.route('/save').post(authenticate, controller.save);
router.route('').post(authenticate, validate(schema.create), controller.create);
router.route('/save-external').post(pubSubAuth, controller.saveExternal);
router.route('/finish').post(pubSubAuth, controller.finish);
router.route('/submissions/:loanId').post(authenticate, controller.submissions);

module.exports = router;
