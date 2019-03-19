import React from 'react';
import PropTypes from 'prop-types';

export default function PurchaseOrdersTableRow({
  status, time_created, time_modified, vendor, ship_method, ship_date, due_date,
}) {
  return (
    <tr>
      <td>Memo</td>
      <td>{vendor}</td>
      <td>{status}</td>
      <td>{ship_method}</td>
      <td>{ship_date}</td>
      <td>{due_date}</td>
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
  ship_method: PropTypes.string,
  ship_date: PropTypes.string,
  due_date: PropTypes.string,
};

PurchaseOrdersTableRow.defaultProps = {
  ship_method: '',
  ship_date: '',
  due_date: '',
};
