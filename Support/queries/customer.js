export const GET_CUSTOMER_LIST_QUERY = `
  query getCustomerList {
    getCustomerList {
      label
      customerId
      code
    }
  }
`;

export const GET_CUSTOMER_DETAIL_QUERY = `
  query getCustomerDetail($customerId: String!) {
    getCustomerDetail(customerId: $customerId) {
      label
      customerId
      code
    }
  }
`;
