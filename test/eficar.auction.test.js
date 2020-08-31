const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('index');

chai.use(chaiHttp);
chai.should();

describe('EFICAR AUCTIONS', () => {
  describe('GET -> /eficar/chl/v1/auctions', () => {
    it('Should not get a response if the user is not logged in', (done) => {
      chai
        .request(server)
        .get('/eficar/chl/v1/auctions')
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
  });
  describe('POST -> /eficar/chl/v1/auctions', () => {
    it('Should get a 201 Response', (done) => {
      chai
        .request(server)
        .post('/eficar/chl/v1/auctions/1323432343')
        .send({
          customer: {
            name: 'JhonDoe',
          },
          loanSimulationData: {
            id: '1323432343',
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
          taxReturn: [
            {
              name: 'test',
            },
          ],
          spouseData: {
            name: 'test',
          },
          buyForAnother: {
            name: 'test',
          },
          guarantor: [
            {
              name: 'test',
            },
          ],
          bankInformation: [
            {
              name: 'test',
            },
          ],
          heritage: [
            {
              name: 'test',
            },
          ],
          personalReferences: [
            {
              name: 'test',
            },
          ],
          finalLoanValues: {
            name: 'test',
          },
          equivalentAnnualCharge: {
            name: 'test',
          },
          amortizationSchedule: [
            {
              name: 'test',
            },
          ],
          surchargesAndInsurances: [
            {
              name: 'test',
            },
          ],
          loanSimulationCar: {
            name: 'test',
          },
          customerActivity: {
            name: 'test',
          },
        })
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
  });
});
