import { gql } from "@apollo/client";

export const GET_LOGGED_IN_CUSTOMER = gql`
  query getUser($id: String = "1") {
    me(id: $id) {
      id
      name
      email
      transactionId
      brushName
      address {
        id
        type
        name
        info
      }
      contact {
        id
        type
        number
      }
      card {
        id
        type
        name
      }
    }
  }
`;
