import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, Link } from 'react-router-dom';
import {
  Nav, NavItem, Button,
} from 'reactstrap';
import classNames from 'classnames';

import { FaIcon, SimpleTooltip, SimplePopover } from '../../utils';

export default function Sidebar({ isSidebarCollapsed }) {
  const sidebarClasses = classNames(
    'st-sidebar',
    'bg-light',
    'd-flex',
    'flex-row',
    {
      collapsed: isSidebarCollapsed,
    }
  );

  return (
    <aside className={sidebarClasses}>
      <div className="d-flex flex-column align-items-center justify-content-between st-sidebar--main bg-primary pt-2">
        <Link to="/">
          <h2 id="loji" className="text-white">
            <FaIcon iconName="globe" />
          </h2>
        </Link>
        <SimpleTooltip target="loji" placement="right" trigger="hover">
          Loji Service
        </SimpleTooltip>

        <div className="d-flex flex-column">
          <Button
            id="notification"
            className="shadow-none border-0 rounded-circle st-icon-btn"
            color="primary"
          >
            <FaIcon iconName="bell" />
          </Button>
          <SimpleTooltip target="notification" trigger="hover" placement="right">
            Notifications
          </SimpleTooltip>


          <Link to="/user-settings">
            <Button
              id="userSettings"
              className="shadow-none border-0 rounded-circle st-icon-btn"
              color="primary"
              tag="div"
            >
              <FaIcon iconName="user" />
            </Button>
          </Link>
          <SimpleTooltip target="userSettings" trigger="hover" placement="right">
            User Settings
          </SimpleTooltip>
          <SimplePopover target="userSettings" trigger="click" placement="right">
            test
          </SimplePopover>

          <Button
            id="generalSettings"
            className="shadow-none border-0 rounded-circle st-icon-btn"
            color="primary"
          >
            <FaIcon iconName="gear" />
          </Button>
          <SimpleTooltip target="generalSettings" trigger="hover" placement="right">
            General Settings
          </SimpleTooltip>
        </div>
      </div>
      <div className="d-flex flex-column flex-grow-1 flex-shrink-1 px-3 pt-5">
        <Nav className="flex-column pt-5">
          <NavItem className="d-flex">
            <NavLink
              to="/dashboard"
              className="text-dark st-nav-link p-2 rounded d-flex flex-grow-1 align-items-center"
            >
              <FaIcon className="mr-4" iconName="dashboard" />
              Dashboard
            </NavLink>
          </NavItem>
          <NavItem className="d-flex">
            <NavLink
              to="/purchase-orders"
              className="text-dark st-nav-link p-2 rounded d-flex flex-grow-1 align-items-center"
            >
              <FaIcon className="mr-4" iconName="archive" />
              My POs
            </NavLink>
          </NavItem>
          <NavItem className="d-flex">
            <NavLink to="/graphs" className="text-dark st-nav-link p-2 rounded d-flex flex-grow-1 align-items-center">
              <FaIcon className="mr-4" iconName="bar-chart" />
              Graphs
            </NavLink>
          </NavItem>
          <NavItem className="d-flex">
            <NavLink to="/reports" className="text-dark st-nav-link p-2 rounded d-flex flex-grow-1 align-items-center">
              <FaIcon className="mr-4" iconName="clipboard" />
              Reports
            </NavLink>
          </NavItem>
          <NavItem className="d-flex">
            <NavLink to="/quotes" className="text-dark st-nav-link p-2 rounded d-flex flex-grow-1 align-items-center">
              <FaIcon className="mr-4" iconName="usd" />
              FedEx Quote
            </NavLink>
          </NavItem>
          <NavItem className="d-flex">
            <NavLink to="/files" className="text-dark st-nav-link p-2 rounded d-flex flex-grow-1 align-items-center">
              <FaIcon className="mr-4" iconName="files-o" />
              Loji Files
            </NavLink>
          </NavItem>
        </Nav>
      </div>
    </aside>
  );
}

Sidebar.propTypes = {
  isSidebarCollapsed: PropTypes.bool.isRequired,
};
