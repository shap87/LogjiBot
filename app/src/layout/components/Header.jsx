import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button } from 'reactstrap';

import FaIcon from '../../utils/components/FaIcon';
import SimpleTooltip from '../../utils/components/SimpleTooltip';

export default function Header({ toggleSidebar, isSidebarCollapsed }) {
  const iconClasses = classNames('st-header-toggle', { collapsed: isSidebarCollapsed });

  return (
    <nav className="st-header navbar p-0">
      <Button
        id="collapseSidebar"
        className="shadow-none border-0 st-icon-btn"
        color="light"
        onClick={toggleSidebar}
      >
        <FaIcon className={iconClasses} iconName="chevron-left" />
      </Button>
      <SimpleTooltip target="collapseSidebar" placement="right" trigger="hover">
        { isSidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar' }
      </SimpleTooltip>
    </nav>
  );
}

Header.propTypes = {
  isSidebarCollapsed: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
};
