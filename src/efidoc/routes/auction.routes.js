const router = require('express-promise-router')();
const controller = require('../controllers/auction.controller');
const validate = require('../middlewares/validate.middleware');
const schema = require('../validations/auction.validation');

router.route('').get(controller.all);
router.route('').post(validate(schema.create), controller.create);

module.exports = router;
