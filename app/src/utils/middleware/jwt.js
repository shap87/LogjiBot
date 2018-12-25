import jwtDecode from 'jwt-decode';
import * as authActions from '../../store/auth/authActions';
import * as authService from '../../auth/authService';

export const jwt = ({ dispatch, getState }) => (next) => (action) => {
  const isActionAsynchronous = typeof action === 'function';

  if (!isActionAsynchronous) {
    return next(action);
  }

  const { auth } = getState();
  const {
    isTokenValid,
    isCustomerAuthenticated,
    refreshingTokenPromise,
    accessToken,
    refreshToken,
  } = auth;

  if (!isTokenValid || !isCustomerAuthenticated) {
    return next(action);
  }

  const decodedAccessToken = jwtDecode(accessToken);

  if (!hasAccessTokenBeenExpired(decodedAccessToken)) {
    return next(action);
  }

  if (refreshingTokenPromise) {
    return refreshingTokenPromise.then(() => next(action));
  }

  const newRefreshingTokenPromise = authService.refreshToken(refreshToken);
  dispatch(authActions.handleTokenRefreshing(newRefreshingTokenPromise));

  return newRefreshingTokenPromise
    .then(({ data }) => {
      const { access } = data;

      return dispatch(authActions.handleSuccessfulRefreshing(access));
    })
    .catch(({ error }) => dispatch(authActions.handleFailedRefreshing(error)));
};

const hasAccessTokenBeenExpired = ({ exp }) => {
  const today = new Date();
  const todayInSeconds = Math.floor(today.valueOf() / 1000);

  console.log(new Date(exp * 1000));

  return exp - todayInSeconds < 100000;
};
