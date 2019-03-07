import axios from 'axios';

import { apiUrl, apiVersion } from '../config';

export const getAuthTokenFromStorage = () => {
  if (!localStorage) {
    return null;
  }

  return localStorage.getItem('auth_token');
};

export const setAuthTokenInStorage = (token) => {
  if (!localStorage) {
    return;
  }

  localStorage.setItem('auth_token', token);
};

export const validateToken = (token) => axios
  .post(`${apiUrl}/v${apiVersion}/token/refresh/`, { refresh: token });

export const authenticateCustomer = ({ username, password }) => axios
  .post(`${apiUrl}/v${apiVersion}/token/`, { username, password });

export const createCustomer = ({ email, username, password }) => axios
  .post(`${apiUrl}/v${apiVersion}/user/registration/`, { username, password, email });
