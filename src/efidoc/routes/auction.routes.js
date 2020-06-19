const router = require('express-promise-router')();
const controller = require('efidoc/controllers/auction.controller');
const validate = require('efidoc/middlewares/validate.middleware');
const schema = require('efidoc/validations/auction.validation');

router.route('').get(controller.all);
router.route('/:fe-rut').post(validate(schema.create), controller.create);

module.exports = router;
