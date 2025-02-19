function loginViaAAD(username: string, password: string) {
  cy.visit('http://localhost:3000/')
  cy.get('button#signIn').click()

  // Login to your AAD tenant
  cy.origin(
    'login.microsoftonline.com',
    { args: { username } },
    ({ username }) => {
      cy.get('input[type="email"]').type(username, { log: false })
      cy.get('input[type="submit"]').click()
    }
  )

  // Handle login.live.com authentication
  cy.origin(
    'login.live.com',
    { args: { password } },
    ({ password }) => {
      cy.get('input[type="password"]').type(password, { log: false })
      cy.get('input[type="submit"]').click()
      cy.get('#idBtn_Back').click()
    }
  )

  // Ensure redirection back to the app
  cy.url().should('equal', 'http://localhost:3000/')
  cy.get('#welcome-div').should('contain', `Welcome ${Cypress.env('aad_username')}!`)

  // Get the access token and store it in a fixture
  cy.window().then((win) => {
    const token = win.localStorage.getItem('access_token') // Adjust based on where token is stored
    if (token) {
      cy.writeFile('cypress/fixtures/token.json', { access_token: token })
      cy.log('Access token stored successfully.')
    } else {
      cy.log('No access token found.')
    }
  })
}

// Cypress Command to Login and Store Token
Cypress.Commands.add('loginToAAD', (username: string, password: string) => {
  const log = Cypress.log({
    displayName: 'Azure Active Directory Login',
    message: [`🔐 Authenticating | ${username}`],
    autoEnd: false,
  })
  log.snapshot('before')

  loginViaAAD(username, password)

  log.snapshot('after')
  log.end()
})
