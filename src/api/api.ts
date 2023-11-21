import type { z } from 'zod';
import { encounters } from '../data/encounters';

export enum HTTPMethod {
  GET = 'GET',
  POST = 'POST',
}

export enum HTTPStatusCode {
  OK = 200,
}

export default function api<Request, Response>({
  method,
  path,
  requestSchema,
  responseSchema,
}: {
  method: HTTPMethod;
  path: string;
  requestSchema: z.ZodType<Request>;
  responseSchema: z.ZodType<Response>;
}): (data: Request) => Promise<Response> {
  return (requestData: Request) => {
    requestSchema.parse(requestData);

    async function apiCall(): Promise<Response> {
      const response = await fetch(path);
      const data = await response.json();
      const validatedEncounters = responseSchema.safeParse(data);

      // Sends local dummy until backend is built
      // const validatedEncounters = responseSchema.safeParse(encounters);

      if (!validatedEncounters.success) {
        return new Promise((resolve) => {
          resolve([] as Response);
        });
      }

      return validatedEncounters.data;
    }

    return apiCall();
  };
}
