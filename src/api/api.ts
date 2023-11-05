import axios from 'redaxios';
import type { z } from 'zod';
import { encounters } from '../data/encounters';

export enum HTTPMethod {
  GET = 'GET',
  POST = 'POST',
}

export enum HTTPStatusCode {
  OK = 200,
}

export default function useConnectAPI<Request, Response>({
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

    async function apiCall() {
      // const response = await axios({
      //   baseURL: process.env.API_URL,
      //   method,
      //   url: path,
      //   [method === HTTPMethod.GET ? 'params' : 'data']: requestData,
      // });

      // return responseSchema.parse(response.data);

      // Sends local dummy until backend is built
      const validatedEncounters = responseSchema.safeParse(encounters);

      if (!validatedEncounters.success) {
        console.log(validatedEncounters.error);
        return [];
      }

      return validatedEncounters.data;
    }

    return apiCall();
  };
}
