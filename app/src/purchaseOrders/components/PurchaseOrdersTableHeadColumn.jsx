import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { FaIcon } from '../../utils';

export default class PurchaseOrdersTableHeadColumn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isChecked: false,
      isOrderAsc: true,
    };

    this.toggleOrder = this.toggleOrder.bind(this);
  }

  get columnClasses() {
    const { isChecked } = this.state;

    return classNames({
      'is-checked': isChecked,
    });
  }

  toggleOrder() {
    this.setState(({ isOrderAsc }) => ({ isOrderAsc: !isOrderAsc }));
  }

  render() {
    const { isOrderAsc } = this.state;
    const { title } = this.props;

    return (
      <th className={this.columnClasses} onClick={this.toggleOrder}>
        { title }
        { isOrderAsc
          ? (<FaIcon iconName="sort-amount-asc" />)
          : (<FaIcon iconName="sort-amount-desc" />)
        }
      </th>
    );
  }
}

PurchaseOrdersTableHeadColumn.propTypes = {
  title: PropTypes.string.isRequired,
};
