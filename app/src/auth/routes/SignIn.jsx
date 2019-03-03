import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Card, Row, Col, CardBody, CardHeader,
} from 'reactstrap';

import { SignInForm } from '../components';
import { authenticateCustomer } from '../../store/auth/authActions';

export class SignIn extends PureComponent {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit({ email, password, keepSignedIn }) {
    const { signIn } = this.props;

    signIn({ username: email, password }, keepSignedIn);
  }

  render() {
    const { isCustomerAuthenticated, isCustomerAuthenticating, from } = this.props;

    if (isCustomerAuthenticated) {
      return (
        <Redirect to={from} />
      );
    }

    return (
      <section className="d-flex flex-grow-1 flex-column align-items-center justify-content-center">
        <div className="container">
          <Row noGutters>
            <Col md={{
              size: 4,
              offset: 4,
            }}
            >
              <h1 className="text-center mb-3">Loji</h1>
              <Card className="border-0 shadow-z4">
                <CardHeader className="bg-primary p-1" />
                <CardBody>
                  <SignInForm onSubmit={this.onSubmit} isCustomerAuthenticating={isCustomerAuthenticating} />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </section>
    );
  }
}

const mapStateTpProps = ({ auth }) => ({ ...auth });
const mapActionsToProps = (dispatch) => ({
  signIn: (credentials, isKeepingSignedIn) => {
    dispatch(authenticateCustomer(credentials, isKeepingSignedIn));
  },
});

export default connect(mapStateTpProps, mapActionsToProps)(SignIn);

SignIn.propTypes = {
  isCustomerAuthenticating: PropTypes.bool.isRequired,
  isCustomerAuthenticated: PropTypes.bool.isRequired,
  signIn: PropTypes.func.isRequired,
  from: PropTypes.string,
};

SignIn.defaultProps = {
  from: '/',
};
