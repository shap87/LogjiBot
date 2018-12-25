import axios from 'axios';
import { apiUrl, apiVersion } from '../config';

export const request = (method, url, params = {}, accessToken) => {
  const body = method === 'get' ? 'params' : 'data';
  const config = {
    method,
    url: `//${apiUrl}/v${apiVersion}${url}`,
    [body]: params,
  };

  if (accessToken) {
    config.headers = {
      Authorization: `Bearer ${accessToken}`,
    };
  }

  return axios.request(config);
};
