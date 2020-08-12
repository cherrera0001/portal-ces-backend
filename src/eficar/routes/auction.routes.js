const router = require('express-promise-router')();
const controller = require('eficar/controllers/auction.controller');
const validate = require('eficar/middlewares/validate.middleware');
const schema = require('eficar/validations/auction.validation');

router.route('').get(controller.all);
router.route('/:id').get(controller.get);
router.route('/customerHistory/:rut').get(controller.getCustomerHistory);
router.route('').post(validate(schema.create), controller.create);
router.route('/:rut').post(validate(schema.create), controller.create);

module.exports = router;
