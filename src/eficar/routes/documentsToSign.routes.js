const router = require('express-promise-router')();
const controller = require('eficar/controllers/documentsToSign.controller');
const authenticate = require('middlewares/authenticate.middleware');

router.route('/update').post(authenticate, controller.update);
router.route('/upload').post(authenticate, controller.upload);
router.route('/download').post(authenticate, controller.download);
router.route('/delete').post(authenticate, controller.download);

module.exports = router;
