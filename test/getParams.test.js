const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('index');

chai.use(chaiHttp);
chai.should();

describe('CORE PARAMS', () => {
  describe('GET -> /params', () => {
    it('Should get a list or a response object', (done) => {
      chai
        .request(server)
        .get('/params')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });
});
