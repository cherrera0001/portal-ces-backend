const seedLoans = {
  loanId: '0065500000FcXi2AAF',
  financingEntityId: '6,762249812',
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

db = db.getSiblingDB('amicar_development');

db.createUser({
  user: 'amicar',
  pwd: 'amicar',
  roles: [{ role: 'readWrite', db: 'amicar_development' }],
});

db.loans.insertMany([seedLoans]);
db.config.insertOne(seedConfig);

db = db.getSiblingDB('amicar_test');

db.createUser({
  user: 'amicar',
  pwd: 'amicar',
  roles: [{ role: 'readWrite', db: 'amicar_test' }],
});

db.loans.insertMany([seedLoans]);
db.config.insertOne(seedConfig);
