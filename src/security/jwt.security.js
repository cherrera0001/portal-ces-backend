const jwt = require('jsonwebtoken');

const makeToken = (user) => {
  return jwt.sign(
    {
      name: user.name,
      rut: user.rut,
      username: user.username,
    },
    process.env.SECRET,
  );
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.SECRET);
};

module.exports = { makeToken, verifyToken };
