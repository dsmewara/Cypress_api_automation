import axios from 'axios';

let accessToken = null;
let tokenExpiration = null;

/**
 * Fetches a new access token if the current one is expired or doesn't exist.
 * Uses Azure's OAuth2.0 password grant flow to get the token.
 */
export const getAccessToken = async () => {
  const now = Date.now();

  // If the token is still valid, return it
  if (accessToken && tokenExpiration && now < tokenExpiration) {
    return accessToken;
  }

  // If the token is expired or doesn't exist, fetch a new one
  try {
    const response = await axios.post(process.env.CYPRESS_AZURE_AUTH_URL, {
      grant_type: 'password',
      client_id: process.env.CYPRESS_CLIENT_ID,
      client_secret: process.env.CYPRESS_CLIENT_SECRET,
      username: process.env.CYPRESS_USERNAME,
      password: process.env.CYPRESS_PASSWORD,
      scope: 'openid profile email', // Scopes needed for your API
    });

    // Save the token and expiration time
    accessToken = response.data.access_token;
    tokenExpiration = now + response.data.expires_in * 1000; // expires_in is in seconds, convert to ms

    return accessToken;
  } catch (error) {
    throw new Error(`🔴 Failed to fetch access token: ${error.message}`);
  }
};
