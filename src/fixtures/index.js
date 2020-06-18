require('../config/mgConnect');

const User = require('../models/mg/Users');
const users = require('./users.fixtures');

(async () => {
  await User.create(users);
});
