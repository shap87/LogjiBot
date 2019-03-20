import { request } from '../utils';

export const testQBConnection = (accessToken) => request(
  'get', '/qb/testqbconnect/', {}, accessToken
);
