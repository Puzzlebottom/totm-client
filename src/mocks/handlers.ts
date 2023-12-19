/* eslint-disable import/no-extraneous-dependencies */
import { graphql, HttpResponse } from 'msw';
import { gql } from '@apollo/client';
import {
  GetEncountersDocument,
  CreateEncounterDocument,
  DeleteEncounterDocument,
  UpdateEncounterDocument,
} from '../__generated__/graphql';
import encounters from './encounters';
import { Encounter } from '../interfaces/Encounter';

export const TEST_QUERY = gql(`
  query testQuery {
    status
  }
`);

export const TEST_MUTATION = gql(`
  mutation testMutation {
    status
  }
`);

export const TEST_AUTH = gql(`
  query testAuth {
    token
  }
`);

const handlers = [
  graphql.query(GetEncountersDocument, () => {
    return HttpResponse.json({
      data: { allEncounters: encounters },
    });
  }),

  graphql.mutation(CreateEncounterDocument, ({ variables }) => {
    return HttpResponse.json({
      data: {
        createEncounter: {
          id: 3,
          name: variables.name,
          description: variables.description,
          isActive: false,
          round: 0,
          turn: 0,
          owner: 0,
          createdAt: Date.now(),
        },
      },
    });
  }),

  graphql.mutation(DeleteEncounterDocument, ({ variables }) => {
    return HttpResponse.json({
      data: {
        deleteEncounter: {
          id: variables.id,
        },
      },
    });
  }),

  graphql.mutation(UpdateEncounterDocument, ({ variables }) => {
    return HttpResponse.json({
      data: {
        updateEncounter: {
          encounter: {
            ...variables.encounter,
            createdAt: Date.now(),
          } as Encounter,
        },
      },
    });
  }),

  graphql.query(TEST_QUERY, () => {
    return HttpResponse.json({
      data: {
        status: 'success',
      },
    });
  }),

  graphql.mutation(TEST_MUTATION, () => {
    return HttpResponse.json({
      data: {
        status: 'success',
      },
    });
  }),

  graphql.query(TEST_AUTH, ({ request }) => {
    const token = request.headers.get('authorization');
    return HttpResponse.json({
      data: {
        token,
      },
    });
  }),
];

export default handlers;
