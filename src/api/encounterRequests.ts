import { gql } from '../__generated__';

const encounterRequests = {
  GET_ALL: gql(`
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
  `),

  CREATE: gql(`
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
  `),

  DELETE: gql(`
    mutation deleteEncounter($id: Int!) {
      deleteEncounter(
        id: $id
      ) {
        id
      }
    }
  `),

  UPDATE: gql(`
    mutation updateEncounter($encounter: EncounterAttributes!) {
      updateEncounter(
        attributes: $encounter
      ) {
        encounter {
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
    }
  `),
};

export default encounterRequests;
