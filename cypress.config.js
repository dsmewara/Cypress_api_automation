import { defineConfig } from 'cypress';
import dotenv from 'dotenv';

dotenv.config(); // Load .env variables

export default defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL, // Base API URL
    defaultCommandTimeout: 10000,
    env: {
      azureAuthUrl: process.env.CYPRESS_AZURE_AUTH_URL,
      clientId: process.env.CYPRESS_CLIENT_ID,
      username: process.env.CYPRESS_USERNAME,
      password: process.env.CYPRESS_PASSWORD,
    },
    setupNodeEvents(on, config) {
      // Custom event listeners if needed
    },
  },
});
