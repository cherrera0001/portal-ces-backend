const jwt = require('jsonwebtoken');
const moment = require('moment');

const getTokenExpirationTime = () => {
  // tokens should expire at 1am of the day following their creation
  const expirationTime = moment()
    .add(1, 'days')
    .hours(1)
    .startOf('hour');

  return expirationTime.diff(moment(), 'seconds');
};

const makeToken = (user) => {
  return jwt.sign(
    {
      name: user.name,
      rut: user.rut,
      username: user.username,
      companyIdentificationValue: user.companyIdentificationValue,
    },
    process.env.SECRET,
    {
      expiresIn: getTokenExpirationTime(),
    },
  );
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.SECRET);
};

module.exports = { makeToken, verifyToken };
