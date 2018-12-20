import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table, Input } from 'reactstrap';

import PurchaseOrdersTableHead from './PurchaseOrdersTableHead';
import PurchaseOrdersTableRow from './PurchaseOrdersTabelRow';
import { fetchPurchaseOrders } from '../../store/purchaseOrders/purchaseOrdersActions';

export class PurchaseOrdersTable extends Component {
  componentDidMount() {
    const { initialFetchPurchaseOrders } = this.props;

    initialFetchPurchaseOrders();
  }

  render() {
    const { purchaseOrders } = this.props;

    return (
      <Fragment>
        <div className="d-flex justify-content-between mb-4">
          Show All entities
          <div className="d-flex align-items-baseline">
            <span className="mr-3">Search: </span>
            <Input bsSize="sm" />
          </div>
        </div>
        <Table>
          <PurchaseOrdersTableHead />
          {purchaseOrders.map((purchaseOrder) => (
            <PurchaseOrdersTableRow {...purchaseOrder} />
          ))}
        </Table>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ purchaseOrders }) => ({
  ...purchaseOrders,
});

const mapActionsToProps = (dispatch) => ({
  initialFetchPurchaseOrders: () => {
    dispatch(fetchPurchaseOrders());
  },
});

export default connect(mapStateToProps, mapActionsToProps)(PurchaseOrdersTable);

PurchaseOrdersTable.propTypes = {
  purchaseOrders: PropTypes.array.isRequired,
  initialFetchPurchaseOrders: PropTypes.func.isRequired,
};
