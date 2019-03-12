import * as actionTypes from './purchaseOrdersActionTypes';
import { createAction } from '../../utils';
import * as purchaseOrdersService from '../../purchaseOrders/purchaseOrdersService';

const handleSuccessfulFetching = createAction(actionTypes.FETCHING_SUCCEED, 'purchaseOrders');

export const fetchPurchaseOrders = () => (dispatch, getState) => {
  const { auth } = getState();

  return purchaseOrdersService.fetchPurchaseOrders(auth.accessToken)
    .then(({ data }) => {
      dispatch(handleSuccessfulFetching(data));
    });
};
