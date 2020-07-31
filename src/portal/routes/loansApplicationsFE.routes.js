const router = require('express-promise-router')();
const controller = require('portal/controllers/loansApplicationsFE.controller');
const validate = require('portal/middlewares/validate.middleware');
const schema = require('portal/validations/loansApplicationsFE.validation');

router.route('').get(controller.all);
router.route('').post(validate(schema.create), controller.create);

module.exports = router;
