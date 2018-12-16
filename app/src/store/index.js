import { combineReducers } from 'redux';
import authReducer from './auth/authReducer';
import layoutReducer from './layout/layoutReducer';

export const store = combineReducers({
  auth: authReducer,
  layout: layoutReducer,
});
