import React from 'react';
import PropTypes from 'prop-types';

/* eslint-disable */
export default function PurchaseOrdersTableRow({
  status, time_created, time_modified, vendor,
}) {
  return (
    <tr>
      <td></td>
      <td></td>
      <td>{vendor}</td>
      <td>{status}</td>
      <td></td>
      <td></td>
      <td>{time_created}</td>
      <td>{time_modified}</td>
    </tr>
  );
}

PurchaseOrdersTableRow.propTypes = {
  status: PropTypes.string.isRequired,
  time_created: PropTypes.string.isRequired,
  time_modified: PropTypes.string.isRequired,
  vendor: PropTypes.number.isRequired,
};
