import { describe, it, expect } from 'vitest';
import { z } from 'zod';
import api, { HTTPMethod } from './api';
import {
  GetEncountersRequest,
  GetEncountersResponse,
} from './encounterRequests';
import encounters from '../mocks/encounters';

const validRequest = GetEncountersRequest;
const validResponse = GetEncountersResponse;
const invalidResponse = z.void();

const validEncounterRequest = api<
  z.infer<typeof validRequest>,
  z.infer<typeof validResponse>
>({
  method: HTTPMethod.GET,
  path: 'https://dummy/encounters',
  requestSchema: validRequest,
  responseSchema: validResponse,
});

const invalidEncounterRequest = api<
  z.infer<typeof validRequest>,
  z.infer<typeof invalidResponse>
>({
  method: HTTPMethod.GET,
  path: 'https://dummy/encounters',
  requestSchema: validRequest,
  responseSchema: invalidResponse,
});

describe('api', () => {
  it('should return a Promise', () => {
    const result = validEncounterRequest();

    expect(result).toHaveProperty('then');
  });

  it('should resolve to the correct data if the response is valid', async () => {
    const result = await validEncounterRequest();

    expect(result).toEqual(encounters);
  });

  it('should return an empty array if the response is not valid', async () => {
    const result = await invalidEncounterRequest();

    expect(result).toEqual([]);
  });
});
