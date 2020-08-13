require('dotenv').config();
const User = require('models/user.model');
const AmicesConfig = require('amices/models/config.model');
const EficarConfig = require('eficar/models/config.model');

require('mongoAmices')();
require('mongoEficar')();

(async () => {
  await AmicesConfig.deleteMany({});
  const config = new AmicesConfig({
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

  await EficarConfig.deleteMany({});
  const eficarConfig = new EficarConfig({
    allowedMimeTypes: ['application/pdf', 'image/jpeg', 'image/png'],
    maxFileSizeInKB: 40000000,
    loanStatus: [
      { code: 'SAVED_SIMULATION', status: 'No accesada', color: 'black' },
      { code: 'SIMULATION_SENT', status: 'No accesada', color: 'black' },
      { code: 'WINNER', status: 'Otorgado', color: 'green' },
      { code: 'LOSER', status: 'Asignada a Otra EF', color: 'red' },
      { code: 'EVALUATION_IN_PROCESS', status: 'Pendiente o en Proceso', color: '#007BDC' },
    ],
  });
  await eficarConfig.save();

  await User.deleteOne({ email: 'mail1@mail.com' });
  const testUser = new User({
    name: 'Evaluador Web Amicar',
    username: 'Evaluador Web Amicar',
    rut: '966675608',
    email: 'mail1@mail.com',
    password: '$2a$10$0ZXz5YX.2sHGxLMjbT50xuYUBr3./cyUSTXgix6YQ3TkS9rhjBG4S',
    companyIdentificationValue: '966675608',
    sellerIdentificationValue: '112223339',
    amicarExecutiveIdentificationValue: '156681911',
  });
  await testUser.save();

  process.exit(0);
})();
