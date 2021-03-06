const Users = require('models/users.model');
const jwt = require('security/jwt.security');

const login = async (req, res) => {
  const localUser = await Users.findOne({ username: req.user.sAMAccountName });
  if (!localUser) {
    const user = new Users({
      name: req.user.displayName,
      username: req.user.sAMAccountName,
      companyIdentificationValue: req.user.companyIdentificationValue,
      rut: req.user.description,
      email: req.user.mail ? req.user.mail : null,
      memberOf: req.user.memberOf,
    });
    await user.save();
    res.json({ token: jwt.makeToken(user) });
    return;
  }
  res.json({ token: jwt.makeToken(localUser) });
};

module.exports = { login };
