import * as actionTypes from './layoutActionTypes';
import createReducer from '../../utils/createReducer';

const initialState = {
  isSidebarCollapsed: false,
};

export default createReducer(initialState, {
  [actionTypes.TOGGLE_SIDEBAR]: ({ isSidebarCollapsed, ...sidebar }) => ({
    ...sidebar,
    isSidebarCollapsed: !isSidebarCollapsed,
  }),
});
