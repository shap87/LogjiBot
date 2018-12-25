import * as actionTypes from './authActionTypes';
import { createReducer } from '../../utils';

const initialState = {
  hasInitialTokenValidationBeenDone: false,
  isTokenValid: false,
  isTokenValidating: false,
  accessToken: null,
  refreshToken: null,
  refreshingTokenPromise: null,
  isCustomerAuthenticated: false,
  isCustomerAuthenticating: false,
  isKeepingSignedIn: false,
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
    isCustomerAuthenticated: true,
    accessToken: action.access,
    refreshToken: action.refresh,
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
    accessToken: action.access,
    refreshToken: action.refresh,
    isKeepingSignedIn: action.isKeepingSignedIn,
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
    accessToken: action.access,
    refreshToken: action.refresh,
    isKeepingSignedIn: action.isKeepingSignedIn,
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

  [actionTypes.REFRESH_TOKEN]: (state, action) => ({
    ...state,
    refreshingTokenPromise: action.promise,
  }),

  [actionTypes.REFRESHING_SUCCEED]: (state, action) => ({
    ...state,
    accessToken: action.access,
    refreshingTokenPromise: null,
  }),

  [actionTypes.REFRESHING_FAILED]: (state) => ({
    ...state,
    refreshingTokenPromise: null,
  }),
});
