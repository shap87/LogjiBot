import * as actionTypes from './purchaseOrdersActionTypes';
import { createReducer } from '../../utils';

const initialState = {
  purchaseOrders: [],
};

export default createReducer(initialState, {
  [actionTypes.FETCHING_SUCCEED]: (state, action) => ({
    ...state,
    purchaseOrders: action.purchaseOrders,
  }),
});
