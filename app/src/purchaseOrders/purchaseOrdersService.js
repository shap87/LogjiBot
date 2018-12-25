import { request } from '../utils';

export const fetchPurchaseOrders = (accessToken) => request(
  'get', '/po/purchaseorders/', {}, accessToken
);
