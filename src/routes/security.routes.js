const router = require('express-promise-router')();
const security = require('security/ldap.security');
const schema = require('validations/login.validation');
const validate = require('middlewares/validate.middleware');
const ldap = require('middlewares/ldap.middleware');

router.route('/login').post(validate(schema.login), ldap, security.login);

module.exports = router;
