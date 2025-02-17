import { getAccessToken } from './tokenUtils';
import * as queries from './queries';

/**
 * Sends a GraphQL request with authentication.
 * @param {string} query - The GraphQL query or mutation.
 * @param {object} variables - The variables for the query/mutation.
 */
const sendGraphQLRequest = async (query, variables = {}) => {
  const token = await getAccessToken();  // Get fresh access token

  return cy.request({
    method: 'POST',
    url: Cypress.env('CYPRESS_GRAPHQL_API_URL'),  // Use Cypress environment variable
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: {
      query,
      variables,
    },
  });
};

// API Functions

export const createLoginSession = () => {
  return sendGraphQLRequest(queries.CREATE_LOGIN_SESSION_MUTATION);
};

export const getCustomerList = () => {
  return sendGraphQLRequest(queries.GET_CUSTOMER_LIST_QUERY);
};

export const getCustomerDetail = (customerId) => {
  return sendGraphQLRequest(queries.GET_CUSTOMER_DETAIL_QUERY, { customerId });
};

export const createSession = () => {
  return sendGraphQLRequest(queries.CREATE_SESSION_MUTATION);
};

export const updateSession = (sessionId, status) => {
  return sendGraphQLRequest(queries.UPDATE_SESSION_MUTATION, { sessionId, status });
};

export const getMetadata = () => {
  return sendGraphQLRequest(queries.GET_METADATA_QUERY);
};
