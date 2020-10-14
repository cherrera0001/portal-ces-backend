const router = require('express-promise-router')();
const controller = require('amices/controllers/checklist.controller');
const pubSubAuth = require('amices/middlewares/pubSubAuth.middleware');
const checkPermissions = require('amices/middlewares/checkPermissions');
const { permissions } = require('amices/security/permissions');

router.route('/update').post(pubSubAuth, checkPermissions(permissions.VIEW_CHECKLIST), controller.update);

module.exports = router;
