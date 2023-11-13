/* eslint-disable import/prefer-default-export */
import { z } from 'zod';
import { encounterSchema } from '../interfaces/Encounter';
import api, { HTTPMethod } from './api';

export const GetEncountersRequest = z.void();
export const GetEncountersResponse = z.array(encounterSchema);

export const getEncounters = api<
  z.infer<typeof GetEncountersRequest>,
  z.infer<typeof GetEncountersResponse>
>({
  method: HTTPMethod.GET,
  path: 'https://dummy/encounters',
  requestSchema: GetEncountersRequest,
  responseSchema: GetEncountersResponse,
});
