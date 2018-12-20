import { request } from '../utils/apiService';

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

export const validateToken = (token) => request(
  'post', '/token/refresh/', { refresh: token }
);

export const authenticateCustomer = ({ username, password }) => request(
  'post', '/token/', { username, password }
);

export const createCustomer = ({ email, username, password }) => request(
  'post', '/user/registration/', { username, password, email }
);
