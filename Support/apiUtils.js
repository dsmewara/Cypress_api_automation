import { API_ENDPOINTS } from './apiEndpoints';
import { getAccessToken } from './tokenUtils';

const sendGraphQLRequest = async (apiPath, query, variables = {}) => {
  const token = await getAccessToken();

  return cy.request({
    method: 'POST',
    url: `${Cypress.env('CYPRESS_BASE_URL')}${apiPath}`, // Uses dynamic API path
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: { query, variables },
  });
};

// API Functions
export const createLoginSession = () => sendGraphQLRequest(API_ENDPOINTS.AUTH.LOGIN, queries.CREATE_LOGIN_SESSION_MUTATION);
export const getCustomerList = () => sendGraphQLRequest(API_ENDPOINTS.CUSTOMER.LIST, queries.GET_CUSTOMER_LIST_QUERY);
export const getCustomerDetail = (customerId) => sendGraphQLRequest(API_ENDPOINTS.CUSTOMER.DETAIL, queries.GET_CUSTOMER_DETAIL_QUERY, { customerId });
export const createSession = () => sendGraphQLRequest(API_ENDPOINTS.SESSION.CREATE, queries.CREATE_SESSION_MUTATION);
export const updateSession = (sessionId, status) => sendGraphQLRequest(API_ENDPOINTS.SESSION.UPDATE, queries.UPDATE_SESSION_MUTATION, { sessionId, status });
export const getMetadata = () => sendGraphQLRequest(API_ENDPOINTS.METADATA.FETCH, queries.GET_METADATA_QUERY);
