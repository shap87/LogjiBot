import purchaseOrdersReducer from './purchaseOrdersReducer';
import * as actionTypes from './purchaseOrdersActionTypes';

describe('Purchase Orders Reducer', () => {
  it('should update purchase orders', () => {
    const purchaseOrder = { status: 'OA' };
    const action = {
      type: actionTypes.FETCHING_SUCCEED,
      purchaseOrders: [purchaseOrder],
      vendors: {},
    };
    expect(purchaseOrdersReducer(undefined, action)).toEqual({
      purchaseOrders: {
        OA: [purchaseOrder],
      },
      vendors: {},
    });
  });
});
