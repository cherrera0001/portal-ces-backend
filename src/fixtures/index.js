require('dotenv').config();
const User = require('portal/models/user.model');
const Config = require('portal/models/config.model');
const AuctionParticipant = require('portal/models/auctionParticipant.model');
require('mongoPortal')();
require('mongoEficar')();

(async () => {
  // CONFIG
  await Config.deleteOne();
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
      email: 'mail1@mail.com',
      password: '$2a$10$0ZXz5YX.2sHGxLMjbT50xuYUBr3./cyUSTXgix6YQ3TkS9rhjBG4S',
      type: 'user',
      claims: ['read-metrics'],
      sellerIdentificationValue: '112223339',
      amicarExecutiveIdentificationValue: '156681911',
    },
    { upsert: true, useFindAndModify: false },
  );
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
