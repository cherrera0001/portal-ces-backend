const router = require('express-promise-router')();
const controller = require('eficar/controllers/documentsToSign.controller');
const authenticate = require('middlewares/authenticate.middleware');
const coreAuth = require('eficar/middlewares/coreAuth.middleware');

router.route('/upload').post(authenticate, controller.upload);
router.route('/download').post(authenticate, controller.download);
router.route('/delete').post(authenticate, controller.deleteDocuments);

// CORE URLS
router.route('/update').post(coreAuth, controller.update);

module.exports = router;
