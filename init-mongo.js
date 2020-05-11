const seedLoans = {
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
};

const seedUsers = [
  {
    name: 'name1',
    email: 'mail1@mail.com',
    password: '$2a$10$0ZXz5YX.2sHGxLMjbT50xuYUBr3./cyUSTXgix6YQ3TkS9rhjBG4S',
    type: 'user',
    claims: ['read-metrics'],
  },
  {
    name: 'name2',
    email: 'mail2@mail.com',
    password: '$2a$10$0ZXz5YX.2sHGxLMjbT50xuYUBr3./cyUSTXgix6YQ3TkS9rhjBG4S',
    type: 'user',
    claims: [],
  },
];

db = db.getSiblingDB('amicar_development');
db.createUser({
  user: 'amicar',
  pwd: 'amicar',
  roles: [{ role: 'readWrite', db: 'amicar_development' }],
});
print("---> Development created and seeded");
db.loans.insertMany([seedLoans]);
db.config.insertOne(seedConfig);
db.users.insertMany(seedUsers);

db = db.getSiblingDB('amicar_test');
db.createUser({
  user: 'amicar',
  pwd: 'amicar',
  roles: [{ role: 'readWrite', db: 'amicar_test' }],
});
db.loans.insertMany([seedLoans]);
db.config.insertOne(seedConfig);
print("---> Test created and seeded");
