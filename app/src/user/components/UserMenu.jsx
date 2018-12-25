import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Popover, PopoverBody } from 'reactstrap';

import { FaIcon, SimpleTooltip } from '../../utils';
import * as authActions from '../../store/auth/authActions';

export class UserMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };

    this.togglePopover = this.togglePopover.bind(this);
  }

  get tooltip() {
    const { isOpen } = this.state;

    if (isOpen) {
      return null;
    }

    return (
      <SimpleTooltip target="userSettings" trigger="hover" placement="right">
        User Settings
      </SimpleTooltip>
    );
  }

  togglePopover() {
    this.setState(({ isOpen }) => ({ isOpen: !isOpen }));
  }

  render() {
    const { isOpen } = this.state;
    const { signOut } = this.props;

    return (
      <Fragment>
        <Button
          id="userSettings"
          className="shadow-none border-0 rounded-circle st-icon-btn"
          color="primary"
          tag="div"
          onClick={this.togglePopover}
        >
          <FaIcon iconName="user" />
        </Button>

        {this.tooltip}
        <Popover
          target="userSettings"
          isOpen={isOpen}
          toggle={this.togglePopover}
          delay={{ show: 120, hide: 250 }}
          placement="right"
        >
          <PopoverBody className="d-flex flex-column">
            <Link to="/user-settings">
              <FaIcon iconName="gear" /> User Settings
            </Link>
            <Link to="/signin" onClick={signOut}>
              <FaIcon iconName="sign-out" /> Sign Out
            </Link>
          </PopoverBody>
        </Popover>
      </Fragment>
    );
  }
}

const mapStateToProps = () => ({});
const mapActionsToProps = (dispatch) => ({
  signOut: () => dispatch(authActions.signOut()),
});

export default connect(mapStateToProps, mapActionsToProps)(UserMenu);

UserMenu.propTypes = {
  signOut: PropTypes.func.isRequired,
};
