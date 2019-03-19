import { map, uniq, keyBy } from 'lodash';

import * as actionTypes from './purchaseOrdersActionTypes';
import { createAction } from '../../utils';
import * as purchaseOrdersService from '../../purchaseOrders/purchaseOrdersService';

const handleSuccessfulFetching = createAction(actionTypes.FETCHING_SUCCEED, 'purchaseOrders', 'vendors');

export const fetchPurchaseOrders = () => (dispatch, getState) => {
  const { auth } = getState();
  const payload = {
    purchaseOrders: {},
    vendors: {},
  };

  return purchaseOrdersService.fetchPurchaseOrders(auth.accessToken)
    .then(({ data }) => {
      payload.purchaseOrders = data;

      const vendorIds = uniq(map(data, 'vendor'));
      return Promise.all(vendorIds.map(
        (vendorId) => purchaseOrdersService.fetchVendor(vendorId, auth.accessToken)
      ));
    })
    .then((vendors) => {
      payload.vendors = keyBy(map(vendors, 'data'), 'id');
      payload.purchaseOrders = map(payload.purchaseOrders, ({ vendor, ...purchaseOrder }) => ({
        ...purchaseOrder,
        vendor: payload.vendors[vendor].name,
      }));
      dispatch(handleSuccessfulFetching(payload.purchaseOrders, payload.vendors));
    });
};
