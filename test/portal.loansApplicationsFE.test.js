const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('index');
const request = require('./requests/loansApplicationFE.post.json');

chai.use(chaiHttp);
chai.should();

describe('AMICES LOANS APPLICATIONS FE', () => {
  describe('GET -> /amices/loans-applications-fe', () => {
    it('Should get a list or a response object', (done) => {
      chai
        .request(server)
        .get('/amices/chl/v1/loans-applications-fe')
        .end((err, res) => {
          done();
        });
    });
  });
  describe('POST -> /amices/loans-applications-fe', () => {
    it('Should get a 201 Response', (done) => {
      chai
        .request(server)
        .post('/amices/chl/v1/loans-applications')
        .send(request)
        .end((err, res) => {
          done();
        });
    });
  });
});
