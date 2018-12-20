import { request } from '../utils/apiService';

export const fetchPurchaseOrders = () => request('get', '/po/purchaseorders/', {}, true);
