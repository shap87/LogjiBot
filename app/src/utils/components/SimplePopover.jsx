import React, { Component } from 'react';
import { Popover } from 'reactstrap';

export default class SimplePopover extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };

    this.togglePopover = this.togglePopover.bind(this);
  }

  togglePopover() {
    this.setState(({ isOpen }) => ({ isOpen: !isOpen }));
  }

  render() {
    const { props } = this;
    const { isOpen } = this.state;

    return <Popover isOpen={isOpen} toggle={this.togglePopover} delay={{ show: 120, hide: 250 }} {...props} />;
  }
}
