export const CREATE_LOGIN_SESSION_MUTATION = `
  mutation createLoginSession {
    createLoginSession {
      email
      name
      userId
      activeCustomer {
        label
        customerId
        code
      }
      customerRole {
        customer {
          label
          code
          customerId
        }
        role {
          name
          code
          roleId
        }
      }
    }
  }
`;
