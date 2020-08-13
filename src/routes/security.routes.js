const router = require('express-promise-router')();
const security = require('security/default.security');
const validate = require('middlewares/validate.middleware');
const schema = require('validations/login.validation');

router.route('/login').post(validate(schema.login), security.login);

module.exports = router;
