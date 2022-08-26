import { request } from "graphql-request";

function fetcher<TData, TVariables>(
  endpoint: string,
  requestInit: RequestInit,
  query: string,
  variables?: TVariables
) {
  return async (): Promise<TData> => {
    return await request(endpoint, query, variables, requestInit.headers);
  };
}

export default fetcher;
