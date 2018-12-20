import * as actionTypes from './purchaseOrdersActionTypes';
import createAction from '../../utils/createAction';
import * as purchaseOrdersService from '../../purchaseOrders/purchaseOrdersService';

const handleFetchPurchaseOrders = createAction(actionTypes.FETCH_PURCHASE_ORDERS);
const handleSuccessfulFetching = createAction(actionTypes.FETCHING_SUCCEED, 'purchaseOrders');
const handleFailedFetching = createAction(actionTypes.FETCHING_FAILED);

export const fetchPurchaseOrders = () => (dispatch) => {
  dispatch(handleFetchPurchaseOrders());

  return purchaseOrdersService.fetchPurchaseOrders()
    .then(({ data }) => {
      dispatch(handleSuccessfulFetching(data));
    })
    .catch(() => dispatch(handleFailedFetching()));
};
