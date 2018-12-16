import React from 'react';
import PropTypes from 'prop-types';
import {
  Route, Switch, Link,
} from 'react-router-dom';

export default function DashboardRouter({ match }) {
  const { path } = match;

  return (
    <Switch>
      <Route exact path={path} render={() => <Link to="/user-settings">Main</Link>} />
      <Route path={`${path}/user-settings`} render={() => <h1>user</h1>} />
    </Switch>
  );
}

DashboardRouter.propTypes = {
  match: PropTypes.object.isRequired,
};
