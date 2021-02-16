const Users = require('models/users.model');
const jwt = require('security/jwt.security');
const bcrypt = require('bcryptjs');
const errors = require('amices/errors');

const login = async (req, res) => {
  const user = await Users.findOne({
    $or: [{ email: new RegExp(`^${req.body.username}$`, 'i') }, { rut: new RegExp(`^${req.body.username}$`, 'i') }],
  });
  if (!user) return errors.badRequest(res, 'USER_NOT_FOUND');

  if (bcrypt.compareSync(req.body.password, user.password)) {
    user.logout = false;
    await user.save();

    const {
      name,
      amicarExecutiveIdentificationValue,
      sellerIdentificationValue,
      companyIdentificationValue,
      forApp,
      profile,
      saleChannelType,
      saleChannelId,
      saleChannel,
      salesRoomId,
    } = user;
    return res.json({
      user: {
        name,
        forApp,
        profile,
        amicarExecutiveIdentificationValue,
        sellerIdentificationValue,
        companyIdentificationValue,
        saleChannel,
        saleChannelId,
        saleChannelType,
        salesRoomId,
      },
      token: jwt.makeToken(user),
    });
  }
  return errors.badRequest(res, 'INVALID_PASSWORD');
};

module.exports = { login };
