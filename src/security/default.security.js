const Users = require('models/users.model');
const jwt = require('security/jwt.security');
const bcrypt = require('bcryptjs');
const errors = require('amices/errors');

const login = async (req, res) => {
  const user = await Users.findOne({ email: req.body.username });
  if (!user) return errors.badRequest(res, 'USER_NOT_FOUND');

  if (bcrypt.compareSync(req.body.password, user.password)) {
    delete user.password;
    return res.json({
      user,
      token: jwt.makeToken(user),
    });
  }
  return errors.badRequest(res, 'INVALID_PASSWORD');
};

module.exports = { login };
