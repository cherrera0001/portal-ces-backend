const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('index');
const request = require('../test/requests/loansApplicationFE.post.json');

chai.use(chaiHttp);
chai.should();

describe('PORTAL LOANS APPLICATIONS FE', () => {
  describe('GET -> /portal/loans-applications-fe', () => {
    it('Should get a list or a response object', (done) => {
      chai
        .request(server)
        .get('/portal/loans-applications-fe')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });
  describe('POST -> /portal/loans-applications-fe', () => {
    it('Should get a 201 Response', (done) => {
      chai
        .request(server)
        .post('/portal/loans-applications')
        .send(request)
        .end((err, res) => {
          res.should.have.status(201);
          done();
        });
    });
  });
});
