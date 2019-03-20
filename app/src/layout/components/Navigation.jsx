import React from 'react';
import PropTypes from 'prop-types';
import { Nav, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';

import { Icon, SimpleTooltip } from '../../utils';

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
            <Icon iconName="sidebar" />
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
            <Icon iconName="archive" />
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
            <Icon iconName="pie-chart" />
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
            <Icon iconName="clipboard" />
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
            <Icon iconName="dollar-sign" />
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
            <Icon iconName="file" />
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
          <Icon className="mr-2" iconName="sidebar" />
          Dashboard
        </NavLink>
      </NavItem>
      <NavItem className="d-flex">
        <NavLink
          to="/purchase-orders"
          className="text-dark st-nav-link p-2 rounded d-flex flex-grow-1 align-items-center mb-1"
        >
          <Icon className="mr-2" iconName="archive" />
          Purchase Orders
        </NavLink>
      </NavItem>
      <NavItem className="d-flex">
        <NavLink
          to="/graphs"
          className="text-dark st-nav-link p-2 rounded d-flex flex-grow-1 align-items-center mb-1"
        >
          <Icon className="mr-2" iconName="pie-chart" />
          Graphs
        </NavLink>
      </NavItem>
      <NavItem className="d-flex">
        <NavLink
          to="/reports"
          className="text-dark st-nav-link p-2 rounded d-flex flex-grow-1 align-items-center mb-1"
        >
          <Icon className="mr-2" iconName="clipboard" />
          Reports
        </NavLink>
      </NavItem>
      <NavItem className="d-flex">
        <NavLink
          to="/quotes"
          className="text-dark st-nav-link p-2 rounded d-flex flex-grow-1 align-items-center mb-1"
        >
          <Icon className="mr-2" iconName="dollar-sign" />
          FedEx Quote
        </NavLink>
      </NavItem>
      <NavItem className="d-flex">
        <NavLink
          to="/files"
          className="text-dark st-nav-link p-2 rounded d-flex flex-grow-1 align-items-center mb-1"
        >
          <Icon className="mr-2" iconName="file" />
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
