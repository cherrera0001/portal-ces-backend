const seedLoans = {
  loanId: '0065500000FcXi2AAF',
  financingEntityId: 1,
  checkList: [
    {
      id: '731b4',
      name: 'Liquidaciones',
      step: 0,
      wasSent: false,
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

db = db.getSiblingDB('amicar_development');

db.createUser({
  user: 'amicar',
  pwd: 'amicar',
  roles: [{ role: 'readWrite', db: 'amicar_development' }],
});

db.loans.insertMany([seedLoans]);

db = db.getSiblingDB('amicar_test');

db.createUser({
  user: 'amicar',
  pwd: 'amicar',
  roles: [{ role: 'readWrite', db: 'amicar_test' }],
});

db.loans.insertMany([seedLoans]);
