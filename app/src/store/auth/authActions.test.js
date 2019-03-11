import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import {
  handleTokenRefreshing,
  handleSuccessfulRefreshing,
  handleFailedRefreshing,
  validateToken,
  authenticateCustomer,
  createCustomer,
  signOut,
} from './authActions';
import * as actionTypes from './authActionTypes';
import * as authService from '../../auth/authService';

jest.mock('../../auth/authService');

describe('Auth Actions', () => {
  const mockStore = configureMockStore([thunk]);

  describe('handleTokenRefreshing', () => {
    it('should create action with refresh token promise', () => {
      expect(handleTokenRefreshing({})).toEqual({
        type: actionTypes.REFRESH_TOKEN,
        promise: {},
      });
    });
  });

  describe('handleSuccessfulRefreshing', () => {
    it('should create an action about successful token refresh', () => {
      expect(handleSuccessfulRefreshing('access')).toEqual({
        type: actionTypes.REFRESHING_SUCCEED,
        access: 'access',
      });
    });
  });

  describe('handleFailedRefreshing', () => {
    it('should create an action about failed refreshing', () => {
      expect(handleFailedRefreshing()).toEqual({
        type: actionTypes.REFRESHING_FAILED,
      });
    });
  });

  describe('validateToken', () => {
    it('should dispatch handle successful token validation', (done) => {
      const store = mockStore({ accessToken: 'access', refreshToken: 'refresh' });
      const expectedActions = [{
        type: actionTypes.TOKEN_VALID,
        access: 'access',
        refresh: 'refresh',
      }];
      authService.validateToken.mockResolvedValue({});
      store.dispatch(validateToken('access', 'refresh'))
        .then(() => {
          expect(authService.validateToken).toHaveBeenCalledWith(0);
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });
  });

  describe('authenticateCustomer', () => {
    it('should set created tokens and dispatch successful authentication event', (done) => {
      const store = mockStore({ accessToken: null, refreshToken: null });
      const data = {
        access: 'newAccess',
        refresh: 'newRefresh',
      };
      const expectedActions = [{
        type: actionTypes.AUTHENTICATION_SUCCEED,
        access: data.access,
        refresh: data.refresh,
        isKeepingSignedIn: true,
      }];
      authService.authenticateCustomer.mockResolvedValue({ data });
      store.dispatch(authenticateCustomer({}, true))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });
  });
});
