/* eslint-disable import/prefer-default-export */
import { gql } from '../__generated__';

export const GET_ENCOUNTERS = gql(`
  query getEncounters {
    allEncounters {
      id
      name
      description
      isActive
      round
      turn
      owner
      createdAt
    }
  }
`);

export const CREATE_ENCOUNTER = gql(`
  mutation createEncounter($name: String!, $description: String!) {
    createEncounter(
      name: $name, 
      description: $description
    ) {
      id
      name
      description
      isActive
      round
      turn
      owner
      createdAt
    }
  }
`);

export const DELETE_ENCOUNTER = gql(`
  mutation deleteEncounter($id: Int!) {
    deleteEncounter(
      id: $id
    ) {
      id
    }
  }
`);
