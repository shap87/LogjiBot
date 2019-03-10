import React from 'react';
import { shallow } from 'enzyme';

import FaIcon from './FaIcon';

describe('FaIcon component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<FaIcon iconName="plus" />);
  });

  it('should render fontawesome icon', () => {
    expect(wrapper).toMatchSelector('i');
    expect(wrapper).toHaveClassName('fa fa-plus');
  });

  it('should render regular fontawesome icon', () => {
    wrapper.setProps({ type: 'regular' });
    expect(wrapper).toHaveClassName('far');
  });

  it('should render light fontawesome icon', () => {
    wrapper.setProps({ type: 'light' });
    expect(wrapper).toHaveClassName('fal');
  });

  it('should render solid fontawesome icon', () => {
    wrapper.setProps({ type: 'solid' });
    expect(wrapper).toHaveClassName('fas');
  });

  it('should pass custom className to an icon', () => {
    wrapper.setProps({ className: 'new-class' });
    expect(wrapper).toHaveClassName('new-class');
  });
});
