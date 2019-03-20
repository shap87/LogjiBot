import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import classNames from 'classnames';

import { Icon, SimpleTooltip } from '../../utils';
import UserMenuContainer from '../../user/components/UserMenu';
import Navigation from './Navigation';

export default function Sidebar({ isSidebarCollapsed }) {
  const sidebarClassNames = classNames(
    'st-sidebar',
    'bg-light',
    'd-flex',
    'flex-row',
    {
      collapsed: isSidebarCollapsed,
    }
  );

  return (
    <div className={sidebarClassNames}>
      <div
        className="d-flex flex-column align-items-center
        justify-content-between st-sidebar--main border-right
        border-primary bg-white py-2"
      >
        <div>
          <Link to="/">
            <h2 id="loji" className="text-primary text-center mb-1">
              <Icon iconName="globe" />
            </h2>
          </Link>
          <SimpleTooltip target="loji" placement="right" trigger="hover">
            Loji Service
          </SimpleTooltip>
          <Navigation isTextHidden />
        </div>

        <div className="d-flex flex-column">
          <Button
            id="notification"
            className="shadow-none border-0 rounded-circle st-icon-btn mb-2"
            color="light"
          >
            <Icon iconName="bell" />
          </Button>
          <SimpleTooltip target="notification" trigger="hover" placement="right">
            Notifications
          </SimpleTooltip>

          <UserMenuContainer />
        </div>
      </div>
      <div className="d-flex flex-column flex-grow-1 flex-shrink-1 px-3 pt-5 st-sidebar--helper">
        <Navigation />
      </div>
    </div>
  );
}

Sidebar.propTypes = {
  isSidebarCollapsed: PropTypes.bool.isRequired,
};
