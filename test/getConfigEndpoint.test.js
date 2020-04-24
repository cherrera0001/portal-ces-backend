import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../src';

const { expect } = chai;
chai.use(chaiHttp);

const getFileUploadingConfigQuery = () => ({
  operationName: 'getFileUploadingConfig',
  variables: {},
  query: `
  query getFileUploadingConfig {
    getFileUploadingConfig {
      allowedMimeTypes
      maxFileSizeInKB
    }
  }
  `,
});

describe('Config', () => {
  describe('/POST gets a Config object with parametrized data', () => {
    it('should fail if file upload config data is not returned', () => {
      return chai
        .request(server)
        .post('/gql')
        .send(getFileUploadingConfigQuery())
        .then((res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.a('object');
          expect(res.body.data.getFileUploadingConfig).to.have.property('allowedMimeTypes');
          expect(res.body.data.getFileUploadingConfig).to.have.property('maxFileSizeInKB');
        });
    });
  });
});
