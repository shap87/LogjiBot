import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
  Card, Row, Col, CardBody, CardHeader,
} from 'reactstrap';

import { SignUpForm } from '../components';
import { createCustomer } from '../../store/auth/authActions';

export class SignUp extends PureComponent {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit({
    email, password, username, keepSignedIn,
  }) {
    const { signUp } = this.props;

    signUp({ email, password, username }, keepSignedIn);
  }

  render() {
    const { isCustomerAuthenticated, isCustomerAuthenticating, from } = this.props;

    if (isCustomerAuthenticated) {
      return <Redirect to={from} />;
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
                  <SignUpForm onSubmit={this.onSubmit} isCustomerAuthenticating={isCustomerAuthenticating} />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </section>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ ...auth });
const mapActionsToProps = (dispatch) => ({
  signUp: (credentials, isKeepingSignedIn) => {
    dispatch(createCustomer(credentials, isKeepingSignedIn));
  },
});

export default connect(mapStateToProps, mapActionsToProps)(SignUp);

SignUp.propTypes = {
  isCustomerAuthenticated: PropTypes.bool.isRequired,
  isCustomerAuthenticating: PropTypes.bool.isRequired,
  signUp: PropTypes.func.isRequired,
  from: PropTypes.string,
};

SignUp.defaultProps = {
  from: '/',
};
