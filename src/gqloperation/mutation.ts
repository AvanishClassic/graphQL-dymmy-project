import { gql } from "@apollo/client";

export const ADD_LOCATION = gql`
  mutation LocationCreate($tenant: String!, $requestBody: LocationWriteInput!) {
    locationCreate(tenant: $tenant, requestBody: $requestBody) {
      resourceID
    }
  }
`;

export const REMOVE_LOCATION = gql`
  mutation LocationRemove($locationRemoveId: String!, $tenant: String!) {
    locationRemove(id: $locationRemoveId, tenant: $tenant) {
      resourceID
    }
  }
`;

export const UPDATE_LOCATION = gql`
  mutation LocationUpdate(
    $requestBody: LocationWriteInput!
    $tenant: String!
    $locationUpdateId: String!
  ) {
    locationUpdate(
      requestBody: $requestBody
      tenant: $tenant
      id: $locationUpdateId
    ) {
      resourceID
    }
  }
`;
