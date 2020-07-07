const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('index');

chai.use(chaiHttp);
chai.should();

describe('EFICAR AUCTIONS', () => {
  describe('GET -> /eficar/auctions', () => {
    it('Should get a list or a response object', (done) => {
      chai
        .request(server)
        .get('/eficar/auctions')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });
  describe('POST -> /eficar/auctions', () => {
    it('Should get a 201 Response', (done) => {
      chai
        .request(server)
        .post('/eficar/auctions/132343234-3')
        .send({
          customer: {
            name: 'JhonDoe',
          },
          customerRequestData: {
            name: 'test',
          },
          income: {
            name: 'test',
          },
          otherIncome: {
            name: 'test',
          },
          expenses: {
            name: 'test',
          },
          taxReturn: {
            name: 'test',
          },
          spouseData: {
            name: 'test',
          },
          buyForAnother: {
            name: 'test',
          },
          guarantor: {
            name: 'test',
          },
          bankInformation: {
            name: 'test',
          },
          heritage: {
            name: 'test',
          },
          personalReferences: {
            name: 'test',
          },
          finalLoanValues: {
            name: 'test',
          },
          equivalentAnnualCharge: {
            name: 'test',
          },
          amortizationSchedule: {
            name: 'test',
          },
          surchargesAndInsurances: {
            name: 'test',
          },
          loanSimulationCar: {
            name: 'test',
          },
          customerActivity: {
            name: 'test',
          },
        })
        .end((err, res) => {
          res.should.have.status(201);
          done();
        });
    });
  });
});
