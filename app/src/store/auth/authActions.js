import * as actionTypes from './authActionTypes';
import createAction from '../../utils/createAction';
import * as authService from '../../auth/authService';

const handleTokenValidation = createAction(actionTypes.VALIDATE_TOKEN);
const handleInvalidToken = createAction(actionTypes.TOKEN_INVALID, 'error');
const handleValidToken = createAction(actionTypes.TOKEN_VALID, 'access', 'refresh');

const handleCustomerAuthentication = createAction(actionTypes.AUTHENTICATE_CUSTOMER);
const handleFailedAuthentication = createAction(actionTypes.AUTHENTICATION_FAILED, 'error');
const handleSuccessfulAuthentication = createAction(
  actionTypes.AUTHENTICATION_SUCCEED,
  'access', 'refresh', 'isKeepingSignedIn'
);

const handleCustomerCreation = createAction(actionTypes.CREATE_CUSTOMER);
const handleFailedCreation = createAction(actionTypes.CREATING_FAILED, 'error');
const handleSuccessfulCreation = createAction(
  actionTypes.CREATING_SUCCEED,
  'access', 'token', 'isKeepingSignedIn'
);

export const setInitialTokenValidation = createAction(actionTypes.INITIAL_VALIDATION_DONE);

export const validateToken = (accessToken, refreshToken) => (dispatch, getState) => {
  const { auth } = getState();

  dispatch(handleTokenValidation());

  return authService.validateToken(accessToken)
    .then(() => dispatch(handleValidToken(accessToken, refreshToken)))
    .catch(({ error }) => dispatch(handleInvalidToken(error)))
    .finally(() => {
      if (!auth.hasInitialTokenValidationBeenDone) {
        dispatch(setInitialTokenValidation());
      }
    });
};

export const authenticateCustomer = (credentials, isKeepingSignedIn = false) => (dispatch) => {
  dispatch(handleCustomerAuthentication());

  return authService.authenticateCustomer(credentials)
    .then(({ data }) => {
      const { access, refresh } = data;

      authService.setAccessTokenInStorage(access);
      authService.setRefreshTokenInStorage(refresh);

      dispatch(handleSuccessfulAuthentication(access, refresh, isKeepingSignedIn));
    })
    .catch(({ error }) => dispatch(handleFailedAuthentication(error)));
};

export const createCustomer = (credentials, isKeepingSignedIn = false) => (dispatch) => {
  dispatch(handleCustomerCreation());

  return authService.createCustomer(credentials)
    .then(({ data }) => {
      const { access, refresh } = data;

      authService.setAccessTokenInStorage(access);
      authService.setRefreshTokenInStorage(refresh);

      dispatch(handleSuccessfulCreation(access, refresh, isKeepingSignedIn));
    })
    .catch(({ error }) => dispatch(handleFailedCreation(error)));
};
