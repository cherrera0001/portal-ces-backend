const router = require('express-promise-router')();
const security = require('security/ldap.security');
const ldap = require('middlewares/ldap.middleware');
const validate = require('middlewares/validate.middleware');
const schema = require('validations/login.validation');

router.route('/login').get(validate(schema.login), ldap, security.login);

module.exports = router;
