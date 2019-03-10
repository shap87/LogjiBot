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

describe('Auth Actions', () => {
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
});
