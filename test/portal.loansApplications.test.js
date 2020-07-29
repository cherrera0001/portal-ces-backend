const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('index');

chai.use(chaiHttp);
chai.should();

describe('PORTAL LOANS APPLICATIONS', () => {
  describe('GET -> /portal/loans-applications', () => {
    it('Should get a list or a response object', (done) => {
      chai
        .request(server)
        .get('/portal/loans-applications')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });
});
