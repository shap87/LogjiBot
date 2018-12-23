import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Table, Input } from 'reactstrap';

import PurchaseOrdersTableHead from './PurchaseOrdersTableHead';
import PurchaseOrdersTableRow from './PurchaseOrdersTabelRow';

export default function PurchaseOrdersTable({ purchaseOrders }) {
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

PurchaseOrdersTable.propTypes = {
  purchaseOrders: PropTypes.array.isRequired,
};
