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

module.exports = { makeToken };
