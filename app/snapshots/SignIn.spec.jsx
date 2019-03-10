import React from 'react';
import { shallow } from 'enzyme';

import { SignIn } from '../src/auth/routes/SignIn';

describe('SignIn UI', () => {
  it('should render authentication form', () => {
    const signInMock = jest.fn();
    const wrapper = shallow(<SignIn signIn={signInMock} />);
    expect(wrapper).toMatchSnapshot();
  });
});
