const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('index');

chai.use(chaiHttp);
chai.should();

describe('AMICES LOANS APPLICATIONS', () => {
  describe('GET -> /amices/loans-applications', () => {
    it('Should get a list or a response object', (done) => {
      chai
        .request(server)
        .get('/amices/chl/v1/loans-applications')
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          done();
        });
    });
  });
});
