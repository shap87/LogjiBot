import * as actionTypes from './authActionTypes';
import createAction from '../../utils/createAction';
import * as authService from '../../auth/authService';

const handleTokenValidation = createAction(actionTypes.VALIDATE_TOKEN);
const handleInvalidToken = createAction(actionTypes.TOKEN_INVALID, 'error');
const handleValidToken = createAction(actionTypes.TOKEN_VALID, 'token');

const handleCustomerAuthentication = createAction(actionTypes.AUTHENTICATE_CUSTOMER);
const handleFailedAuthentication = createAction(actionTypes.AUTHENTICATION_FAILED, 'error');
const handleSuccessfulAuthentication = createAction(actionTypes.AUTHENTICATION_SUCCEED, 'token', 'isKeepingSignedIn');

const handleCustomerCreation = createAction(actionTypes.CREATE_CUSTOMER);
const handleFailedCreation = createAction(actionTypes.CREATING_FAILED, 'error');
const handleSuccessfulCreation = createAction(actionTypes.CREATING_SUCCEED, 'user', 'token', 'isKeepingSignedIn');

export const setInitialTokenValidation = createAction(actionTypes.INITIAL_VALIDATION_DONE);

export const validateToken = (currentToken) => (dispatch, getState) => {
  const { auth } = getState();

  dispatch(handleTokenValidation());

  return authService.validateToken(currentToken)
    .then(() => dispatch(handleValidToken(currentToken)))
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
      const { access } = data;
      authService.setAuthTokenInStorage(access);
      dispatch(handleSuccessfulAuthentication(access, isKeepingSignedIn));
    })
    .catch(({ error }) => dispatch(handleFailedAuthentication(error)));
};

export const createCustomer = (credentials, isKeepingSignedIn = false) => (dispatch) => {
  dispatch(handleCustomerCreation());

  return authService.createCustomer(credentials)
    .then(({ data }) => {
      const { access } = data;
      authService.setAuthTokenInStorage(access);
      const { username, email } = credentials;

      dispatch(handleSuccessfulCreation({ username, email }, access, isKeepingSignedIn));
    })
    .catch(({ error }) => dispatch(handleFailedCreation(error)));
};
