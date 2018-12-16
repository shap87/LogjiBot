import * as actionTypes from './authActionTypes';
import createReducer from '../../utils/createReducer';

const initialState = {
  hasInitialTokenValidationBeenDone: false,
  isTokenValid: false,
  isTokenValidating: false,
  token: null,
  isCustomerAuthenticated: false,
  isCustomerAuthenticating: false,
  user: null,
};

export default createReducer(initialState, {
  [actionTypes.VALIDATE_TOKEN]: (state) => ({
    ...state,
    isTokenValidating: true,
  }),

  [actionTypes.TOKEN_VALID]: (state, action) => ({
    ...state,
    isTokenValidating: false,
    isTokenValid: true,
    token: action.token,
  }),

  [actionTypes.TOKEN_INVALID]: (state) => ({
    ...state,
    isTokenValidating: false,
    isTokenValid: false,
  }),

  [actionTypes.AUTHENTICATE_CUSTOMER]: (state) => ({
    ...state,
    isCustomerAuthenticating: true,
  }),

  [actionTypes.AUTHENTICATION_SUCCEED]: (state, action) => ({
    ...state,
    isCustomerAuthenticating: false,
    isCustomerAuthenticated: true,
    isTokenValid: true,
    token: action.token,
  }),

  [actionTypes.AUTHENTICATION_FAILED]: (state) => ({
    ...state,
    isCustomerAuthenticating: false,
    isCustomerAuthenticated: false,
  }),

  [actionTypes.CREATE_CUSTOMER]: (state) => ({
    ...state,
    isCustomerAuthenticating: true,
  }),

  [actionTypes.CREATING_SUCCEED]: (state, action) => ({
    ...state,
    isCustomerAuthenticating: false,
    isCustomerAuthenticated: true,
    isTokenValid: true,
    token: action.token,
    user: action.user,
  }),

  [actionTypes.CREATING_FAILED]: (state) => ({
    ...state,
    isCustomerAuthenticating: false,
    isCustomerAuthenticated: false,
  }),

  [actionTypes.INITIAL_VALIDATION_DONE]: (state) => ({
    ...state,
    hasInitialTokenValidationBeenDone: true,
  }),
});
