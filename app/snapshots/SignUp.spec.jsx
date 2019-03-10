import React from 'react';
import { shallow } from 'enzyme';

import { SignUp } from '../src/auth/routes/SignUp';

describe('SignUp UI', () => {
  it('should render authentication form', () => {
    const signUpMock = jest.fn();
    const wrapper = shallow(<SignUp signUp={signUpMock} />);
    expect(wrapper).toMatchSnapshot();
  });
});
