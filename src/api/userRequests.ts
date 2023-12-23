import { gql } from '../__generated__';

const userRequests = {
  REGISTER: gql(`
    mutation registerUser($email: String!, $password: String!) {
      registerUser(
        email: $email,
        password: $password
      ) {
        user {
          email
          authenticationToken
        } 
      }
    }
  `),

  LOGIN: gql(`
    mutation loginUser($email: String!, $password: String!) {
      loginUser(
        email: $email,
        password: $password
      ) {
        user {
          email
          authenticationToken
        }
      }
    }
  `),

  LOGOUT: gql(`
    mutation logoutUser {
      logoutUser {
        user {
          email
        }
      }
    }
  `),
};

export default userRequests;
