import axios from 'axios';

let accessToken = null;
let tokenExpiration = null;

export const getAccessToken = async () => {
  const now = Date.now();
  if (accessToken && tokenExpiration && now < tokenExpiration) {
    return accessToken;
  }

  try {
    const response = await axios.post(Cypress.env('CYPRESS_AZURE_AUTH_URL'), new URLSearchParams({
      grant_type: 'password',
      client_id: Cypress.env('CYPRESS_CLIENT_ID'),
      username: Cypress.env('CYPRESS_USERNAME'),
      password: Cypress.env('CYPRESS_PASSWORD'),
      scope: 'openid profile email',
    }).toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    accessToken = response.data.access_token;
    tokenExpiration = now + response.data.expires_in * 1000;

    return accessToken;
  } catch (error) {
    throw new Error(`🔴 Failed to fetch access token: ${error.response?.data?.error_description || error.message}`);
  }
};
