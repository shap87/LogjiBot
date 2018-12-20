import axios from 'axios';
import { apiUrl, apiVersion } from '../config';
import { getAuthTokenFromStorage } from '../auth/authService';

export const request = (method, url, params = {}, isAuthenticated) => {
  const body = method === 'get' ? 'params' : 'data';
  const config = {
    method,
    url: `//${apiUrl}/v${apiVersion}${url}`,
    [body]: params,
  };

  if (isAuthenticated) {
    config.headers = {
      Authorization: `Bearer ${getAuthTokenFromStorage()}`,
    };
  }

  return axios.request(config);
};
