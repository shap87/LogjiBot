import * as actionTypes from './purchaseOrdersActionTypes';
import createReducer from '../../utils/createReducer';

const initialState = {
  arePurchaseOrdersFetching: false,
  arePurchaseOrdersFetched: false,
  purchaseOrders: [],
};

export default createReducer(initialState, {
  [actionTypes.FETCH_PURCHASE_ORDERS]: (state) => ({
    ...state,
    arePurchaseOrdersFetching: true,
  }),

  [actionTypes.FETCHING_SUCCEED]: (state, action) => ({
    ...state,
    arePurchaseOrdersFetching: false,
    arePurchaseOrdersFetched: true,
    purchaseOrders: action.purchaseOrders,
  }),

  [actionTypes.FETCHING_FAILED]: (state) => ({
    ...state,
    arePurchaseOrdersFetching: false,
  }),
});
