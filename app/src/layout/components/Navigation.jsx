import React from 'react';
import PropTypes from 'prop-types';
import { Nav, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';

import { FaIcon, SimpleTooltip } from '../../utils';

export default function Navigation({ isTextHidden }) {
  if (isTextHidden) {
    return (
      <Nav className="flex-column pt-5 st-navigation--main">
        <NavItem className="d-flex">
          <NavLink
            id="dashboardMain"
            to="/dashboard"
            className="text-dark st-nav-link st-nav-link-text--hidden
              p-2 rounded d-flex flex-grow-1 justify-content-center align-items-center mb-1"
          >
            <FaIcon iconName="dashboard" />
          </NavLink>
          <SimpleTooltip target="dashboardMain" placement="right" trigger="hover">
            Dashboard
          </SimpleTooltip>
        </NavItem>
        <NavItem className="d-flex">
          <NavLink
            id="purchaseOrdersMain"
            to="/purchase-orders"
            className="text-dark st-nav-link st-nav-link-text--hidden
              p-2 rounded d-flex flex-grow-1 justify-content-center align-items-center mb-1"
          >
            <FaIcon iconName="archive" />
          </NavLink>
          <SimpleTooltip target="purchaseOrdersMain" placement="right" trigger="hover">
            Purchase Orders
          </SimpleTooltip>
        </NavItem>
        <NavItem className="d-flex">
          <NavLink
            id="graphsMain"
            to="/graphs"
            className="text-dark st-nav-link st-nav-link-text--hidden
              p-2 rounded d-flex flex-grow-1 justify-content-center align-items-center mb-1"
          >
            <FaIcon iconName="bar-chart" />
          </NavLink>
          <SimpleTooltip target="graphsMain" placement="right" trigger="hover">
            Graphs
          </SimpleTooltip>
        </NavItem>
        <NavItem className="d-flex">
          <NavLink
            id="reportsMain"
            to="/reports"
            className="text-dark st-nav-link st-nav-link-text--hidden
              p-2 rounded d-flex flex-grow-1 justify-content-center align-items-center mb-1"
          >
            <FaIcon iconName="clipboard" />
          </NavLink>
          <SimpleTooltip target="reportsMain" placement="right" trigger="hover">
            Reports
          </SimpleTooltip>
        </NavItem>
        <NavItem className="d-flex">
          <NavLink
            id="fedExQuoteMain"
            to="/quotes"
            className="text-dark st-nav-link st-nav-link-text--hidden
              p-2 rounded d-flex flex-grow-1 justify-content-center align-items-center mb-1"
          >
            <FaIcon iconName="usd" />
          </NavLink>
          <SimpleTooltip target="fedExQuoteMain" placement="right" trigger="hover">
            FedEx Quote
          </SimpleTooltip>
        </NavItem>
        <NavItem className="d-flex">
          <NavLink
            id="lojiFileseMain"
            to="/files"
            className="text-dark st-nav-link st-nav-link-text--hidden
              p-2 rounded d-flex flex-grow-1 justify-content-center align-items-center mb-1"
          >
            <FaIcon iconName="files-o" />
          </NavLink>
          <SimpleTooltip target="lojiFileseMain" placement="right" trigger="hover">
            Loji Files
          </SimpleTooltip>
        </NavItem>
      </Nav>
    );
  }

  return (
    <Nav className="flex-column pt-5">
      <NavItem className="d-flex">
        <NavLink
          to="/dashboard"
          className="text-dark st-nav-link p-2 rounded d-flex flex-grow-1 align-items-center mb-1"
        >
          <FaIcon className="mr-2" iconName="dashboard" />
          Dashboard
        </NavLink>
      </NavItem>
      <NavItem className="d-flex">
        <NavLink
          to="/purchase-orders"
          className="text-dark st-nav-link p-2 rounded d-flex flex-grow-1 align-items-center mb-1"
        >
          <FaIcon className="mr-2" iconName="archive" />
          Purchase Orders
        </NavLink>
      </NavItem>
      <NavItem className="d-flex">
        <NavLink
          to="/graphs"
          className="text-dark st-nav-link p-2 rounded d-flex flex-grow-1 align-items-center mb-1"
        >
          <FaIcon className="mr-2" iconName="bar-chart" />
          Graphs
        </NavLink>
      </NavItem>
      <NavItem className="d-flex">
        <NavLink
          to="/reports"
          className="text-dark st-nav-link p-2 rounded d-flex flex-grow-1 align-items-center mb-1"
        >
          <FaIcon className="mr-2" iconName="clipboard" />
          Reports
        </NavLink>
      </NavItem>
      <NavItem className="d-flex">
        <NavLink
          to="/quotes"
          className="text-dark st-nav-link p-2 rounded d-flex flex-grow-1 align-items-center mb-1"
        >
          <FaIcon className="mr-2" iconName="usd" />
          FedEx Quote
        </NavLink>
      </NavItem>
      <NavItem className="d-flex">
        <NavLink
          to="/files"
          className="text-dark st-nav-link p-2 rounded d-flex flex-grow-1 align-items-center mb-1"
        >
          <FaIcon className="mr-2" iconName="files-o" />
          Loji Files
        </NavLink>
      </NavItem>
    </Nav>
  );
}

Navigation.propTypes = {
  isTextHidden: PropTypes.bool,
};

Navigation.defaultProps = {
  isTextHidden: false,
};
