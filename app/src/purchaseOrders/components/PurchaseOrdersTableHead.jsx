import React from 'react';

import PurchaseOrdersTableHeadColumn from './PurchaseOrdersTableHeadColumn';

export default function PurchaseOrdersTableHead() {
  const titles = [
    'Memo', 'Vendor', 'Status',
    'Ship Method', 'Ship Date', 'Due Date',
    'Created At', 'Last Modified',
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
