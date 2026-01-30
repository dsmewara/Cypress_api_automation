import '@4tw/cypress-drag-drop';

Cypress.Commands.add('loginToAAD', () => {
  const username = Cypress.env('AAD_USERNAME');
  const password = Cypress.env('AAD_PASSWORD');

  if (!username || !password) {
    throw new Error(
      'AAD credentials missing. Please set AAD_USERNAME and AAD_PASSWORD in env.'
    );
  }

  cy.session(`aad-${username}`, () => {
    const log = Cypress.log({
      displayName: 'Azure AD Login',
      message: [`Authenticating ${username}`],
      autoEnd: false,
    });

    log.snapshot('before');

    cy.visit('/');

    // Microsoft login page
    cy.origin(
      'https://login.microsoftonline.com',
      { args: { username, password } },
      ({ username, password }) => {
        cy.get('input[type="email"]', { timeout: 20000 })
          .type(username, { log: false });

        cy.get('input[type="submit"]').click();

        cy.get('input[type="password"]', { timeout: 20000 })
          .type(password, { log: false });

        cy.get('input[type="submit"]').click();
      }
    );

    // Optional: handle ADFS / live.com redirect if your org uses it
    cy.origin(
      'https://adfs.abcn.com',
      { args: { password } },
      ({ password }) => {
        cy.get('input[type="password"]', { timeout: 20000 })
          .type(password, { log: false });

        cy.get('input[type="submit"]').click();
      }
    );

    log.snapshot('after');
    log.end();
  }, {
    validate() {
      cy.visit('/');
      cy.url().should('not.include', 'login');
    },
  });
});
