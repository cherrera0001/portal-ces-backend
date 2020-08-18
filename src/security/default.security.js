const User = require('models/user.model');
const jwt = require('security/jwt.security');
const bcrypt = require('bcryptjs');
const errors = require('amices/errors');

const login = async (req, res) => {
  const localUser = await User.findOne({ email: req.body.username });
  if (!localUser) return errors.badRequest(res, 'USER_NOT_FOUND');

  if (bcrypt.compareSync(req.body.password, localUser.password)) {
    const { name, amicarExecutiveIdentificationValue, sellerIdentificationValue } = localUser;
    return res.json({
      user: {
        name,
        amicarExecutiveIdentificationValue,
        sellerIdentificationValue,
      },
      token: jwt.makeToken(localUser),
    });
  }
  return errors.badRequest(res, 'INVALID_PASSWORD');
};

module.exports = { login };
