const LDAP = require('ldapauth-fork');
const config = require('security/config.security');

const { USE_MOCK_DATA } = process.env;

const mockLDAP = {
  authenticate: (username, password, callback) => {
    callback(null, require('fixtures/user'));
  },
  on: () => {},
};

const ldap = USE_MOCK_DATA ? mockLDAP : new LDAP(config);
ldap.on('error', (err) => console.log(err));

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
