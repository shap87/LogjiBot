import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { Button } from 'reactstrap';

import FaIcon from '../../utils/components/FaIcon';
import SimpleTooltip from '../../utils/components/SimpleTooltip';
import * as layoutActions from '../../store/layout/layoutActions';
import SyncQB from '../../utils/components/SyncQB';

export function Header({ toggleSidebar, isSidebarCollapsed, title }) {
  const iconClasses = classNames('st-header-toggle', { collapsed: isSidebarCollapsed });

  return (
    <div className="st-header d-flex justify-content-between align-items-center p-0 mb-3">
      <div className="d-flex">
        <Button
          id="collapseSidebar"
          className="shadow-none border-0 st-icon-btn mr-3"
          color="light"
          onClick={toggleSidebar}
        >
          <FaIcon className={iconClasses} iconName="chevron-left" />
        </Button>
        <SimpleTooltip target="collapseSidebar" placement="right" trigger="hover">
          { isSidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar' }
        </SimpleTooltip>
        <h3 className="m-0">{title}</h3>
      </div>
      <SyncQB />
    </div>
  );
}

const mapStateToProps = ({ layout }) => ({ ...layout });
const mapActionsToProps = (dispatch) => ({
  toggleSidebar: () => dispatch(layoutActions.toggleSidebar()),
});

export default connect(mapStateToProps, mapActionsToProps)(Header);

Header.propTypes = {
  title: PropTypes.string.isRequired,
  isSidebarCollapsed: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
};
