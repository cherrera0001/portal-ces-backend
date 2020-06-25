const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('index');

chai.use(chaiHttp);
chai.should();

describe('AMIDOC AUCTIONS', () => {
  describe('GET -> /amidoc/loan-application/auction', () => {
    it('Should get a list or a response object', (done) => {
      chai
        .request(server)
        .get('/amidoc/loan-application/auction')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });
  describe('POST -> /amidoc/loan-application/auction', () => {
    it('Should get a 201 Response', (done) => {
      chai
        .request(server)
        .post('/amidoc/loan-application/auction/132343234-3')
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
