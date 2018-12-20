import React from 'react';
import PropTypes from 'prop-types';
import { NavLink as RouterLink } from 'react-router-dom';
import {
  Nav, NavItem, NavLink,
} from 'reactstrap';
import PurchaseOrdersTableContainer from './components/PurchaseOrdersTable';

export default function PurchaseOrdersRouter({ match }) {
  return (
    <section>
      <h2>Purchase Orders</h2>
      <Nav tabs className="mb-5">
        <NavItem>
          <NavLink active tag="div">
            <RouterLink to={`${match.path}?active=requests`}>
              NDA/Requests
            </RouterLink>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag="div">
            <RouterLink to={`${match.path}?active=qa`}>
              QA
            </RouterLink>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag="div">
            <RouterLink to={`${match.path}?active=holds`}>
              Holds
            </RouterLink>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag="div">
            <RouterLink to={`${match.path}?active=payments`}>
              Payments
            </RouterLink>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag="div">
            <RouterLink to={`${match.path}?active=freight`}>
              Freight
            </RouterLink>
          </NavLink>
        </NavItem>
      </Nav>
      <PurchaseOrdersTableContainer />
    </section>
  );
}

PurchaseOrdersRouter.propTypes = {
  match: PropTypes.object.isRequired,
};
