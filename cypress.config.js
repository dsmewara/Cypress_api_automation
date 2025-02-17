require('dotenv').config();  // Load environment variables from .env file

const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL, // Base URL for your API
    defaultCommandTimeout: 10000, // Increased timeout for API calls
    env: {
      graphqlApiUrl: process.env.CYPRESS_GRAPHQL_API_URL, // GraphQL API URL from .env
      azureAuthUrl: process.env.CYPRESS_AZURE_AUTH_URL,   // Azure Authentication URL
      clientId: process.env.CYPRESS_CLIENT_ID,             // Client ID
      clientSecret: process.env.CYPRESS_CLIENT_SECRET,     // Client Secret
      username: process.env.CYPRESS_USERNAME,             // Username (email)
      password: process.env.CYPRESS_PASSWORD,             // Password
    },
    setupNodeEvents(on, config) {
      // Setup custom node event listeners if required
    },
  },
});
