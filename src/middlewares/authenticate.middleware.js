const jwt = require('security/jwt.security');

module.exports = async (req, res, next) => {
  try {
    const user = jwt.verifyToken(req.headers.token);
    req.user = user;
    next();
  } catch (err) {
    res.status(401).end();
  }
};
