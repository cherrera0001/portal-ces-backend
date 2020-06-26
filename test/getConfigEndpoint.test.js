const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('index');

const { expect } = chai;
chai.use(chaiHttp);

const getConfigQuery = () => ({
  operationName: 'getConfig',
  variables: {},
  query: `
  query getConfig {
    getConfig {
      allowedMimeTypes
      maxFileSizeInKB
      terms {
        key
        description
      }
    }
  }
  `,
});

describe('Config', () => {
  describe('/POST gets a Config object with parametrized data', () => {
    it('should fail if config data is not returned', (done) => {
      chai
        .request(server)
        .post('/graphql')
        .send(getConfigQuery())
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.a('object');
          expect(res.body.data.getConfig).to.have.property('allowedMimeTypes');
          expect(res.body.data.getConfig).to.have.property('maxFileSizeInKB');
          expect(res.body.data.getConfig).to.have.property('terms');
          done();
        });
    });
  });
});
