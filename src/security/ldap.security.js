const Users = require('models/users.model');
const jwt = require('security/jwt.security');
const sendSlackNotification = require('helpers/slackSendNotification');

const { NODE_ENV, BACKOFFICE_URL } = process.env;

const login = async (req, res) => {
  const localUser = await Users.findOne({
    $or: [
      { email: new RegExp(`^${req.user.mail}$`, 'i') },
      { rut: new RegExp(`^${req.user.description}$`, 'i') },
      { username: new RegExp(`^${req.user.sAMAccountName}$`, 'i') },
    ],
  });

  if (!localUser) {
    const appName = req.user.distinguishedName.includes('OU=EF') ? 'eficar' : 'amices';
    const isAmicarExecutive = req.user.distinguishedName.includes('OU=EENN');

    const user = new Users({
      name: req.user.displayName,
      username: req.user.sAMAccountName,
      companyIdentificationValue: req.user.company,
      rut: req.user.description,
      email: req.user.mail ? req.user.mail : null,
      memberOf: req.user.distinguishedName,
      profile: isAmicarExecutive ? 'AMICAR_EXECUTIVE' : null,
      forApp: appName,
    });
    await user.save();

    sendSlackNotification({
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `[*${NODE_ENV}*] El siguiente usuario está tratando de iniciar sesión en *${appName}*: \nNombre: ${
              req.user.displayName
            }\nRut: ${req.user.description}\nEmail: ${req.user.mail}\n${
              isAmicarExecutive ? 'Este usuario es un *Ejecutivo Amicar*.' : ''
            }`,
          },
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: 'Este usuario está esperando a ser perfilado...⏳',
          },
          accessory: {
            type: 'button',
            text: {
              type: 'plain_text',
              text: 'Ver en Backoffice',
              emoji: true,
            },
            value: 'backoffice_url',
            url: BACKOFFICE_URL,
            action_id: 'button-action',
          },
        },
        {
          type: 'divider',
        },
      ],
    });

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
