const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('index');

const { expect } = chai;
chai.use(chaiHttp);

const getCheckListQuery = (loanApplicationId) => ({
  operationName: 'getCheckList',
  variables: { loanApplicationId },
  query: `
    mutation getCheckList($loanApplicationId: Int!) {
      getCheckList(loanApplicationId: $loanApplicationId) {
        checklistId
        financingEntityId
        checklistError
        checklist {
          id
          name
          value
          step
        }
      }
    }
  `,
});

describe('CheckList', () => {
  describe('/POST gets a FE checklist for a given loanId', () => {
    it('should fail when no loanId is provided', (done) => {
      chai
        .request(server)
        .post('/graphql')
        .send(getCheckListQuery(0))
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('errors');
          expect(res.body.errors[0].message).to.equal('Missing loanId field.');
          done();
        });
    });
    // it('should return a valid checkList when a valid loanId is provided', (done) => {
    //   chai
    //     .request(server)
    //     .post('/graphql')
    //     .send(getCheckListQuery(10000042))
    //     .end((err, res) => {
    //       expect(res.status).to.equal(200);
    //       expect(res.body).to.be.a('object');
    //       expect(res.body).to.have.property('data');
    //       expect(res.body.data.getCheckList).to.have.property('financingEntityId');
    //       expect(res.body.data.getCheckList).to.have.property('checklist');
    //       expect(res.body.data.getCheckList.checklist).to.be.an('array');
    //       done();
    //     });
    // });
  });
});
