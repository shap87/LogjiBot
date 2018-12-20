import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router, Route, Switch, Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';

import DashboardRouter from './dashboard/DashboardRouter';
import PurchaseOrdersRouter from './purchaseOrders/PurchaseOrdersRouter';
import UserSettingsRouter from './userSettings/UserSettingsRouter';
import {
  ForgotPassword, ResetPassword, SignIn, SignUp, OAuth,
} from './auth/routes';
import { PrivateRoute, NotMatch } from './auth/components';
import { Header, Sidebar } from './layout/components';
import { validateToken, setInitialTokenValidation } from './store/auth/authActions';
import { toggleSidebar } from './store/layout/layoutActions';
import { getAuthTokenFromStorage } from './auth/authService';

export class AppRouter extends PureComponent {
  componentDidMount() {
    const {
      validateTokenOnMount, hasInitialTokenValidationBeenDone, isTokenValid, setInitialTokenValidationOnMount,
    } = this.props;

    if (isTokenValid || hasInitialTokenValidationBeenDone) {
      return;
    }

    const currentToken = getAuthTokenFromStorage();

    if (!currentToken) {
      setInitialTokenValidationOnMount();
    } else {
      validateTokenOnMount(currentToken);
    }
  }

  render() {
    const {
      hasInitialTokenValidationBeenDone, isTokenValid, isSidebarCollapsed, toggleSidebarWidth,
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

          <div className="d-flex flex-column flex-grow-1 rounded-left px-4 py-2 bg-light shadow-z3">
            { isAuthenticated
              ? (
                <Header
                  isSidebarCollapsed={isSidebarCollapsed}
                  toggleSidebar={toggleSidebarWidth}
                />
              )
              : null
            }

            <Switch>
              <Route path="/" render={() => <Redirect to="/dashboard" />} exact />
              <Route path="/oauth" component={OAuth} />
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
                component={UserSettingsRouter}
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
const mapDispatchToProps = (dispatch) => ({
  validateTokenOnMount: (token) => {
    dispatch(validateToken(token));
  },
  setInitialTokenValidationOnMount: () => {
    dispatch(setInitialTokenValidation());
  },
  toggleSidebarWidth: () => dispatch(toggleSidebar()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppRouter);

AppRouter.propTypes = {
  setInitialTokenValidationOnMount: PropTypes.func.isRequired,
  validateTokenOnMount: PropTypes.func.isRequired,
  isTokenValid: PropTypes.bool.isRequired,
  hasInitialTokenValidationBeenDone: PropTypes.bool.isRequired,
  isSidebarCollapsed: PropTypes.bool.isRequired,
  toggleSidebarWidth: PropTypes.func.isRequired,
};
