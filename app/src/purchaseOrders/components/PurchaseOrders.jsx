import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink as RouterLink } from 'react-router-dom';
import {
  Nav, NavItem, NavLink,
} from 'reactstrap';

import PurchaseOrdersTable from './PurchaseOrdersTable';
import * as purchaseOrdersActions from '../../store/purchaseOrders/purchaseOrdersActions';
import * as layoutActions from '../../store/layout/layoutActions';

export class PurchaseOrders extends Component {
  componentDidMount() {
    const { fetchPurchaseOrders, updateTitle } = this.props;

    fetchPurchaseOrders();
    updateTitle('Purchase Orders');
  }

  render() {
    const { purchaseOrders, match } = this.props;

    return (
      <Fragment>
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
        <PurchaseOrdersTable purchaseOrders={purchaseOrders} />
      </Fragment>
    );
  }
}

const mapStateToProps = ({ purchaseOrders }) => ({ ...purchaseOrders });
const mapActionsToProps = (dispatch) => ({
  fetchPurchaseOrders: () => dispatch(purchaseOrdersActions.fetchPurchaseOrders()),
  updateTitle: (title) => dispatch(layoutActions.updateTitle(title)),
});

export default connect(mapStateToProps, mapActionsToProps)(PurchaseOrders);

PurchaseOrders.propTypes = {
  purchaseOrders: PropTypes.array.isRequired,
  fetchPurchaseOrders: PropTypes.func.isRequired,
  updateTitle: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
};
