const router = require('express-promise-router')();
const controller = require('amidoc/controllers/auction.controller');
const validate = require('amidoc/middlewares/validate.middleware');
const schema = require('amidoc/validations/auction.validation');

router.route('').get(controller.all);
router.route('/:rut').post(validate(schema.create), controller.create);

module.exports = router;
