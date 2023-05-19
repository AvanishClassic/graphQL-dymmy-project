import { gql } from "@apollo/client";

export const GET_ALL_LOCATION = gql`
  query getAllLocation($tenant: String!) {
    locationList(tenant: $tenant) {
      resources {
        address
        description
        updatedAt
        id
        name
        status
        tag
        npi
        taxId

        updatedAt
        telecom {
          value
          system
        }
      }
    }
  }
`;
