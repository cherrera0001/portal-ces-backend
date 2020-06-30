const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('index');

chai.use(chaiHttp);
chai.should();

describe('Eficar API REST', () => {
  describe('GET -> /', () => {
    it('Should get a welcome message', (done) => {
      chai
        .request(server)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });
  describe('GET -> /404', () => {
    it('Should get a 404 NotFound error', (done) => {
      chai
        .request(server)
        .get('/404')
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
});
