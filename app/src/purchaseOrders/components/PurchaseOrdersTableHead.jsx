import React from 'react';

import PurchaseOrdersTableHeadColumn from './PurchaseOrdersTableHeadColumn';

export default function PurchaseOrdersTableHead() {
  const titles = [
    'Purchase Orders', 'Memo', 'Vendor',
    'Status', 'Followup', 'Date Due',
    'Date Created', 'Last Modified',
  ];

  return (
    <thead>
      <tr>
        {titles.map((title, index) => (
          <PurchaseOrdersTableHeadColumn key={index} title={title} />
        ))}
      </tr>
    </thead>
  );
}
