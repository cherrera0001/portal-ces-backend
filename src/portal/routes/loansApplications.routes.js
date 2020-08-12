const router = require('express-promise-router')();
const controller = require('portal/controllers/loansApplication.controller');
const validate = require('portal/middlewares/validate.middleware');
const schema = require('portal/validations/loans-application.validation');

router.route('').get(controller.all);
router.route('/:id/status').get(controller.status);
router.route('/save').post(controller.save);
router.route('/save-external').post(controller.saveExternal);
router.route('').post(validate(schema.create), controller.create);

module.exports = router;
