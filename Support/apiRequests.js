import { getAccessToken } from './tokenUtils';
import * as queries from './queries';

const sendGraphQLRequest = async (query, variables = {}) => {
  const token = await getAccessToken();  // Get the latest token

  return cy.request({
    method: 'POST',
    url: process.env.CYPRESS_GRAPHQL_API_URL, // Dynamically use API URL from .env
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

// Central API functions for all operations

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
