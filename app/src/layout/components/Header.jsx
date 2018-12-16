import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button } from 'reactstrap';

import FaIcon from '../../utils/components/FaIcon';

export default function Header({ toggleSidebar, isSidebarCollapsed }) {
  const iconClasses = classNames('st-header-toggle', { collapsed: isSidebarCollapsed });

  return (
    <nav className="st-header p-2 navbar">
      <Button
        className="shadow-none border-0 st-icon-btn"
        color="light"
        onClick={toggleSidebar}
      >
        <FaIcon className={iconClasses} iconName="chevron-left" />
      </Button>
      <div className="d-flex">
        <Button
          className="shadow-none border-0 rounded-circle st-icon-btn"
          color="light"
        >
          <FaIcon iconName="bell" />
        </Button>
        <Button
          className="shadow-none border-0 rounded-circle st-icon-btn"
          color="light"
        >
          <FaIcon iconName="user" />
        </Button>
        <Button
          className="shadow-none border-0 rounded-circle st-icon-btn"
          color="light"
        >
          <FaIcon iconName="gear" />
        </Button>
      </div>
    </nav>
  );
}

Header.propTypes = {
  isSidebarCollapsed: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
};
