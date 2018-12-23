import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router, Route, Switch, Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';

import DashboardRouter from './dashboard/DashboardRouter';
import PurchaseOrdersRouter from './purchaseOrders/PurchaseOrdersRouter';
import UserRouter from './user/UserRouter';
import {
  ForgotPassword, ResetPassword, SignIn, SignUp, OAuth,
} from './auth/routes';
import { PrivateRoute, NotMatch } from './auth/components';
import { Header, Sidebar } from './layout/components';
import { validateToken, setInitialTokenValidation } from './store/auth/authActions';
import { getAccessTokenFromStorage } from './auth/authService';

export class AppRouter extends PureComponent {
  componentDidMount() {
    const {
      validateTokenOnMount, hasInitialTokenValidationBeenDone, isTokenValid, setInitialTokenValidationOnMount,
    } = this.props;

    if (isTokenValid || hasInitialTokenValidationBeenDone) {
      return;
    }

    const currentToken = getAccessTokenFromStorage();

    if (!currentToken) {
      setInitialTokenValidationOnMount();
    } else {
      validateTokenOnMount(currentToken);
    }
  }

  render() {
    const {
      hasInitialTokenValidationBeenDone, isTokenValid, isSidebarCollapsed,
      validateTokenOnMount,
    } = this.props;

    if (!hasInitialTokenValidationBeenDone) {
      // TODO: adding loader component
      return null;
    }

    const isAuthenticated = hasInitialTokenValidationBeenDone && isTokenValid;

    return (
      <Router>
        <main className="d-flex flex-grow-1 bg-light">
          { isAuthenticated
            ? (<Sidebar isSidebarCollapsed={isSidebarCollapsed} />)
            : null
          }

          <div className="d-flex flex-column flex-grow-1 rounded-left px-4 py-2 bg-white shadow-z3">
            { isAuthenticated ? (<Header />) : null }
            <Switch>
              <Route path="/" render={() => <Redirect to="/dashboard" />} exact />
              <Route
                path="/oauth"
                render={(props) => (
                  <OAuth
                    isAuthenticated={isAuthenticated}
                    validateToken={validateTokenOnMount}
                    {...props}
                  />
                )}
              />
              <Route path="/signin" component={SignIn} />
              <Route path="/signup" component={SignUp} />
              <Route path="/forgot-password" component={ForgotPassword} />
              <Route path="/reset-password" component={ResetPassword} />
              <PrivateRoute
                path="/dashboard"
                component={DashboardRouter}
                isAuthenticated={isAuthenticated}
              />
              <PrivateRoute
                path="/purchase-orders"
                component={PurchaseOrdersRouter}
                isAuthenticated={isAuthenticated}
              />
              <PrivateRoute
                path="/user-settings"
                component={UserRouter}
                isAuthenticated={isAuthenticated}
              />
              <Route component={NotMatch} />
            </Switch>

          </div>
        </main>
      </Router>
    );
  }
}

const mapStateToProps = ({ auth, layout }) => ({
  ...auth,
  ...layout,
});
const mapActionsToProps = (dispatch) => ({
  validateTokenOnMount: (token) => dispatch(validateToken(token)),
  setInitialTokenValidationOnMount: () => dispatch(setInitialTokenValidation()),
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(AppRouter);

AppRouter.propTypes = {
  setInitialTokenValidationOnMount: PropTypes.func.isRequired,
  validateTokenOnMount: PropTypes.func.isRequired,
  isTokenValid: PropTypes.bool.isRequired,
  hasInitialTokenValidationBeenDone: PropTypes.bool.isRequired,
  isSidebarCollapsed: PropTypes.bool.isRequired,
};
