import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, Link } from 'react-router-dom';
import { Nav, NavItem } from 'reactstrap';
import classNames from 'classnames';

import FaIcon from '../../utils/components/FaIcon';

export default function Sidebar({ isSidebarCollapsed }) {
  const sidebarClasses = classNames(
    'st-sidebar',
    'bg-primary',
    'd-flex',
    'flex-column',
    {
      collapsed: isSidebarCollapsed,
      'p-2': !isSidebarCollapsed,
      'pt-2': isSidebarCollapsed,
      'pb-2': isSidebarCollapsed,
    }
  );

  const logoClasses = classNames({
    'mr-2': !isSidebarCollapsed,
  });

  return (
    <aside className={sidebarClasses}>
      <Link to="/" className="st-underline-none">
        <h4 className="text-center text-white mb-5">
          <FaIcon iconName="globe" className={logoClasses} />
          { isSidebarCollapsed ? null : 'Loji Service' }
        </h4>
      </Link>

      <Nav className="flex-column">
        <NavItem className="d-flex">
          <NavLink to="/dashboard" className="text-white st-nav-link p-2 rounded d-flex flex-grow-1 align-items-center">
            <FaIcon className="mr-4" iconName="dashboard" />
            Dashboard
          </NavLink>
        </NavItem>
        <NavItem className="d-flex">
          <NavLink to="/pos" className="text-white st-nav-link p-2 rounded d-flex flex-grow-1 align-items-center">
            <FaIcon className="mr-4" iconName="archive" />
            My POs
          </NavLink>
        </NavItem>
        <NavItem className="d-flex">
          <NavLink to="/graphs" className="text-white st-nav-link p-2 rounded d-flex flex-grow-1 align-items-center">
            <FaIcon className="mr-4" iconName="signal" />
            Graphs
          </NavLink>
        </NavItem>
        <NavItem className="d-flex">
          <NavLink to="/reports" className="text-white st-nav-link p-2 rounded d-flex flex-grow-1 align-items-center">
            <FaIcon className="mr-4" iconName="clipboard" />
            Reports
          </NavLink>
        </NavItem>
        <NavItem className="d-flex">
          <NavLink to="/quotes" className="text-white st-nav-link p-2 rounded d-flex flex-grow-1 align-items-center">
            <FaIcon className="mr-4" iconName="usd" />
            FedEx Quote
          </NavLink>
        </NavItem>
        <NavItem className="d-flex">
          <NavLink to="/files" className="text-white st-nav-link p-2 rounded d-flex flex-grow-1 align-items-center">
            <FaIcon className="mr-4" iconName="copy" />
            Loji Files
          </NavLink>
        </NavItem>
      </Nav>

    </aside>
  );
}

Sidebar.propTypes = {
  isSidebarCollapsed: PropTypes.bool.isRequired,
};
