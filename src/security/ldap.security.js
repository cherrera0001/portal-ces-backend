const Users = require('models/users.model');
const jwt = require('security/jwt.security');
const sendSlackNotification = require('helpers/slackSendNotification');

const login = async (req, res) => {
  const localUser = await Users.findOne({
    $or: [
      { email: new RegExp(`^${req.user.mail}$`, 'i') },
      { rut: new RegExp(`^${req.user.description}$`, 'i') },
      { username: new RegExp(`^${req.user.sAMAccountName}$`, 'i') },
    ],
  });

  if (!localUser) {
    const user = new Users({
      name: req.user.displayName,
      username: req.user.sAMAccountName,
      companyIdentificationValue: req.user.company,
      rut: req.user.description,
      email: req.user.mail ? req.user.mail : null,
      memberOf: req.user.distinguishedName,
      profile: req.user.distinguishedName.includes('OU=EENN') ? 'AMICAR_EXECUTIVE' : null,
      forApp: req.user.distinguishedName.includes('OU=EF') ? 'eficar' : 'amices',
    });
    await user.save();

    sendSlackNotification();

    res.status(401).json({ msg: 'Su cuenta no se encuentra habilitada, contacte al administrador' });
    return;
  }

  if (!localUser.enabled) {
    res.status(401).json({ msg: 'Su cuenta no se encuentra habilitada, contacte al administrador' });
    return;
  }

  res.json({
    user: localUser,
    token: jwt.makeToken(localUser),
  });
};

module.exports = { login };
