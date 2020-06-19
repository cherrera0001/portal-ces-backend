import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../src';
import { getCheckListQuery } from '../src/portal/graphQL/queries/getCheckList';

const { expect } = chai;
chai.use(chaiHttp);

describe('CheckList', () => {
  describe('/POST gets a FE checklist for a given loanId', () => {
    it('should fail when no loanId is provided', () => {
      return chai
        .request(server)
        .post('/graphql')
        .send(getCheckListQuery(''))
        .then((res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('errors');
          expect(res.body.errors[0].message).to.equal('Missing loanId field.');
        });
    });

    it('should return a valid checkList when a valid loanId is provided', () => {
      return chai
        .request(server)
        .post('/graphql')
        .send(getCheckListQuery('0065500000FcXi2AAF'))
        .then((res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('data');
          expect(res.body.data.getCheckList).to.have.property('financingEntityId');
          expect(res.body.data.getCheckList).to.have.property('checkList');
          expect(res.body.data.getCheckList.checkList).to.be.an('array');
        });
    });
  });
});
