const seedLoan = {
  loanId: '0065500000FcXi2AAF',
  financingEntityId: '4,760022934',
  checkList: [
    {
      id: '731b4',
      name: 'Liquidaciones',
      step: 0,
      wasSent: false,
      documentType: '74',
      feError: null,
      documents: [
        {
          id: '8747d',
          uuid: 'DOCUMENT_UUID',
        },
        {
          id: '87ddd',
          uuid: 'DOCUMENT_UUID',
        },
      ],
    },
    {
      id: '9da13',
      name: 'Contrato',
      step: 3,
      wasSent: true,
      documentType: '58',
      feError: 'Documento ilegible',
      documents: [
        {
          id: '8345f',
          uuid: 'DOCUMENT_UUID',
        },
      ],
    },
  ],
};

const seedConfig = {
  allowedMimeTypes: ['application/pdf', 'image/jpeg', 'image/png'],
  maxFileSizeInKB: 40000000,
  terms: [
    { description: '12', key: '12', configType: 'term' },
    { description: '24', key: '24', configType: 'term' },
    { description: '36', key: '36', configType: 'term' },
    { description: '48', key: '48', configType: 'term' },
    { description: '60', key: '60', configType: 'term' },
  ],
};

const seedUser = {
  name: 'name1',
  email: 'mail1@mail.com',
  password: '$2a$10$0ZXz5YX.2sHGxLMjbT50xuYUBr3./cyUSTXgix6YQ3TkS9rhjBG4S',
  type: 'user',
  claims: ['read-metrics'],
  sellerIdentificationValue: '112223339',
  amicarExecutiveIdentificationValue: '156681911',
};

// Seeds amicar_development DB
db = db.getSiblingDB('amicar_development');
db.createUser({
  user: 'amicar',
  pwd: 'amicar',
  roles: [{ role: 'readWrite', db: 'amicar_development' }],
});
db.config.drop();
db.config.insert(seedConfig);
db.loans.update({ loanId: '0065500000FcXi2AAF' }, seedLoan, { upsert: true });
db.users.update({ email: 'mail1@mail.com' }, seedUser, { upsert: true });

db.loans.find().pretty();
db.config.find().pretty();
db.users.find().pretty();

// Seeds amicar_test DB
db = db.getSiblingDB('amicar_test');
db.createUser({
  user: 'amicar',
  pwd: 'amicar',
  roles: [{ role: 'readWrite', db: 'amicar_test' }],
});

db.config.drop();
db.config.insert(seedConfig);
db.loans.update({ loanId: '0065500000FcXi2AAF' }, seedLoan, { upsert: true });
db.users.update({ email: 'mail1@mail.com' }, seedUser, { upsert: true });

db.loans.find().pretty();
db.config.find().pretty();
db.users.find().pretty();
