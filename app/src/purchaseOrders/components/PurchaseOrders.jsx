import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink as RouterLink } from 'react-router-dom';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { keys } from 'lodash';


import PurchaseOrdersTable from './PurchaseOrdersTable';
import * as purchaseOrdersActions from '../../store/purchaseOrders/purchaseOrdersActions';
import * as layoutActions from '../../store/layout/layoutActions';

export class PurchaseOrders extends Component {
  state = {
    arePurchaseOrdersFetched: false,
  };

  componentDidMount() {
    const { arePurchaseOrdersFetched } = this.state;
    const { fetchPurchaseOrders, updateTitle } = this.props;

    if (!arePurchaseOrdersFetched) {
      fetchPurchaseOrders()
        .then(() => {
          this.setState({ arePurchaseOrdersFetched: true });
        });
    }

    updateTitle('Purchase Orders');
  }

  get navigation() {
    const { purchaseOrders, match, location } = this.props;

    const params = new URLSearchParams(location.search);
    const activeStatus = params.get('status');

    return (
      <Nav tabs className="mb-2">
        <NavItem>
          <NavLink active={!activeStatus} tag="div">
            <RouterLink to={`${match.path}`}>
              All
            </RouterLink>
          </NavLink>
        </NavItem>
        {keys(purchaseOrders).map((status, index) => (
          <NavItem key={index}>
            <NavLink active={activeStatus === status} tag="div">
              <RouterLink to={`${match.path}?status=${status}`}>
                {status}
              </RouterLink>
            </NavLink>
          </NavItem>
        ))}
      </Nav>
    );
  }

  render() {
    const { purchaseOrders, location } = this.props;

    const params = new URLSearchParams(location.search);
    const activeStatus = params.get('status');

    return (
      <Fragment>
        {this.navigation}
        <PurchaseOrdersTable purchaseOrders={purchaseOrders} activeStatus={activeStatus} />
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
  purchaseOrders: PropTypes.object.isRequired,
  fetchPurchaseOrders: PropTypes.func.isRequired,
  updateTitle: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};
