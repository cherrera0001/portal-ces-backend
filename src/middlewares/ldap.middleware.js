const LDAP = require('ldapauth-fork');
const config = require('security/config.security');

const ldap = new LDAP({ config });

module.exports = (req, res, next) => {
  ldap.authenticate(req.body.username, req.body.password, function(err, user) {
    if (err) {
      res.status(401).end();
      return;
    }
    req.user = user;
    next();
  });
};
