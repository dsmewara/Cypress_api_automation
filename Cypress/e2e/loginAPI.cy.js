import { createLoginSession, updateSession, getMetadata } from '../support/apiRequests';

describe('GraphQL API Automation', () => {

  it('🔹 Create Login Session', () => {
    createLoginSession().then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data.createLoginSession).to.have.property('email');
      cy.log('✅ Login Session Created:', response.body.data.createLoginSession);
    });
  });

  it('🔹 Update Session', () => {
    const sessionId = 'test-session-id';
    const status = 'ACTIVE';

    updateSession(sessionId, status).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data.updateSession).to.have.property('success', true);
      cy.log('✅ Session Updated:', response.body.data.updateSession);
    });
  });

  it('🔹 Fetch Metadata', () => {
    getMetadata().then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data.getMetadata).to.have.property('id');
      cy.log('✅ Metadata Fetched:', response.body.data.getMetadata);
    });
  });

});
