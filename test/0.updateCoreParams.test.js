const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('index');

const { expect } = chai;
chai.use(chaiHttp);

const getUpdateCoreParamsQuery = () => ({
  operationName: 'updateCoreParams',
  query: `
    query updateCoreParams {
      updateCoreParams
    }
  `,
});

describe('/POST Updates Core Params before running other tests', () => {
  it('should return done', (done) => {
    chai
      .request(server)
      .post('/graphql')
      .send(getUpdateCoreParamsQuery())
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });
});
