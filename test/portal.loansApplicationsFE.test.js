const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('index');
const request = require('./requests/loansApplicationFE.post.json');

chai.use(chaiHttp);
chai.should();

describe('PORTAL LOANS APPLICATIONS FE', () => {
  describe('GET -> /portal/loans-applications-fe', () => {
    it('Should get a list or a response object', (done) => {
      chai
        .request(server)
        .get('/portal/chl/v1/loans-applications-fe')
        .end((err, res) => {
          done();
        });
    });
  });
  describe('POST -> /portal/loans-applications-fe', () => {
    it('Should get a 201 Response', (done) => {
      chai
        .request(server)
        .post('/portal/chl/v1/loans-applications')
        .send(request)
        .end((err, res) => {
          done();
        });
    });
  });
});
