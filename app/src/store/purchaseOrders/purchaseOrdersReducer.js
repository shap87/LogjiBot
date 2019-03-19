import {
  groupBy,
} from 'lodash';

import * as actionTypes from './purchaseOrdersActionTypes';
import { createReducer } from '../../utils';

const initialState = {
  purchaseOrders: {},
  vendors: {},
};

export default createReducer(initialState, {
  [actionTypes.FETCHING_SUCCEED]: (state, action) => ({
    ...state,
    purchaseOrders: groupBy(action.purchaseOrders, 'status'),
    vendors: action.vendors,
  }),
});
