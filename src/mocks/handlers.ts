/* eslint-disable import/no-extraneous-dependencies */
import { HttpResponse, http } from 'msw';
import encounters from './encounters';

// const BASE_URL: string | undefined = process.env.API_URL;

const handlers = [
  http.get('https://dummy/encounters', () => {
    return HttpResponse.json(encounters, { status: 200 });
  }),
];

export default handlers;
