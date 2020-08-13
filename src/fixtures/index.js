require('dotenv').config();
const User = require('models/user.model');
const Config = require('amices/models/config.model');

require('mongoAmices')();
require('mongoEficar')();

(async () => {
  // CONFIG
  await Config.deleteMany({});
  const config = new Config({
    allowedMimeTypes: ['application/pdf', 'image/jpeg', 'image/png'],
    maxFileSizeInKB: 40000000,
    terms: [
      { description: '12', key: '12', configType: 'term' },
      { description: '24', key: '24', configType: 'term' },
      { description: '36', key: '36', configType: 'term' },
      { description: '48', key: '48', configType: 'term' },
      { description: '60', key: '60', configType: 'term' },
    ],
  });
  await config.save();
  // USERS
  await User.findOneAndUpdate(
    { email: 'mail1@mail.com' },
    {
      name: 'name1',
      username: 'name1',
      rut: '966675608',
      email: 'mail1@mail.com',
      password: '$2a$10$0ZXz5YX.2sHGxLMjbT50xuYUBr3./cyUSTXgix6YQ3TkS9rhjBG4S',
      companyIdentificationValue: '966675608',
      sellerIdentificationValue: '112223339',
      amicarExecutiveIdentificationValue: '156681911',
    },
    { upsert: true, useFindAndModify: false },
  );

  process.exit(0);
})();
