/* eslint-disable import/prefer-default-export */
import { gql } from '../__generated__';

export const getEncounters = gql(`
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
