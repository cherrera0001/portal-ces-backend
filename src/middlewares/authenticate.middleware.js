const jwt = require('security/jwt.security');
const User = require('models/users.model');

module.exports = async (req, res, next) => {
  try {
    const user = jwt.verifyToken(req.headers.token);
    const localUser = await User.findOne({ username: user.username });
    if (localUser.logout) {
      return res.status(401).end();
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(401).end();
  }
};
