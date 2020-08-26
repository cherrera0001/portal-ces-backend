const router = require('express-promise-router')();
const controller = require('amices/controllers/checklist.controller');

router.route('/update').post(controller.update);

module.exports = router;
