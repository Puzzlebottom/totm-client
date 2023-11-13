import { describe, it, expect, vi, afterEach } from 'vitest';
import {
  GetEncountersRequest,
  GetEncountersResponse,
  getEncounters,
} from './encounterRequests';

import testEncounters from '../mocks/encounters';
import { HTTPMethod, HTTPStatusCode } from './api';

const { apiCallMock } = vi.hoisted(() => {
  return { apiCallMock: vi.fn(() => testEncounters) };
});

const { apiMock } = vi.hoisted(() => {
  return { apiMock: vi.fn(() => apiCallMock) };
});

vi.mock('./api.ts', async () => {
  const actual: {
    HTTPMethod: HTTPMethod;
    HTTPStatusCode: HTTPStatusCode;
    default: () => (data: Request) => Promise<Response>;
  } = await vi.importActual('./api.ts');

  return {
    ...actual,
    default: apiMock,
  };
});

describe('getEncounters', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('calls the api function with the correct arguments', async () => {
    await getEncounters();

    expect(apiMock).toHaveBeenCalled();
    expect(apiMock).toHaveBeenCalledWith(
      expect.objectContaining({
        method: HTTPMethod.GET,
        path: 'https://dummy/encounters',
        requestSchema: GetEncountersRequest,
        responseSchema: GetEncountersResponse,
      })
    );
    expect(apiCallMock).toHaveBeenCalled();
  });

  it('returns an array of encounters', async () => {
    const result = await getEncounters();

    expect(result).toEqual(testEncounters);
  });
});
