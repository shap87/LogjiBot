import * as actionTypes from './purchaseOrdersActionTypes';
import { createAction } from '../../utils';
import * as purchaseOrdersService from '../../purchaseOrders/purchaseOrdersService';

const handleFetchPurchaseOrders = createAction(actionTypes.FETCH_PURCHASE_ORDERS);
const handleSuccessfulFetching = createAction(actionTypes.FETCHING_SUCCEED, 'purchaseOrders');
const handleFailedFetching = createAction(actionTypes.FETCHING_FAILED);

export const fetchPurchaseOrders = () => (dispatch, getState) => {
  const { auth } = getState();
  const { accessToken } = auth;

  dispatch(handleFetchPurchaseOrders());

  return purchaseOrdersService.fetchPurchaseOrders(accessToken)
    .then(({ data }) => {
      dispatch(handleSuccessfulFetching(data));
    })
    .catch(() => dispatch(handleFailedFetching()));
};
