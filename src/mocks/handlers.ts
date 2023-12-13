/* eslint-disable import/no-extraneous-dependencies */
import { graphql, HttpResponse } from 'msw';
import {
  GetEncountersDocument,
  CreateEncounterDocument,
  DeleteEncounterDocument,
} from '../__generated__/graphql';
import encounters from './encounters';

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
];

export default handlers;
