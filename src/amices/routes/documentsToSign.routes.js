const router = require('express-promise-router')();
const controller = require('amices/controllers/documentsToSign.controller');
const authenticate = require('middlewares/authenticate.middleware');

router.route('/:loanApplicationId').get(authenticate, controller.list);

module.exports = router;
