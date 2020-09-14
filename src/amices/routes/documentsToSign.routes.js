const router = require('express-promise-router')();
const controller = require('amices/controllers/documentsToSign.controller');
const authenticate = require('middlewares/authenticate.middleware');
const pubSubAuth = require('amices/middlewares/pubSubAuth.middleware');

router.route('/:loanApplicationId').get(authenticate, controller.list);
router.route('/download').post(authenticate, controller.download);
router.route('/update').post(pubSubAuth, controller.update);
router.route('/delete').post(pubSubAuth, controller.deleteDocuments);

module.exports = router;
