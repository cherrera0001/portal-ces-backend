const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('index');
<<<<<<< HEAD
const request = require('../test/requests/loansApplicationFE.post.json');
=======
const request = require('./requests/loansApplicationFE.post.json');
>>>>>>> 0a01489fda6a4650ca5e8eeec0ad3d45c9e4306b

chai.use(chaiHttp);
chai.should();

describe('PORTAL LOANS APPLICATIONS FE', () => {
  describe('GET -> /portal/loans-applications-fe', () => {
    it('Should get a list or a response object', (done) => {
      chai
        .request(server)
<<<<<<< HEAD
        .get('/portal/loans-applications-fe')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
=======
        .get('/portal/chl/v1/loans-applications-fe')
        .end((err, res) => {
>>>>>>> 0a01489fda6a4650ca5e8eeec0ad3d45c9e4306b
          done();
        });
    });
  });
  describe('POST -> /portal/loans-applications-fe', () => {
    it('Should get a 201 Response', (done) => {
      chai
        .request(server)
<<<<<<< HEAD
        .post('/portal/loans-applications')
        .send(request)
        .end((err, res) => {
          res.should.have.status(201);
=======
        .post('/portal/chl/v1/loans-applications')
        .send(request)
        .end((err, res) => {
>>>>>>> 0a01489fda6a4650ca5e8eeec0ad3d45c9e4306b
          done();
        });
    });
  });
});
