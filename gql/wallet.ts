import { gql } from "@apollo/client";

export const GetBalanceQuery = gql`
  query GetBalance {
    getBalance {
      message
      status
      data {
        id
        mobile
        balance
        userId
        currency
        status
        createdAt
        updatedAt
      }
    }
  }
`;
