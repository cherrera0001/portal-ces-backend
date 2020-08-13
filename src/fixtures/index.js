require('dotenv').config();
const User = require('models/user.model');
const AmicesConfig = require('amices/models/config.model');
const EficarConfig = require('eficar/models/config.model');
const AuctionParticipant = require('amices/models/auctionParticipant.model');

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

  // AUCTIONS PARTICIPANTS
  await AuctionParticipant.findOneAndUpdate(
    { loanApplicationId: 10000042 },
    {
      loanApplicationId: 10000042,
      auctionParticipants: [
        {
          id: 30,
          status: 'WINNER',
          monthlyPayment: 379569,
          finalCapital: 10429540,
          totalLoanCost: 13664482,
          annualCAE: 29.5,
          FinancingEntity: {
            id: 13,
            identificationValue: '965096604',
            name: 'BANCO FALABELLA',
          },
          Checklists: [
            {
              id: 6,
              IdEF1: 1,
              IdEF2: 4,
              createdAt: '2020-07-10T03:34:38.583Z',
              ChecklistItems: [
                {
                  id: 16,
                  coreParamId: 646,
                  value: null,
                  status: 0,
                  folderPath: null,
                  uuid: null,
                  CoreParam: {
                    name: 'Carnet de Identidad',
                  },
                },
                {
                  id: 17,
                  coreParamId: 647,
                  status: 0,
                  value: null,
                  folderPath: null,
                  uuid: null,
                  CoreParam: {
                    name: 'Tres Ultimas Liquidaciones de Sueldo',
                  },
                },
                {
                  id: 18,
                  coreParamId: 659,
                  status: 0,
                  value: 'Certificado residencia junta vecinal',
                  folderPath: null,
                  uuid: null,
                  CoreParam: {
                    name: 'Otros',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    { upsert: true, useFindAndModify: false },
  );

  process.exit(0);
})();
