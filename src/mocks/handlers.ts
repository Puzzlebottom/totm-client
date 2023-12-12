/* eslint-disable import/no-extraneous-dependencies */
import { graphql, HttpResponse } from 'msw';
import { GetEncountersDocument } from '../__generated__/graphql';
import encounters from './encounters';

const handlers = [
  graphql.query(GetEncountersDocument, () => {
    return HttpResponse.json({
      data: { allEncounters: encounters },
    });
  }),
];

export default handlers;
