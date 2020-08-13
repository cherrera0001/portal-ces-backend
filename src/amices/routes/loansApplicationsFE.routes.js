const router = require('express-promise-router')();
const controller = require('amices/controllers/loansApplicationsFE.controller');
const validate = require('amices/middlewares/validate.middleware');
const schema = require('amices/validations/loansApplicationsFE.validation');

router.route('').get(controller.all);
router.route('').post(validate(schema.create), controller.create);

module.exports = router;
