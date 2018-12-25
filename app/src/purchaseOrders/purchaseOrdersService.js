import { request } from '../utils/apiService';

export const fetchPurchaseOrders = (accessToken) => request(
  'get', '/po/purchaseorders/', {}, accessToken
);
